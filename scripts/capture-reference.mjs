import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
const origin = 'https://www.clubwallen.site';
const root = new URL('../reference/', import.meta.url).pathname;
const seeds = ['/', '/join', '/login', '/signup', '/shop', '/tickets', '/sand-in-my-boots', '/sand-in-my-boots/hotels', '/support', '/faq', '/donate', '/privacy', '/terms', '/checkout', '/checkout/cashapp', '/checkout/success', '/checkout/cancel', '/portal'];
const seen = new Set(), assets = new Set(), pages = [], failures = [];
async function get(url, target) {
  try {
    try { return await readFile(target); } catch {}
    const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, data);
    return data;
  } catch (error) { failures.push({ url, error: error.message }); return null; }
}
function discover(text) {
  for (const match of text.matchAll(/(?:src|href)=["'](\/[^"'<>\s]+)|url\((?:&[^;]+;|["'])?(\/[^"'()<>\s&;]+)|["'`](\/(?:_next\/static\/[^"'`\s]+|[^"'`\s]*\.(?:jpg|jpeg|png|webp|svg|mp4|woff2|ico)))["'`]/g)) {
    let value = (match[1] || match[2] || match[3]).replaceAll('&amp;', '&');
    if(value.includes('${')) continue;
    if (/\.(?:js|css|jpg|jpeg|png|gif|webp|svg|mp4|woff2?|ico)(?:\?|$)/i.test(value)) assets.add(value);
    else if (!value.startsWith('/api/') && !value.startsWith('/_next/') && !value.startsWith('//')) {
      const route = value.split(/[?#]/)[0];
      if (route && !seen.has(route) && !/\/admin|\/portal|\/dashboard|\/account/.test(route)) seeds.push(route);
    }
  }
}
for (let i = 0; i < seeds.length && seen.size < 90; i++) {
  const route = seeds[i]; if (seen.has(route)) continue; seen.add(route);
  const target = path.join(root, 'pages', route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  const data = await get(origin + route, target);
  if (data) { pages.push({route, file:path.relative(root,target)}); discover(data.toString()); console.log('PAGE', route, data.length); }
}
const downloaded = new Set();
for (let round = 0; round < 5; round++) {
  const batch = [...assets].filter(x => !downloaded.has(x)); if (!batch.length) break;
  for (let i = 0; i < batch.length; i += 8) await Promise.all(batch.slice(i, i+8).map(async asset => {
    downloaded.add(asset);
    const pathname = new URL(asset, origin).pathname;
    const data = await get(origin + asset, path.join(root, 'assets', pathname));
    if (data && /\.(js|css)$/.test(pathname)) discover(data.toString());
    console.log(data ? 'ASSET' : 'FAILED', asset, data?.length || 0);
  }));
}
await writeFile(path.join(root, 'manifest.json'), JSON.stringify({origin, capturedAt:new Date().toISOString(), pages, assets:[...downloaded], failures}, null, 2));
console.log(JSON.stringify({pages:pages.length, assets:downloaded.size, failures}, null, 2));
