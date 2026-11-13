import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const root=new URL('../reference/',import.meta.url).pathname;
const assets=JSON.parse(await readFile(path.join(root,'extra-assets.json'),'utf8'));
await Promise.all(assets.map(async asset=>{
 try{
  const destination=path.join(root,'assets',asset);
  try{await readFile(destination);return;}catch{}
  const response=await fetch('https://www.clubwallen.site'+asset,{signal:AbortSignal.timeout(60000)});
  if(!response.ok)throw Error('HTTP '+response.status);
  await mkdir(path.dirname(destination),{recursive:true});
  await writeFile(destination,Buffer.from(await response.arrayBuffer()));console.log('OK',asset);
 }catch(error){console.log('FAILED',asset,error.message);}
}));
