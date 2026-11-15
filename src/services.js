import {siteConfig} from './site.config.js';
const json = (data, status=200) => new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}});
const parse = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
export function stripPasswords(value) {
  if(Array.isArray(value))return value.map(stripPasswords);
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([key])=>!/password|^confirm$/i.test(key)).map(([key,v])=>[key,stripPasswords(v)]));
  return value;
}
export function installServices() {
  // The reference writes checkout form objects to localStorage. Keep passwords
  // in React memory only; remove them from every persisted demo order.
  const setItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key,value) {
    if(/^(cw_|reserve_|sib-)/.test(key)) {
      try { value=JSON.stringify(stripPasswords(JSON.parse(value))); } catch {}
    }
    return setItem.call(this,key,value);
  };
  const originalFetch=window.fetch.bind(window);
  window.fetch=async (input,options={}) => {
    const url=new URL(typeof input==='string'?input:input.url,location.href);
    if(url.origin!==location.origin||!url.pathname.startsWith('/api/'))return originalFetch(input,options);
    if(siteConfig.mode!=='demo')return originalFetch(input,options);
    if(url.pathname==='/api/nowpayments/create-payment') {
      let data;try{data=JSON.parse(options.body||'{}');}catch{return json({error:'Invalid order'},400);}
      if(!Number.isFinite(data.amount)||data.amount<=0)return json({error:'Invalid order amount'},400);
      const order=stripPasswords({...data,id:data.orderId||`DEMO-${Date.now()}`,status:'demo_pending',createdAt:new Date().toISOString()});
      sessionStorage.setItem('reserve_crypto_order',JSON.stringify(order));
      return json({invoiceUrl:'/checkout/crypto',paymentUrl:'/checkout/crypto',demo:true});
    }
    if(url.pathname==='/api/notify-admin') {
      let body;try{body=JSON.parse(options.body||'{}');}catch{return json({error:'Invalid message'},400);}
      if(body.type==='support_message'){
        const messages=parse('reserve_demo_messages',[]);
        const {attachment,...data}=body.data||{};
        messages.push({...data,id:`DEMO-${Date.now()}`,createdAt:new Date().toISOString(),status:'saved_locally'});
        localStorage.setItem('reserve_demo_messages',JSON.stringify(messages));
      }
      return json({success:true,demo:true,delivery:'local-only'});
    }
    if(url.pathname==='/api/tickets/payment-selected')return json({success:true,demo:true});
    if(url.pathname==='/api/tickets/payment-proof')return json({success:true,demo:true,delivery:'local-only'});
    if(url.pathname==='/api/sand-orders') {
      let data;try{data=JSON.parse(options.body||'{}');}catch{return json({error:'Invalid order'},400);}
      if(!data.orderId||!Array.isArray(data.items))return json({error:'Missing order details'},400);
      sessionStorage.setItem('reserve_festival_order',JSON.stringify(stripPasswords(data)));
      return json({success:true,orderId:data.orderId,demo:true});
    }
    if(url.pathname==='/api/sand-orders/pay'||url.pathname==='/api/sand-orders/pay-card') {
      const stored=JSON.parse(sessionStorage.getItem('reserve_festival_order')||'null');
      if(!stored)return json({error:'Your checkout session has expired. Please return to your cart.'},400);
      const subtotal=stored.items.reduce((sum,item)=>sum+item.unitPrice*item.qty,0);
      const amount=Math.round(subtotal*(stored.promoCode==='MOWA1'?.5:1)*100)/100;
      const method=url.pathname.endsWith('pay-card')?'card':'crypto';
      sessionStorage.setItem('reserve_crypto_order',JSON.stringify({id:stored.orderId,amount,orderDescription:'Sand In My Boots festival order',orderType:'festival',method,status:'demo_pending'}));
      return json({url:'/checkout/crypto',demo:true});
    }
    return json({error:'This endpoint needs your own backend configuration.',demo:true},501);
  };
}
function profile() {try{return JSON.parse(sessionStorage.getItem('reserve_demo_profile'));}catch{return null;}}
function saveProfile(email, names={}) {
  const user={id:'demo-member',email,user_metadata:names};
  sessionStorage.setItem('reserve_demo_profile',JSON.stringify(user));return user;
}
// This adapter never sends credentials to the source site's Supabase project.
// Demo login accepts demo@example.com / ReserveDemo2026! only.
export function getSupabaseBrowserClient() {
  return {
    auth: {
      async signUp({email,options}){return {data:{user:saveProfile(email,options?.data),session:null},error:null};},
      async signInWithPassword({email,password}){
        if(email!=='demo@example.com'||password!=='ReserveDemo2026!')return {data:{user:null},error:{message:'Use the demo credentials shown above.'}};
        const user=saveProfile(email,{first_name:'Demo',last_name:'Member'});
        localStorage.setItem('cw_loggedIn','true');return {data:{user,session:{user}},error:null};
      },
      async signOut(){sessionStorage.removeItem('reserve_demo_profile');localStorage.removeItem('cw_loggedIn');return {error:null};},
      async getUser(){return {data:{user:profile()},error:null};},
      async getSession(){const user=profile();return {data:{session:user?{user}:null},error:null};},
      onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}};},
    },
    from(table){
      const user=profile();
      let rows=table==='accounts'?{status:'active',auth_user_id:'demo-member',email:user?.email,first_name:user?.user_metadata?.first_name||'Demo'}:table==='support_messages'?parse('reserve_demo_messages',[]).map(message=>({id:message.id,subject:message.subject||'Support Request',body:message.message,read:true,created_at:message.createdAt,attachment:message.attachmentName})):[];
      const result=()=>({data:rows,error:null});
      const chain={select(){return chain},eq(){return chain},in(){return chain},order(){return chain},insert(){return chain},upsert(){return chain},update(){return chain},single:async()=>result(),maybeSingle:async()=>result(),then(resolve){return Promise.resolve(result()).then(resolve)}};return chain;
    },
  };
}
