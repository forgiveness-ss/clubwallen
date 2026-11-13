// Isolated UI verification server. All accounts and records are temporary fixtures.
import http from 'node:http';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {randomBytes,createHash} from 'node:crypto';
import {createApi} from '../server/api.mjs';
import {customer,now} from '../server/database.mjs';
const port=4211,origin=`http://localhost:${port}`,dir=await mkdtemp(path.join(os.tmpdir(),'exclusive-ui-'));
const api=createApi({filename:':memory:',dataDir:dir,baseUrl:origin});
const token=randomBytes(32).toString('hex');
api.db.prepare('INSERT INTO accounts(id,email,password_hash,role,first_name,last_name,created_at,verified) VALUES(?,?,?,?,?,?,?,1)').run('qa-admin','qa@example.test','unused','admin','Preview','Admin',now());
api.db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(createHash('sha256').update(token).digest('hex'),'qa-admin',Date.now()+3600000);
const client=customer(api.db,'customer@example.test','Sample Customer');
api.db.prepare('INSERT INTO messages(id,customer_id,subject,body,created_at) VALUES(?,?,?,?,?)').run('qa-message',client.id,'Membership question','A temporary support message used for UI verification.',now());
const root=new URL('../dist/',import.meta.url).pathname;
const server=http.createServer(async(req,res)=>{
 if(req.url==='/__qa_enter'){res.writeHead(302,{'Set-Cookie':`exclusive_session=${token}; HttpOnly; SameSite=Strict; Path=/`,Location:'/admin'});res.end();return;}
 if(await api.handle(req,res)||res.writableEnded)return;
 const pathname=new URL(req.url,origin).pathname;
 try{const file=pathname.startsWith('/assets/')?path.join(root,pathname):path.join(root,'admin/index.html');const data=await readFile(file);res.writeHead(200,{'Content-Type':pathname.endsWith('.js')?'text/javascript':pathname.endsWith('.css')?'text/css':'text/html'});res.end(data);}catch{res.writeHead(404);res.end();}
});
server.listen(port,'127.0.0.1',()=>console.log('Temporary QA workspace: '+origin+'/__qa_enter'));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(async()=>{api.close();await rm(dir,{recursive:true,force:true});process.exit(0);}));
