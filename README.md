# Club Wallen — reference rebuild

A faithful recreation of the publicly served Club Wallen site, captured on November 13, 2026. It preserves the reference's React page layouts, copy, animations, product catalog, photographs, video, festival experience, ticket selection, and checkout interfaces. The member dashboard UI was reconstructed from its publicly served component, using local demo data.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:4173. After editing source, run `npm run build` and reload the browser. `PORT=3000 npm run dev` uses a different port.

```sh
npm run build
npm run check
```

`dist/` is the static deployment output. The build is self-contained and does not need the original website or the optional `reference/` research directory.

## Demo behavior

- Login: `demo@example.com` / `ReserveDemo2026!`.
- Product sizes, cart quantities, totals, membership selection, original promo rules, festival cart, hotel selection, ticket selection, FAQs, and menus use the captured client behavior.
- Crypto and card checkout complete local demo orders. Cash App displays a placeholder handle. Bank transfer displays placeholder details.
- Signup previews the original flow without creating an external account. Passwords are neither sent nor persisted.
- Support submissions stay in this browser. No email or payment-proof file is sent.
- Page banners identify these demo flows. No purchase, ticket issuance, membership fulfillment, email delivery, or actual payment verification takes place.

## Rebrand and connect services

Edit `src/site.config.js` for the demo payment handle, support destination, and utility-page branding. Original page-specific copy and branding are intentionally preserved in `src/components/`; edit those named files and replace images under `public/`. Update `src/snapshots/` as well if you want the initial static HTML to reflect copy changes before JavaScript starts.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the complete route map, payment inventory, storage, known reference defects, and remaining production backend work. Switching the demo flag alone does not provide a backend.
