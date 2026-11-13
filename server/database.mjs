import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,readFileSync} from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
export const now=()=>new Date().toISOString();
export const id=prefix=>`${prefix}_${randomUUID()}`;
export function openDatabase(filename){
 if(filename!==':memory:')mkdirSync(path.dirname(filename),{recursive:true,mode:0o700});
 const db=new DatabaseSync(filename);
 db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
 CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY,email TEXT NOT NULL UNIQUE,password_hash TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN('admin','customer')),first_name TEXT NOT NULL,last_name TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL,verified INTEGER NOT NULL DEFAULT 0);
 CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,account_id TEXT NOT NULL REFERENCES accounts(id),expires_at INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS customers(id TEXT PRIMARY KEY,email TEXT NOT NULL UNIQUE,name TEXT NOT NULL,notes TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS products(id TEXT PRIMARY KEY,name TEXT NOT NULL,kind TEXT NOT NULL,price_cents INTEGER NOT NULL CHECK(price_cents>0),currency TEXT NOT NULL DEFAULT 'usd',active INTEGER NOT NULL DEFAULT 1,image TEXT,description TEXT NOT NULL DEFAULT '',sizes TEXT NOT NULL DEFAULT '[]',inventory INTEGER CHECK(inventory IS NULL OR inventory>=0));
 CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),status TEXT NOT NULL DEFAULT 'pending',payment_status TEXT NOT NULL DEFAULT 'unpaid',method TEXT NOT NULL,amount_cents INTEGER NOT NULL,currency TEXT NOT NULL DEFAULT 'usd',items TEXT NOT NULL,address TEXT NOT NULL DEFAULT '{}',access_token_hash TEXT NOT NULL,provider_id TEXT,provider_payment_id TEXT,provider_mode TEXT NOT NULL DEFAULT 'test',receipt TEXT,reference TEXT NOT NULL DEFAULT '',notes TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL,paid_at TEXT);
 CREATE TABLE IF NOT EXISTS memberships(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),product_id TEXT NOT NULL REFERENCES products(id),order_id TEXT NOT NULL REFERENCES orders(id),status TEXT NOT NULL DEFAULT 'active',starts_at TEXT NOT NULL,expires_at TEXT NOT NULL,UNIQUE(order_id,product_id));
 CREATE TABLE IF NOT EXISTS messages(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),subject TEXT NOT NULL,body TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'open',replies TEXT NOT NULL DEFAULT '[]',created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS webhook_events(id TEXT PRIMARY KEY,provider TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS audit(id TEXT PRIMARY KEY,actor TEXT NOT NULL,action TEXT NOT NULL,target TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);
 CREATE INDEX IF NOT EXISTS orders_customer ON orders(customer_id);
 CREATE INDEX IF NOT EXISTS messages_customer ON messages(customer_id);`);
 if(!db.prepare('PRAGMA table_info(accounts)').all().some(c=>c.name==='verified'))db.exec('ALTER TABLE accounts ADD COLUMN verified INTEGER NOT NULL DEFAULT 0');
 const seed=JSON.parse(readFileSync(new URL('./catalog.json',import.meta.url),'utf8'));
 const insert=db.prepare('INSERT OR IGNORE INTO products(id,name,kind,price_cents,image,description,sizes) VALUES(?,?,?,?,?,?,?)');
 for(const p of seed)insert.run(p.id,p.name,p.kind,p.price_cents,p.image||null,p.description||'',JSON.stringify(p.sizes||[]));
 for(const [key,value]of Object.entries({brand:'The Exclusive',country:'United States',currency:'USD',renewal:'manual',cashTag:'',supportEmail:'',cryptoEnabled:'false'}))db.prepare('INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)').run(key,value);
 return db;
}
export function transaction(db,fn){db.exec('BEGIN IMMEDIATE');try{const value=fn();db.exec('COMMIT');return value;}catch(error){db.exec('ROLLBACK');throw error;}}
export function audit(db,actor,action,target){db.prepare('INSERT INTO audit VALUES(?,?,?,?,?)').run(id('log'),actor,action,target,now());}
export function customer(db,email,name){
 let row=db.prepare('SELECT * FROM customers WHERE email=?').get(email);
 if(!row){db.prepare('INSERT INTO customers(id,email,name,created_at) VALUES(?,?,?,?)').run(id('cus'),email,name,now());row=db.prepare('SELECT * FROM customers WHERE email=?').get(email);}
 return row;
}
export function settings(db){return Object.fromEntries(db.prepare('SELECT * FROM settings').all().map(r=>[r.key,r.value]));}
export function publicProduct(p){return {...p,active:!!p.active,sizes:JSON.parse(p.sizes),price:p.price_cents/100,category:p.kind==='membership'?'membership':p.id.includes('hoodie')?'hoodies':p.id.includes('hat')||p.id==='mw-cl'?'hats':'tees'};}
export function orderView(row){return {...row,items:JSON.parse(row.items),address:JSON.parse(row.address),access_token_hash:undefined};}
export function settleOrder(db,orderId,actor,paymentId=null){
 return transaction(db,()=>{
  const order=db.prepare('SELECT * FROM orders WHERE id=?').get(orderId);
  if(!order)throw Error('Order not found');
  if(order.payment_status==='paid')return false;
  if(order.status==='cancelled'||order.payment_status==='refunded')throw Error('Order cannot be marked paid');
  const paid=now();
  db.prepare("UPDATE orders SET payment_status='paid',status='processing',paid_at=?,provider_payment_id=? WHERE id=?").run(paid,paymentId,orderId);
  for(const item of JSON.parse(order.items)){
   const product=db.prepare('SELECT * FROM products WHERE id=?').get(item.productId);
   if(product?.inventory!==null&&product){const result=db.prepare('UPDATE products SET inventory=inventory-? WHERE id=? AND inventory>=?').run(item.quantity,item.productId,item.quantity);if(!result.changes)throw Error('Inventory changed; payment requires reconciliation');}
   if(item.kind==='membership'){
    const last=db.prepare("SELECT MAX(expires_at) AS expires FROM memberships WHERE customer_id=? AND status='active'").get(order.customer_id)?.expires;
    const start=last&&last>paid?last:paid;const end=new Date(start);end.setUTCFullYear(end.getUTCFullYear()+1);
    db.prepare('INSERT OR IGNORE INTO memberships(id,customer_id,product_id,order_id,starts_at,expires_at) VALUES(?,?,?,?,?,?)').run(id('mem'),order.customer_id,item.productId,orderId,start,end.toISOString());
   }
  }
  audit(db,actor,'payment_verified',orderId);return true;
 });
}
