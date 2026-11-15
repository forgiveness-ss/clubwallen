import React from 'react';
import {createRoot} from 'react-dom/client';
import routes from './routes.json';
import {loadComponent} from './runtime.js';
import {installServices,getSupabaseBrowserClient} from './services.js';
import {useLocation,navigate,Link} from './navigation.js';
import {siteConfig} from './site.config.js';
import Admin from './Admin.jsx';
import {StoreCheckout,OrderResult,CustomerAuth,CustomerAccount} from './Commerce.jsx';
installServices();
const Header=loadComponent(70119).default;
const legalContent=globalThis.__RESERVE_STATIC_PAGES__||{};
function Notice({path}){
  if(path==='/support')return null;
  if(siteConfig.mode==='local'&&['/checkout','/checkout/result','/login','/signup','/dashboard','/portal'].includes(path))return null;
  if(!/^\/(login|signup|checkout|confirmation|support|donate|dashboard|portal)/.test(path)&&!path.endsWith('/checkout'))return null;
  return <aside className="demo-notice" role="note">{siteConfig.mode==='local'?path==='/support'?'Messages are saved to the support inbox. Replies are available in your customer account; email delivery is not configured.':'Reference preview: event, hotel, donation, and legacy checkout screens are not connected to live inventory or payments.':'Private rebuild · Demo mode. No payments are collected or messages emailed.'}{siteConfig.mode==='demo'&&path==='/login'&&<span> Sign in: <strong>demo@example.com</strong> / <strong>ReserveDemo2026!</strong></span>}</aside>;
}
function PaymentPreview(){
  let order;try{order=JSON.parse(sessionStorage.getItem('reserve_crypto_order'));}catch{}
  const [done,setDone]=React.useState(false);
  return <div className="utility-page"><div className="utility-card"><p className="eyebrow">{siteConfig.name} · {siteConfig.subtitle}</p><h1>{done?'Demo order complete':order?.method==='card'?'Card Checkout':'Crypto Checkout'}</h1><p>{order?.orderDescription||'Your order'}</p>{order&&<><p className="payment-total">${Number(order.amount).toFixed(2)}</p><p className="muted">Order {order.id}</p></>}<div className="demo-panel">{done?'This test order is complete. No money was transferred.':order?.method==='card'?'This is a card checkout preview. Connect your own Stripe account to accept real card payments.':'This is a preview of the crypto payment flow. Connect your own NOWPayments account to issue real invoices.'}</div>{order&&!done&&<button className="gold-button" onClick={()=>{const orders=JSON.parse(localStorage.getItem('reserve_demo_orders')||'[]');orders.push({...order,status:'demo_complete'});localStorage.setItem('reserve_demo_orders',JSON.stringify(orders));sessionStorage.removeItem('reserve_crypto_order');setDone(true);}}>Complete demo order</button>}<Link href="/shop" className="text-link">Back to the shop →</Link></div></div>;
}
function CookieChoices({onClose}){
  return <div className="cookie-overlay" onClick={onClose}><section role="dialog" aria-modal="true" aria-labelledby="cookie-heading" className="cookie-dialog" onClick={e=>e.stopPropagation()}><h2 id="cookie-heading">Cookie Choices</h2><p>This preview uses browser storage for your cart and demo preferences. Essential storage keeps those features working.</p><button className="gold-button" autoFocus onClick={()=>{localStorage.setItem('reserve_cookie_choices','essential');onClose();}}>Essential only</button><button className="text-link" onClick={()=>{localStorage.setItem('reserve_cookie_choices','all');onClose();}}>Accept all</button><button className="text-link" onClick={onClose}>Close</button></section></div>;
}
function NotFound(){return <div className="utility-page"><div className="utility-card"><p className="eyebrow">404</p><h1>Let's get you back.</h1><Link className="gold-button" href="/">Return Home</Link></div></div>;}
class ErrorBoundary extends React.Component{
  state={error:null};static getDerivedStateFromError(error){return {error};}
  componentDidCatch(error){console.error('Page error:',error);}
  render(){return this.state.error?<div className="utility-page"><div className="utility-card"><h1>This page couldn't load.</h1><p>{this.state.error.message}</p><Link href="/">Return Home</Link></div></div>:this.props.children;}
}
function App(){
  const current=useLocation(),path=current.split(/[?#]/)[0].replace(/\/$/,'')||'/';
  const [cookies,setCookies]=React.useState(false);
  React.useEffect(()=>{
    document.title=siteConfig.title;
    const click=event=>{
      const button=event.target.closest('button');
      if(button?.textContent==='Cookie Choices')setCookies(true);
      const anchor=event.target.closest('a');
      if(anchor&&!event.defaultPrevented&&anchor.origin===location.origin&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&anchor.target!=='_blank'){event.preventDefault();navigate(anchor.href);}
    };
    const key=event=>{if(event.key==='Escape')setCookies(false);};
    document.addEventListener('click',click);document.addEventListener('keydown',key);
    return()=>{document.removeEventListener('click',click);document.removeEventListener('keydown',key);};
  },[]);
  React.useEffect(()=>{
    const observer=new MutationObserver(()=>{
      for(const input of document.querySelectorAll('input,textarea,select')){
        if(input.getAttribute('aria-label')||input.id)continue;
        const label=input.parentElement?.querySelector('label')?.textContent;
        if(label)input.setAttribute('aria-label',label);
      }
    });observer.observe(document.getElementById('root'),{childList:true,subtree:true});return()=>observer.disconnect();
  },[path]);
  let Page;
  if(path==='/admin'||path.startsWith('/admin/'))Page=Admin;
  else if(siteConfig.mode==='local'&&path==='/checkout')Page=StoreCheckout;
  else if(siteConfig.mode==='local'&&path==='/checkout/result')Page=OrderResult;
  else if(siteConfig.mode==='local'&&path==='/login')Page=CustomerAuth;
  else if(siteConfig.mode==='local'&&path==='/signup')Page=()=> <CustomerAuth signup/>;
  else if(siteConfig.mode==='local'&&(path==='/dashboard'||path==='/portal'))Page=CustomerAccount;
  else if(path==='/checkout/crypto'||path==='/checkout/cashapp')Page=StoreCheckout;
  else if(path==='/dashboard'||path==='/portal')Page=loadComponent(78928).default;
  else if(routes[path]?.module)Page=loadComponent(routes[path].module).default;
  else if(routes[path]?.html)Page=()=> <div dangerouslySetInnerHTML={{__html:legalContent[path]||''}}/>;
  else Page=NotFound;
  const isAdmin=path==='/admin'||path.startsWith('/admin/');
  return <>{!isAdmin&&<Header/>}<main>{!isAdmin&&<Notice path={path}/>}<ErrorBoundary key={path+'?'+current.split('?')[1]?.split('#')[0]}><Page/></ErrorBoundary></main>{cookies&&<CookieChoices onClose={()=>setCookies(false)}/>}</>;
}
createRoot(document.getElementById('root')).render(<App/>);
