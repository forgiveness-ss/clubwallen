import { parse } from 'acorn';
import { format } from 'prettier';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const root = new URL('../', import.meta.url).pathname;
const dir = path.join(root, 'reference/assets/_next/static/chunks');
await mkdir(path.join(root,'src/components'),{recursive:true});
const modules = new Map();
for (const file of await readdir(dir)) {
  if (!file.endsWith('.js')) continue;
  const text = await readFile(path.join(dir,file),'utf8');
  const ast = parse(text, {ecmaVersion:'latest',sourceType:'script'});
  for (const statement of ast.body) {
    const expression = statement.expression;
    if (expression?.type !== 'CallExpression' || expression.callee?.property?.name !== 'push') continue;
    const entries = expression.arguments[0]?.elements || [];
    for(let i=1;i<entries.length;i++) {
      const node=entries[i], previous=entries[i-1];
      if (!['ArrowFunctionExpression','FunctionExpression'].includes(node?.type) || typeof previous?.value !== 'number') continue;
      const source=text.slice(node.start,node.end);
      const imports=[...source.matchAll(/\b\w+\.i\((\d+)\)/g)].map(x=>Number(x[1]));
      const ids=[];for(let j=i-1;j>=1&&typeof entries[j]?.value==='number';j--)ids.unshift(entries[j].value);
      for(const id of ids)modules.set(id,{id,primary:previous.value,ids,source,imports,file});
    }
  }
}
const stubs = new Set([40450,13742,30037,6028,20755]);
const frameworkFiles=new Set(['0hcj0-xa5se5_.js','0if1skv0~puq5.js','0b_ibvy1drh3c.js','0uqlaygos-vyc.js','0hzn832vd~-am.js','05vrt61v2hyp4.js','0rxxkwqkzo8j_.js','03~yq9q893hmn.js','06lvv2-o5d4ep.js','turbopack-0pox8-uzq--ey.js']);
const wanted = new Set([70119]);
const routes = {};
async function pages(dir,prefix='') {
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    if(entry.isDirectory()){await pages(path.join(dir,entry.name),prefix+entry.name+'/');continue;}
    if(!entry.name.endsWith('.html'))continue;
    const route=entry.name==='index.html'?'/':'/'+prefix+entry.name.slice(0,-5);
    const html=await readFile(path.join(dir,entry.name),'utf8');
    const ids=[...html.matchAll(/\\?"I?\[?(\d+),\[\\?"\/_next\/static/g)].map(x=>Number(x[1]));
    const refs=[...html.matchAll(/I\[(\d+),\[/g)].map(x=>Number(x[1]));
    let component=refs.find(id=>modules.has(id) && !frameworkFiles.has(modules.get(id).file));
    if(!component){
      const scripts=[...html.matchAll(/<script src="([^\"]+)/g)].map(x=>path.basename(x[1]));
      const custom=[...modules.values()].filter(m=>scripts.includes(m.file)&&!frameworkFiles.has(m.file)&&m.id!==20755&&m.imports.includes(40450));
      component=custom.at(-1)?.id;
    }
    if(component){ wanted.add(component);routes[route]={module:component}; }
    else {
      const main=html.match(/<main>([\s\S]*?)<\/main>/)?.[1]||'';
      await mkdir(path.join(root,'src/static-pages'),{recursive:true});
      const filename=route.replaceAll('/','_')||'_';
      await writeFile(path.join(root,'src/static-pages',filename+'.html'),main);
      routes[route]={html:'static-pages/'+filename+'.html'};
    }
  }
}
await pages(path.join(root,'reference/pages'));
function include(id){
 if(stubs.has(id))return;
 const m=modules.get(id);if(!m)throw new Error('Missing dependency '+id);
 for(const dep of m.imports)if(!wanted.has(dep)){wanted.add(dep);include(dep);}
}
for(const id of [...wanted])include(id);
const registry=[];
const names={70119:'Header',21309:'CashApp',37142:'Checkout',99483:'Confirmation',78928:'Dashboard',45385:'Foundation',30229:'FAQ',31713:'Home',7103:'Join',89954:'Login',14270:'FestivalCheckout',12293:'HotelPackages',19330:'Festival',32115:'Shop',82306:'Signup',64829:'Support',93546:'Tickets',55411:'FestivalData',80883:'FestivalFooter',56226:'FestivalCart'};
const emitted=new Set();
for(const id of wanted){
 if(stubs.has(id))continue;
 const m=modules.get(id);
 if(emitted.has(m.primary))continue;emitted.add(m.primary);
 let body=m.source;
 let prefix='';
 if(m.primary===21309){prefix="import {siteConfig} from '../site.config.js';\n";body=body.replace('let r="$30mog",o="support@clubwallen.site"','let r=siteConfig.cashTag,o=siteConfig.supportEmail');}
 if(m.primary===37142)body=body.replace('form:d,','form:{firstName:d.firstName,lastName:d.lastName,email:d.email,address:d.address,city:d.city,state:d.state,zip:d.zip,country:d.country},');
 if(m.primary===82306)body=body.replace('console.log("SIGNUP RESULT:",{data:i,signUpError:o}),o','o').replace('DEBUG SUCCESS: user created with id ${i.user.id}. Redirecting...','Demo account created. Opening the demo sign-in page...').replace('SUPABASE ERROR:','Account error:');
 if(m.primary===89954)body=body.replace('Account created! Our team is reviewing your details. You\'ll receive a confirmation email once approved.','Demo account created. Use the demo sign-in details shown above; no confirmation email is sent.');
 if(m.primary===64829)body=body.replace('Your message has been sent to our support team. We typically respond within a few hours.','Your demo message has been saved in this browser. No email has been sent.').replace(' We\'ll reply directly to your email.',' Connect your own support service before launching.').replace(' You\'ll also receive our reply in your member messages inbox.','');
 if(m.primary===14270){prefix="import {siteConfig} from '../site.config.js';\n";body=body.replace('l="support@clubwallen.site"','l=siteConfig.supportEmail').replace('"One pay bank"','"Your bank name"').replace('"125109006"','"DEMO — NOT PAYABLE"').replace('"11504380101"','"DEMO — NOT PAYABLE"').replace('"180 Wilkinson ct SE apt 3d, Concord, North Carolina 28025"','"Your bank address"').replace('Your order is reserved. Complete your bank transfer below, then email your payment screenshot so we can confirm it right away.','Demo order saved. Bank transfers are disabled in this preview. Configure your own bank details before launching.').replace('Connecting to Stripe…','Previewing card checkout…').replace('Secure connection active','Demo connection preview');}
 if(m.primary===21309)body=body.replace('I Have Sent Payment ✓','Complete Demo Payment ✓').replace('localStorage.removeItem("cw_cashapp_order")','localStorage.setItem("reserve_demo_orders",JSON.stringify([...JSON.parse(localStorage.getItem("reserve_demo_orders")||"[]"),{...h,status:"demo_complete"}])),localStorage.removeItem("cw_cashapp_order")');
 if(m.primary===99483)body=body.replaceAll('payment received.','demo checkout completed.').replaceAll('Bitcoin payment submitted.','Bitcoin demo checkout submitted.');
 const source=await format(prefix+'export default '+body+';\n',{parser:'babel'});
 const name=names[m.primary]||String(m.primary);
 await writeFile(path.join(root,'src/components',name+'.js'),source);
 registry.push(`import module${m.primary} from './components/${name}.js';`);
}
registry.push('export const factories = {'+[...wanted].filter(id=>!stubs.has(id)).map(id=>`${id}:module${modules.get(id).primary}`).join(',')+'};');
registry.push('export const primaryIds = '+JSON.stringify(Object.fromEntries([...wanted].filter(id=>!stubs.has(id)).map(id=>[id,modules.get(id).primary])))+';');
await writeFile(path.join(root,'src/registry.js'),registry.join('\n'));
await writeFile(path.join(root,'src/routes.json'),JSON.stringify(routes,null,2));
console.log(JSON.stringify({routes, modules:[...wanted].filter(id=>!stubs.has(id)), stubs:[...wanted].filter(id=>stubs.has(id))},null,2));
