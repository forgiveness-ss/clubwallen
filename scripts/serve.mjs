import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {createApi} from '../server/api.mjs';
const projectRoot=path.resolve(new URL('../',import.meta.url).pathname);
const envPath=path.join(projectRoot,'.env');if(existsSync(envPath))process.loadEnvFile(envPath);
const root=path.resolve(new URL('../dist/',import.meta.url).pathname);
const build=spawnSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});if(build.status!==0)process.exit(build.status);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.ico':'image/x-icon'};
const port=Number(process.env.PORT||4173);
const dataDir=path.resolve(process.env.DATA_DIRECTORY||path.join(projectRoot,'.data'));
const api=createApi({filename:path.join(dataDir,'exclusive.sqlite'),dataDir,baseUrl:process.env.APP_BASE_URL||`http://localhost:${port}`,stripeKey:process.env.STRIPE_SECRET_KEY||'',stripeWebhook:process.env.STRIPE_WEBHOOK_SECRET||''});
const server=http.createServer(async(req,res)=>{
 try{
  if(await api.handle(req,res)||res.writableEnded)return;
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep))throw Error('Invalid path');
  try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');}catch{if(path.extname(pathname)){res.writeHead(404);res.end('Not found');return;}file=path.join(root,'index.html');}
  const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Website: http://localhost:${port}\nCRM: http://localhost:${port}/admin\nDatabase: ${dataDir}/exclusive.sqlite`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>{api.close();process.exit(0);}));
