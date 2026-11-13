import {randomBytes,createHash,scryptSync,timingSafeEqual} from 'node:crypto';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {openDatabase,id,now,customer,settings,publicProduct,orderView,settleOrder,audit,transaction} from './database.mjs';
import {verifyStripe,stripeCheckout} from './payments.mjs';
const hash=value=>createHash('sha256').update(value).digest('hex');
const passwordHash=password=>{const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex');};
const checkPassword=(password,stored)=>{const[salt,key]=stored.split(':');return timingSafeEqual(scryptSync(password,salt,64),Buffer.from(key,'hex'));};
const email=value=>typeof value==='string'&&value.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const text=(value,max=200)=>typeof value==='string'?value.trim().slice(0,max):'';
const cleanUser=row=>row?{id:row.id,email:row.email,role:row.role,firstName:row.first_name,lastName:row.last_name,verified:!!row.verified||row.role==='admin'}:null;
const fail=(status,message)=>{const error=Error(message);error.status=status;throw error;};
async function body(req,limit=6*1024*1024){let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>limit)fail(413,'Request is too large');chunks.push(chunk);}return Buffer.concat(chunks).toString('utf8');}
export function createApi({filename,dataDir,baseUrl='http://localhost:4173',stripeKey='',stripeWebhook='',fetcher=fetch}={}){
 const db=openDatabase(filename);const env={baseUrl,stripeKey,stripeWebhook};const attempts=new Map();
 function limited(req,key,max=20){const bucket=key+':'+req.socket.remoteAddress,at=Date.now();const current=attempts.get(bucket);if(!current||current.reset<at){attempts.set(bucket,{count:1,reset:at+15*60000});return;}if(++current.count>max)fail(429,'Too many attempts. Please try later.');if(attempts.size>5000)for(const[k,v]of attempts)if(v.reset<at)attempts.delete(k);}
 function session(req){const token=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith('exclusive_session='))?.slice(18);if(!token)return null;return db.prepare('SELECT a.* FROM sessions s JOIN accounts a ON a.id=s.account_id WHERE s.token_hash=? AND s.expires_at>?').get(hash(token),Date.now());}
 function cookie(res,account){const token=randomBytes(32).toString('hex');db.prepare('DELETE FROM sessions WHERE expires_at<?').run(Date.now());db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(hash(token),account.id,Date.now()+8*3600000);res.setHeader('Set-Cookie',`exclusive_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${baseUrl.startsWith('https:')?'; Secure':''}`);}
 function admin(req){const user=session(req);if(!user||user.role!=='admin')fail(401,'Sign in with an administrator account');return user;}
 function orderAccess(req,url){const row=db.prepare('SELECT o.*,c.email,c.name AS customer_name FROM orders o JOIN customers c ON c.id=o.customer_id WHERE o.id=?').get(url.searchParams.get('order')||'');if(!row)fail(404,'Order not found');const token=url.searchParams.get('token')||'';if(token.length<32||hash(token)!==row.access_token_hash)fail(403,'Invalid order link');return row;}
 function config(){const s=settings(db);return {brand:s.brand,country:'US',currency:'USD',renewal:'manual',cardConfigured:!!stripeKey&&!!stripeWebhook,cardMode:stripeKey.startsWith('sk_live_')||stripeKey.startsWith('rk_live_')?'live':'test',cryptoConfigured:!!stripeKey&&!!stripeWebhook&&s.cryptoEnabled==='true',cashAppConfigured:/^\$[A-Za-z0-9]{1,20}$/.test(s.cashTag),cashTag:s.cashTag,supportEmail:s.supportEmail,emailConfigured:false};}
 const reply=(res,value,status=200)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(value));return true;};
 async function webhook(req,res,route,raw){
  let event;try{event=JSON.parse(raw);}catch{fail(400,'Invalid webhook');}
  if(route==='/api/webhooks/stripe'){
   if(!verifyStripe(raw,req.headers['stripe-signature'],stripeWebhook))fail(400,'Invalid webhook signature');
   if(!event.id||typeof event.id!=='string')fail(400,'Missing event ID');
   if(db.prepare('SELECT id FROM webhook_events WHERE id=?').get('stripe:'+event.id))return reply(res,{received:true,duplicate:true});
   const data=event.data?.object;
   if(['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type)&&data?.payment_status==='paid'){
    const order=db.prepare("SELECT * FROM orders WHERE provider_id=? AND method IN('card','crypto')").get(data.id);
    if(!order||data.client_reference_id!==order.id||data.metadata?.order_id!==order.id||data.amount_total!==order.amount_cents||data.currency!=='usd'||!!event.livemode!==(order.provider_mode==='live'))fail(400,'Payment does not match the stored order');
    settleOrder(db,order.id,'stripe-webhook',typeof data.payment_intent==='string'?data.payment_intent:null);
   }
   if(event.type==='charge.refunded'&&data?.refunded&&data.payment_intent){const order=db.prepare('SELECT * FROM orders WHERE provider_payment_id=?').get(data.payment_intent);if(order){transaction(db,()=>{db.prepare("UPDATE orders SET payment_status='refunded',status='refunded' WHERE id=?").run(order.id);db.prepare("UPDATE memberships SET status='cancelled' WHERE order_id=?").run(order.id);audit(db,'stripe-webhook','refund_confirmed',order.id);});}}
   db.prepare('INSERT OR IGNORE INTO webhook_events VALUES(?,?,?)').run('stripe:'+event.id,'stripe',now());return reply(res,{received:true});
  }
  fail(404,'Webhook provider not configured');
 }
 async function handle(req,res){
  const url=new URL(req.url,baseUrl),route=url.pathname,method=req.method||'GET';if(!route.startsWith('/api/'))return false;
  try{
   const host=req.headers.host||'';const allowed=new Set([new URL(baseUrl).host,`localhost:${new URL(baseUrl).port||80}`,`127.0.0.1:${new URL(baseUrl).port||80}`]);if(!allowed.has(host))fail(403,'Unrecognized host');
   if(route==='/api/webhooks/stripe'){if(method!=='POST')fail(405,'POST required');await webhook(req,res,route,await body(req,1024*1024));return true;}
   let input={};
   if(['POST','PATCH','PUT','DELETE'].includes(method)){
    if(req.headers.origin!==new URL('http://'+host).origin&&req.headers.origin!==new URL(baseUrl).origin)fail(403,'Same-origin request required');
    if(!String(req.headers['content-type']||'').startsWith('application/json'))fail(415,'JSON request required');
    try{input=JSON.parse(await body(req));}catch(error){if(error.status)throw error;fail(400,'Invalid JSON');}
   }
   if(route==='/api/status'&&method==='GET')return reply(res,{...config(),adminReady:!!db.prepare("SELECT id FROM accounts WHERE role='admin'").get()});
   if(route==='/api/catalog'&&method==='GET')return reply(res,{products:db.prepare('SELECT * FROM products WHERE active=1 ORDER BY rowid').all().map(publicProduct)});
   if(route==='/api/admin/setup'&&method==='POST'){
    limited(req,'setup',5);if(!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress))fail(403,'Setup is available on this computer only');
    if(db.prepare("SELECT id FROM accounts WHERE role='admin'").get())fail(409,'Administrator already configured');
    if(!email(input.email)||typeof input.password!=='string'||input.password.length<12||input.password.length>128||!text(input.name))fail(400,'Enter your name, a valid email, and a password of 12–128 characters');
    const uid=id('usr');db.prepare('INSERT INTO accounts(id,email,password_hash,role,first_name,last_name,created_at,verified) VALUES(?,?,?,?,?,?,?,1)').run(uid,input.email.toLowerCase().trim(),passwordHash(input.password),'admin',text(input.name),'',now());
    const user=db.prepare('SELECT * FROM accounts WHERE id=?').get(uid);cookie(res,user);audit(db,uid,'admin_created',uid);return reply(res,{user:cleanUser(user)},201);
   }
   if(route==='/api/auth/login'&&method==='POST'){
    limited(req,'login');const account=db.prepare('SELECT * FROM accounts WHERE email=?').get(text(input.email,254).toLowerCase());const password=typeof input.password==='string'?input.password:'';
    if(password.length>128||!account||!checkPassword(password,account.password_hash))fail(401,'Incorrect email or password');cookie(res,account);return reply(res,{user:cleanUser(account)});
   }
   if(route==='/api/auth/signup'&&method==='POST'){
    limited(req,'signup');if(!email(input.email)||!text(input.firstName)||typeof input.password!=='string'||input.password.length<12||input.password.length>128)fail(400,'Enter a valid email, first name, and password of 12–128 characters');
    if(db.prepare('SELECT id FROM accounts WHERE email=?').get(input.email.toLowerCase().trim()))fail(409,'An account with this email already exists');
    const user=transaction(db,()=>{const uid=id('usr');db.prepare('INSERT INTO accounts(id,email,password_hash,role,first_name,last_name,created_at) VALUES(?,?,?,?,?,?,?)').run(uid,input.email.toLowerCase().trim(),passwordHash(input.password),'customer',text(input.firstName),text(input.lastName),now());customer(db,input.email.toLowerCase().trim(),`${text(input.firstName)} ${text(input.lastName)}`.trim());return db.prepare('SELECT * FROM accounts WHERE id=?').get(uid);});cookie(res,user);return reply(res,{user:cleanUser(user)},201);
   }
   if(route==='/api/auth/me'&&method==='GET')return reply(res,{user:cleanUser(session(req))});
   if(route==='/api/auth/logout'&&method==='POST'){const token=(req.headers.cookie||'').match(/exclusive_session=([^;]+)/)?.[1];if(token)db.prepare('DELETE FROM sessions WHERE token_hash=?').run(hash(token));res.setHeader('Set-Cookie','exclusive_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');return reply(res,{success:true});}
   if(route==='/api/account'&&method==='GET'){
    const user=session(req);if(!user)fail(401,'Please sign in');if(!user.verified&&user.role!=='admin')return reply(res,{user:cleanUser(user),verificationRequired:true,orders:[],memberships:[],messages:[]});const client=db.prepare('SELECT * FROM customers WHERE email=?').get(user.email);
    return reply(res,{user:cleanUser(user),orders:client?db.prepare('SELECT * FROM orders WHERE customer_id=? ORDER BY created_at DESC').all(client.id).map(orderView):[],memberships:client?db.prepare('SELECT m.*,p.name FROM memberships m JOIN products p ON p.id=m.product_id WHERE customer_id=? ORDER BY expires_at DESC').all(client.id):[],messages:client?db.prepare('SELECT * FROM messages WHERE customer_id=? ORDER BY created_at DESC').all(client.id).map(m=>({...m,replies:JSON.parse(m.replies)})):[]});
   }
   if(route==='/api/orders'&&method==='POST'){
    limited(req,'checkout',100);const cfg=config();if(!['card','crypto','cashapp'].includes(input.method))fail(400,'Choose a payment method');
    if(input.method==='card'&&!cfg.cardConfigured)fail(503,'Card payments need your Stripe secret key and webhook secret.');
    if(input.method==='crypto'&&!cfg.cryptoConfigured)fail(503,'Enable stablecoin payments in Stripe, then enable crypto in CRM payment settings.');
    if(input.method==='cashapp'&&!cfg.cashAppConfigured)fail(503,'Set your own Cash App handle in the CRM payment settings first.');
    if(!email(input.email)||!text(input.name))fail(400,'Enter your name and a valid email');
    if(!Array.isArray(input.items)||input.items.length<1||input.items.length>30)fail(400,'Your cart must contain 1–30 items');
    const seen=new Set(),items=input.items.map(item=>{
     if(!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>20)fail(400,'Invalid item quantity');
     const p=db.prepare('SELECT * FROM products WHERE id=? AND active=1').get(text(item.productId,100));if(!p)fail(400,'A product is no longer available');
     const size=text(item.size,40);const key=p.id+':'+size;if(seen.has(key))fail(400,'Duplicate cart item');seen.add(key);
     if(p.kind==='membership'&&item.quantity!==1)fail(400,'Membership quantities must be one');
     if(p.inventory!==null&&p.inventory<item.quantity)fail(409,'Not enough inventory for '+p.name);
     const sizes=JSON.parse(p.sizes);if(sizes.length&&!sizes.includes(size))fail(400,'Choose an available size for '+p.name);
     return {productId:p.id,name:p.name,kind:p.kind,unitPrice:p.price_cents,quantity:item.quantity,size};
    });
    const membershipCount=items.filter(i=>i.kind==='membership').length;if(membershipCount>1)fail(400,'Choose one membership per order');
    const subtotal=items.reduce((sum,i)=>sum+i.unitPrice*i.quantity,0),shipping=items.some(i=>i.kind==='merch')&&subtotal<=10000?999:0;
    if(input.method==='crypto'&&subtotal+shipping>1000000)fail(400,'Stablecoin checkout is limited to $10,000 per order');
    const address=Object.fromEntries(['line1','city','state','zip','country'].map(key=>[key,text(input.address?.[key],200)]));
    if(items.some(i=>i.kind==='merch')&&['line1','city','state','zip','country'].some(key=>!address[key]))fail(400,'Enter a complete shipping address');
    const oid=id('ord'),token=randomBytes(32).toString('hex'),client=customer(db,input.email.toLowerCase().trim(),text(input.name));
    db.prepare('INSERT INTO orders(id,customer_id,method,amount_cents,items,address,access_token_hash,provider_mode,created_at) VALUES(?,?,?,?,?,?,?,?,?)').run(oid,client.id,input.method,subtotal+shipping,JSON.stringify(items),JSON.stringify(address),hash(token),input.method==='cashapp'?'live':cfg.cardMode,now());
    const order={id:oid,email:client.email,items,shippingCents:shipping,amount_cents:subtotal+shipping,method:input.method};
    if(input.method==='cashapp')return reply(res,{orderId:oid,url:`/checkout/result?order=${oid}&token=${token}`},201);
    try{const payment=await stripeCheckout(order,token,env,fetcher);db.prepare('UPDATE orders SET provider_id=? WHERE id=?').run(payment.id,oid);return reply(res,{orderId:oid,url:payment.url},201);}catch(error){db.prepare("UPDATE orders SET status='payment_setup_failed' WHERE id=?").run(oid);fail(502,error.message);}
   }
   if(route==='/api/order'&&method==='GET'){const order=orderAccess(req,url);const publicOrder={id:order.id,payment_status:order.payment_status,status:order.status,method:order.method,amount_cents:order.amount_cents,currency:order.currency,items:JSON.parse(order.items),reference:order.reference,receiptUploaded:!!order.receipt,created_at:order.created_at};return reply(res,{order:publicOrder,cashTag:settings(db).cashTag});}
   if(route==='/api/order/proof'&&method==='POST'){
    limited(req,'proof',20);const order=orderAccess(req,url);if(order.method!=='cashapp'||order.payment_status==='paid')fail(409,'This order does not accept a receipt');
    const match=typeof input.image==='string'&&input.image.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);if(!match)fail(400,'Upload a PNG, JPEG, or WebP receipt');
    const bytes=Buffer.from(match[2],'base64');if(bytes.length<12||bytes.length>4*1024*1024)fail(400,'Receipt must be under 4 MB');
    const valid=match[1]==='png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):match[1]==='jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP';if(!valid)fail(400,'The file is not a valid receipt image');
    const receipt=id('receipt')+'.'+match[1];await mkdir(path.join(dataDir,'receipts'),{recursive:true,mode:0o700});await writeFile(path.join(dataDir,'receipts',receipt),bytes,{mode:0o600});
    db.prepare("UPDATE orders SET receipt=?,reference=?,payment_status='awaiting_review' WHERE id=?").run(receipt,text(input.reference,200),order.id);audit(db,'customer','receipt_submitted',order.id);return reply(res,{success:true,payment_status:'awaiting_review'});
   }
   if((route==='/api/support'||route==='/api/notify-admin')&&method==='POST'){
    limited(req,'support',30);const data=route==='/api/notify-admin'?input.data||{}:input;if(route==='/api/notify-admin'&&input.type!=='support_message')return reply(res,{success:true,emailSent:false});
    if(!email(data.email)||!text(data.name)||!text(data.message,10000))fail(400,'Enter your name, email, and message');const client=customer(db,data.email.toLowerCase().trim(),text(data.name));
    db.prepare('INSERT INTO messages(id,customer_id,subject,body,created_at) VALUES(?,?,?,?,?)').run(id('msg'),client.id,text(data.subject)||'Support Request',text(data.message,10000),now());return reply(res,{success:true,emailSent:false},201);
   }
   if(route.startsWith('/api/admin/')){
    const user=admin(req);
    if(route==='/api/admin/overview'&&method==='GET')return reply(res,{customers:db.prepare('SELECT COUNT(*) AS n FROM customers').get().n,orders:db.prepare('SELECT COUNT(*) AS n FROM orders').get().n,paidCents:db.prepare("SELECT COALESCE(SUM(amount_cents),0) AS n FROM orders WHERE payment_status='paid' AND provider_mode='live'").get().n,testPaidCents:db.prepare("SELECT COALESCE(SUM(amount_cents),0) AS n FROM orders WHERE payment_status='paid' AND provider_mode='test'").get().n,pendingReview:db.prepare("SELECT COUNT(*) AS n FROM orders WHERE payment_status='awaiting_review'").get().n,activeMembers:db.prepare("SELECT COUNT(DISTINCT customer_id) AS n FROM memberships WHERE status='active' AND expires_at>?").get(now()).n,openMessages:db.prepare("SELECT COUNT(*) AS n FROM messages WHERE status='open'").get().n,recentOrders:db.prepare('SELECT o.*,c.email,c.name AS customer_name FROM orders o JOIN customers c ON c.id=o.customer_id ORDER BY o.created_at DESC LIMIT 8').all().map(orderView),activity:db.prepare('SELECT * FROM audit ORDER BY created_at DESC LIMIT 12').all()});
    if(route==='/api/admin/customers'&&method==='GET')return reply(res,{rows:db.prepare("SELECT c.*,(SELECT COUNT(*) FROM orders o WHERE o.customer_id=c.id) AS order_count,(SELECT verified FROM accounts a WHERE a.email=c.email AND a.role='customer') AS account_verified FROM customers c ORDER BY c.created_at DESC LIMIT 1000").all()});
    if(route==='/api/admin/customers'&&method==='POST'){if(!email(input.email)||!text(input.name))fail(400,'Enter a name and valid email');const row=customer(db,input.email.toLowerCase().trim(),text(input.name));audit(db,user.id,'customer_created',row.id);return reply(res,{row},201);}
    if(route==='/api/admin/customers'&&method==='PATCH'){
     if(input.action==='verify_account'){const client=db.prepare('SELECT * FROM customers WHERE id=?').get(text(input.id));if(!client)fail(404,'Customer not found');db.prepare("UPDATE accounts SET verified=1 WHERE email=? AND role='customer'").run(client.email);audit(db,user.id,'email_ownership_verified',client.id);}
     else{db.prepare('UPDATE customers SET notes=? WHERE id=?').run(text(input.notes,10000),text(input.id));audit(db,user.id,'customer_notes_updated',text(input.id));}return reply(res,{success:true});
    }
    if(route==='/api/admin/orders'&&method==='GET')return reply(res,{rows:db.prepare('SELECT o.*,c.email,c.name AS customer_name FROM orders o JOIN customers c ON c.id=o.customer_id ORDER BY o.created_at DESC LIMIT 1000').all().map(orderView)});
    if(route==='/api/admin/orders'&&method==='PATCH'){
     const order=db.prepare('SELECT * FROM orders WHERE id=?').get(text(input.id));if(!order)fail(404,'Order not found');
     if(input.action==='verify_cashapp'){if(order.method!=='cashapp'||order.payment_status!=='awaiting_review'||!order.receipt||!text(input.reference))fail(409,'A submitted receipt and verified transaction reference are required');db.prepare('UPDATE orders SET reference=? WHERE id=?').run(text(input.reference),order.id);settleOrder(db,order.id,user.id,text(input.reference));}
     else if(input.action==='reject_cashapp'){if(order.method!=='cashapp'||order.payment_status!=='awaiting_review')fail(409,'Order is not awaiting review');db.prepare("UPDATE orders SET payment_status='rejected' WHERE id=?").run(order.id);}
     else if(input.action==='fulfill'){if(order.payment_status!=='paid')fail(409,'Only paid orders can be fulfilled');db.prepare("UPDATE orders SET status='fulfilled' WHERE id=?").run(order.id);}
     else fail(400,'Choose a valid order action');audit(db,user.id,input.action,order.id);return reply(res,{success:true});
    }
    if(route==='/api/admin/receipt'&&method==='GET'){const order=db.prepare('SELECT receipt FROM orders WHERE id=?').get(url.searchParams.get('order')||'');if(!order?.receipt)fail(404,'Receipt not found');const file=path.basename(order.receipt);const bytes=await readFile(path.join(dataDir,'receipts',file));res.writeHead(200,{'Content-Type':'image/'+file.split('.').pop(),'X-Content-Type-Options':'nosniff','Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'"});res.end(bytes);return true;}
    if(route==='/api/admin/memberships'&&method==='GET')return reply(res,{rows:db.prepare('SELECT m.*,c.email,c.name AS customer_name,p.name AS plan FROM memberships m JOIN customers c ON c.id=m.customer_id JOIN products p ON p.id=m.product_id ORDER BY m.expires_at DESC LIMIT 1000').all()});
    if(route==='/api/admin/memberships'&&method==='PATCH'){if(!['active','suspended'].includes(input.status))fail(400,'Invalid membership status');const row=db.prepare('SELECT * FROM memberships WHERE id=?').get(text(input.id));if(!row||row.status==='cancelled')fail(409,'Membership cannot be changed');db.prepare('UPDATE memberships SET status=? WHERE id=?').run(input.status,row.id);audit(db,user.id,'membership_'+input.status,row.id);return reply(res,{success:true});}
    if(route==='/api/admin/products'&&method==='GET')return reply(res,{rows:db.prepare('SELECT * FROM products ORDER BY rowid').all().map(publicProduct)});
    if(route==='/api/admin/products'&&method==='PATCH'){
     if(!text(input.name)||!Number.isSafeInteger(input.price_cents)||input.price_cents<100||input.price_cents>10000000||!(input.inventory===null||Number.isInteger(input.inventory)&&input.inventory>=0))fail(400,'Enter a name, price of $1–$100,000, and valid inventory');
     db.prepare('UPDATE products SET name=?,price_cents=?,active=?,inventory=? WHERE id=?').run(text(input.name),input.price_cents,input.active?1:0,input.inventory,text(input.id));audit(db,user.id,'product_updated',text(input.id));return reply(res,{success:true});
    }
    if(route==='/api/admin/messages'&&method==='GET')return reply(res,{rows:db.prepare('SELECT m.*,c.name AS customer_name,c.email FROM messages m JOIN customers c ON c.id=m.customer_id ORDER BY m.created_at DESC LIMIT 1000').all().map(m=>({...m,replies:JSON.parse(m.replies)}))});
    if(route==='/api/admin/messages'&&method==='PATCH'){const message=db.prepare('SELECT * FROM messages WHERE id=?').get(text(input.id));if(!message)fail(404,'Message not found');const replies=JSON.parse(message.replies);if(text(input.reply,10000))replies.push({id:id('reply'),body:text(input.reply,10000),created_at:now(),from:'support'});db.prepare('UPDATE messages SET status=?,replies=? WHERE id=?').run(input.status==='closed'?'closed':'open',JSON.stringify(replies),message.id);audit(db,user.id,'support_updated',message.id);return reply(res,{success:true,emailSent:false});}
    if(route==='/api/admin/settings'&&method==='GET')return reply(res,{settings:settings(db),payments:config()});
    if(route==='/api/admin/settings'&&method==='PATCH'){
     if(input.cashTag&&!/^\$[A-Za-z0-9]{1,20}$/.test(input.cashTag))fail(400,'Enter a valid $CashTag');if(input.supportEmail&&!email(input.supportEmail))fail(400,'Enter a valid support email');
     for(const key of ['brand','cashTag','supportEmail','cryptoEnabled'])if(typeof input[key]==='string')db.prepare('UPDATE settings SET value=? WHERE key=?').run(text(input[key]),key);audit(db,user.id,'settings_updated','payments');return reply(res,{success:true});
    }
    if(route==='/api/admin/activity'&&method==='GET')return reply(res,{rows:db.prepare('SELECT * FROM audit ORDER BY created_at DESC LIMIT 500').all()});
   }
   fail(404,'API route not found');
  }catch(error){if(!res.headersSent)reply(res,{error:error.status?error.message:'The server could not process that request.'},error.status||500);else res.end();}
  return true;
 }
 return {handle,db,close:()=>db.close(),config};
}
