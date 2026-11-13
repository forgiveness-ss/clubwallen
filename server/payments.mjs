import {createHmac,timingSafeEqual} from 'node:crypto';
export function equalHex(a,b){return typeof a==='string'&&typeof b==='string'&&/^[a-f\d]+$/i.test(a)&&a.length===b.length&&timingSafeEqual(Buffer.from(a,'hex'),Buffer.from(b,'hex'));}
export function verifyStripe(raw,header,secret,at=Date.now()){
 if(!secret||typeof header!=='string')return false;
 const entries=header.split(',').map(s=>s.split('='));const t=entries.find(([k])=>k==='t')?.[1];
 if(!/^\d+$/.test(t||'')||Math.abs(at/1000-Number(t))>300)return false;
 const signature=createHmac('sha256',secret).update(`${t}.${raw}`).digest('hex');
 return entries.some(([k,v])=>k==='v1'&&equalHex(signature,v));
}
export async function stripeCheckout(order,token,env,fetcher=fetch){
 const form=new URLSearchParams({mode:'payment',customer_email:order.email,client_reference_id:order.id,'metadata[order_id]':order.id,success_url:`${env.baseUrl}/checkout/result?order=${order.id}&token=${token}`,cancel_url:`${env.baseUrl}/checkout?cancelled=1`,'payment_method_types[0]':order.method==='crypto'?'crypto':'card'});
 order.items.forEach((item,index)=>{form.set(`line_items[${index}][price_data][currency]`,'usd');form.set(`line_items[${index}][price_data][unit_amount]`,String(item.unitPrice));form.set(`line_items[${index}][price_data][product_data][name]`,item.name+(item.size?` · ${item.size}`:''));form.set(`line_items[${index}][quantity]`,String(item.quantity));});
 if(order.shippingCents){const i=order.items.length;form.set(`line_items[${i}][price_data][currency]`,'usd');form.set(`line_items[${i}][price_data][unit_amount]`,String(order.shippingCents));form.set(`line_items[${i}][price_data][product_data][name]`,'Shipping');form.set(`line_items[${i}][quantity]`,'1');}
 const response=await fetcher('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{Authorization:`Bearer ${env.stripeKey}`,'Content-Type':'application/x-www-form-urlencoded','Idempotency-Key':order.id},body:form,signal:AbortSignal.timeout(20000)});
 const data=await response.json();if(!response.ok||!data.id||!data.url)throw Error('Stripe could not create a checkout session. Check your server configuration.');
 const url=new URL(data.url);if(url.protocol!=='https:'||url.hostname!=='checkout.stripe.com')throw Error('Invalid Stripe checkout URL');
 return {id:data.id,url:data.url};
}
