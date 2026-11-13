import {build} from 'esbuild';
import {mkdir,cp,readFile,writeFile,readdir} from 'node:fs/promises';
import path from 'node:path';
const root=new URL('../',import.meta.url).pathname;
const out=path.join(root,'dist');await mkdir(out,{recursive:true});
for(const entry of await readdir(path.join(root,'public'),{withFileTypes:true})){
 await cp(path.join(root,'public',entry.name),path.join(out,entry.name),{recursive:true});
}
await mkdir(path.join(out,'assets'),{recursive:true});
const css=await readFile(path.join(root,'src/base.css'),'utf8');
const overrides=await readFile(path.join(root,'src/overrides.css'),'utf8');
await writeFile(path.join(out,'assets/site.css'),css+'\n'+overrides);
const routes=JSON.parse(await readFile(path.join(root,'src/routes.json'),'utf8'));
const staticPages={};for(const [route,config] of Object.entries(routes))if(config.html)staticPages[route]=await readFile(path.join(root,'src',config.html),'utf8');
await build({entryPoints:[path.join(root,'src/app.jsx')],outfile:path.join(out,'assets/app.js'),bundle:true,format:'esm',minify:true,define:{'process.env.NODE_ENV':'"production"','globalThis.__RESERVE_STATIC_PAGES__':JSON.stringify(staticPages)},loader:{'.js':'jsx'},logLevel:'warning'});
const template=await readFile(path.join(root,'src/snapshots/index.html'),'utf8');
const capturedBody=template.match(/<header[\s\S]*?(?=<script)/)?.[0]||'';
const shell=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Club Wallen: The Reserve</title><meta name="description" content="Private Club Wallen reference rebuild for rebranding."><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/assets/site.css"><script type="module" src="/assets/app.js"></script></head><body><div id="root">${capturedBody}</div><noscript>This website needs JavaScript for carts, membership selection, and checkout.</noscript></body></html>`;
const outputRoutes=[...new Set([...Object.keys(routes),'/dashboard','/portal','/checkout/crypto'])];
for(const route of outputRoutes){
 const destination=route==='/'?path.join(out,'index.html'):path.join(out,route.slice(1),'index.html');
 await mkdir(path.dirname(destination),{recursive:true});
 let html=shell;
 if(route!=='/'){
  try{const reference=await readFile(path.join(root,'src/snapshots',route.slice(1)+'.html'),'utf8');const body=reference.match(/<header[\s\S]*?(?=<script)/)?.[0]||'';html=shell.replace(capturedBody,body);}catch{html=shell.replace(capturedBody,'');}
 }
 await writeFile(destination,html);
}
await writeFile(path.join(out,'404.html'),shell.replace(capturedBody,''));
console.log(`Built ${outputRoutes.length} routes into dist/`);
