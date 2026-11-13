import React from 'react';
const eventName = 'reserve:navigate';
const subscribe = (callback) => {
  window.addEventListener('popstate', callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(eventName, callback);
  };
};
const snapshot = () => window.location.pathname + window.location.search + window.location.hash;
export function useLocation() {
  return React.useSyncExternalStore(subscribe, snapshot, () => '/');
}
export function navigate(href, replace = false) {
  const target = new URL(String(href), window.location.href);
  if (target.origin !== window.location.origin) { window.location.assign(target.href); return; }
  window.history[replace ? 'replaceState' : 'pushState']({}, '', target.pathname + target.search + target.hash);
  window.dispatchEvent(new Event(eventName));
  requestAnimationFrame(() => {
    if (target.hash) document.getElementById(decodeURIComponent(target.hash.slice(1)))?.scrollIntoView({behavior:'smooth'});
    else window.scrollTo({top:0,behavior:'instant'});
  });
}
const router = { push: (href) => navigate(href), replace: (href) => navigate(href,true), back: () => window.history.back(), refresh: () => window.dispatchEvent(new Event(eventName)), prefetch: () => Promise.resolve() };
export function useRouter() { return router; }
export function usePathname() { useLocation(); return window.location.pathname; }
export function useSearchParams() { useLocation(); return new URLSearchParams(window.location.search); }
export const Link = React.forwardRef(function Link({href, children, onClick, replace, prefetch, scroll, ...props}, ref) {
  return React.createElement('a',{...props,href,ref,onClick(event){
    onClick?.(event);
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||props.target==='_blank')return;
    if(new URL(href,window.location.href).origin===window.location.origin){event.preventDefault();navigate(href,replace);}
  }},children);
});
