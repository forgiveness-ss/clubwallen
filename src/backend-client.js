export async function api(endpoint,options={}){
 const response=await fetch(endpoint,{credentials:'same-origin',...options,headers:{'Content-Type':'application/json',...options.headers},...(options.body&&typeof options.body!=='string'?{body:JSON.stringify(options.body)}:{})});
 const data=await response.json();if(!response.ok)throw Error(data.error||'Request failed');return data;
}
export const money=cents=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format((Number(cents)||0)/100);
export const date=value=>value?new Date(value).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'—';
