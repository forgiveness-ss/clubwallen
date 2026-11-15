import assert from 'node:assert/strict';
import {readFile,stat,readdir} from 'node:fs/promises';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {loadComponent} from '../src/runtime.js';
import {installServices,stripPasswords,getSupabaseBrowserClient} from '../src/services.js';
import {siteConfig} from '../src/site.config.js';
const routes=JSON.parse(await readFile(new URL('../src/routes.json',import.meta.url),'utf8'));
globalThis.window={location:{pathname:'/',search:'',hash:'',href:'https://rebuild.example/'},fetch:async()=>{throw Error('Unexpected external API call')}};
globalThis.location={href:'https://rebuild.example/',origin:'https://rebuild.example'};
class MemoryStorage{values=new Map();getItem(key){return this.values.get(key)??null;}setItem(key,value){this.values.set(key,String(value));}removeItem(key){this.values.delete(key);}}
globalThis.Storage=MemoryStorage;globalThis.localStorage=new MemoryStorage();globalThis.sessionStorage=new MemoryStorage();window.localStorage=localStorage;
let rendered=0;
for(const[route,config]of Object.entries(routes)){
 if(!config.module){assert.ok((await readFile(new URL('../src/'+config.html,import.meta.url),'utf8')).length>500);continue;}
 window.location.pathname=route;
 const Page=loadComponent(config.module).default;
 assert.equal(typeof Page,'function',route+' must export a page');
 const html=renderToString(React.createElement(Page));if(route!=='/dashboard')assert.ok(html.length>20,route+' renders');rendered++;
 for(const match of html.matchAll(/(?:src|poster)="(\/[^"?]+)"/g)){
  if(match[1].startsWith('/maps/'))continue; // These URLs also return 404 on the reference.
  assert.ok((await stat(new URL('../public'+match[1],import.meta.url))).isFile(),route+' asset '+match[1]);
 }
 const target=new URL('../dist'+(route==='/'?'':route)+'/index.html',import.meta.url);assert.ok((await stat(target)).isFile());
}
siteConfig.mode='demo';
installServices();
assert.deepEqual(stripPasswords({password:'secret',form:{confirmPassword:'secret',email:'demo@example.com'}}),{form:{email:'demo@example.com'}});
localStorage.setItem('cw_cashapp_order',JSON.stringify({form:{password:'secret',confirmPassword:'secret',email:'demo@example.com'}}));
assert.ok(!localStorage.getItem('cw_cashapp_order').includes('secret'),'checkout passwords are never persisted');
const api=(endpoint,data)=>window.fetch(endpoint,{method:'POST',body:JSON.stringify(data)});
const bad=await api('/api/nowpayments/create-payment',{amount:-5});assert.equal(bad.status,400);
const payment=await api('/api/nowpayments/create-payment',{amount:350,orderId:'DEMO-1',orderDescription:'Membership'});
assert.equal((await payment.json()).invoiceUrl,'/checkout/crypto');
assert.equal(JSON.parse(sessionStorage.getItem('reserve_crypto_order')).amount,350);
await api('/api/sand-orders',{orderId:'SIB-DEMO',items:[{unitPrice:100,qty:2}],promoCode:'MOWA1'});
const card=await api('/api/sand-orders/pay-card',{orderId:'SIB-DEMO'});assert.equal((await card.json()).url,'/checkout/crypto');
assert.equal(JSON.parse(sessionStorage.getItem('reserve_crypto_order')).amount,100);
assert.equal(JSON.parse(sessionStorage.getItem('reserve_crypto_order')).method,'card');
const client=getSupabaseBrowserClient();assert.ok((await client.auth.signInWithPassword({email:'someone@example.com',password:'wrong'})).error);
assert.equal((await client.auth.signInWithPassword({email:'demo@example.com',password:'ReserveDemo2026!'})).error,null);
await api('/api/notify-admin',{type:'support_message',data:{name:'Demo',email:'demo@example.com',message:'Test message'}});
assert.equal(JSON.parse(localStorage.getItem('reserve_demo_messages')).length,1);
const account=await client.from('accounts').select('*').eq('id','demo-member').single();assert.equal(account.data.status,'active');
await client.auth.signOut();assert.equal((await client.auth.getUser()).data.user,null);
const bundle=await readFile(new URL('../dist/assets/app.js',import.meta.url),'utf8');
assert.ok(!bundle.includes('.supabase.co'),'the original Supabase project must not ship');
assert.ok(!bundle.includes('$30mog'),'the original Cash App destination must not ship');
assert.ok(!bundle.includes('125109006')&&!bundle.includes('11504380101'),'the original bank details must not ship');
console.log(`PASS: ${rendered} React pages, legal pages, local assets, authentication, password redaction, payment previews, promo totals, support persistence, and original-service isolation.`);
