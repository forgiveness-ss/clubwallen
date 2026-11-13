# Architecture and reference audit

Implementation update: a persistent local backend and CRM have since been added. See [BACKEND.md](BACKEND.md) for the current implementation. This document preserves the reference audit and initial demo architecture; its demo-adapter descriptions apply to the retained reference flows.

Reference: https://www.clubwallen.site/ · inspected November 13, 2026.

This audit describes observable HTML and publicly served client JavaScript. The original repository, database contents, API implementation, fulfillment systems, admin area, merchant account settings, and real payment verification were not accessible or tested. Nothing here claims those private systems have been copied.

## Original site

The public application uses Next.js App Router, React, and Turbopack. Pages combine server-rendered HTML with client components; membership, login, and checkout load their main interfaces on the client. Most page styling is inline, supplemented by a small global CSS file. General pages use Georgia and a near-black/gold palette; the festival uses Bebas Neue with navy, cream, pink, and blue.

The original browser client initializes Supabase for signup, login, and member data. Public dashboard code queries `accounts`, `support_messages`, and `message_replies`. This reveals table names, not the full schema or access policies.

The original client uses localStorage keys including `cw_cart`, `cw_cashapp_order`, `cw_pending_email`, `cw_loggedIn`, `cw_user`, `cw_platform_messages`, and `sib-cart-v1`. Product and festival catalogs, ticket listings, prices, and promo rules appear in public JavaScript. Their presence does not establish real inventory or entitlement.

## Rebuild

The rebuild runs React with esbuild and a small history-based router. It reconstructs the publicly served page component factories and formats them into editable, named source files. This retains the actual rendering and interaction logic rather than approximating the layout from screenshots. `src/runtime.js` supplies React, JSX, navigation, and the local account adapter; the original Next.js runtime and Supabase connection are omitted.

`src/registry.js` maps original component identifiers to the named components. Festival header, footer, cart, and data exports share factories, so the small module adapter preserves their exported namespaces.

| Route | Source and behavior |
| --- | --- |
| `/` | `Home.js`: hero, ticker, benefits, process, three plans, comparison, livestream explanations, community, ticket/festival promotions, FAQ, footer |
| `/join?tier=crew\|backroad\|frontrow` | `Join.js`: annual plan, merchandise size, checkout |
| `/shop` | `Shop.js`: product catalog, category tabs, sizes, add to cart |
| `/checkout` | `Checkout.js`: contact/address form, cart quantities, removal, shipping, promo, crypto/Cash App |
| `/checkout/cashapp` | `CashApp.js`: amount, handle, receipt instructions, proof upload preview, demo completion |
| `/checkout/crypto` | `app.jsx`: local crypto or card payment preview and demo completion |
| `/confirmation` | `Confirmation.js`: original order/membership/ticket confirmation layout, marked as demo |
| `/tickets` | `Tickets.js`: tour schedule, venue/section selection, quantity, buyer details, payment choices |
| `/sand-in-my-boots` | `Festival.js`: lineup, passes, maps, experiences, FAQs, cart |
| `/sand-in-my-boots/hotels` | `HotelPackages.js`: pass types, groups of 2–10, hotel selection, lodging bundle cart |
| `/sand-in-my-boots/checkout` | `FestivalCheckout.js`: details, delivery, review, payment; crypto, card, bank-transfer previews |
| `/login`, `/signup` | `Login.js`, `Signup.js`: original forms backed by the local demo adapter |
| `/dashboard` | `Dashboard.js`: captured member portal and support-message UI with local demo account data |
| `/portal` | Alias to the member dashboard |
| `/support` | `Support.js`: form, validation, optional attachment preview, local-only message persistence |
| `/faq` | `FAQ.js`: full accordion content |
| `/donate` | `Foundation.js`: foundation copy, supporter list, donation form and crypto preview |
| `/terms`, `/privacy` | `src/static-pages/`: captured legal copy and links |

`public/` holds local images, video, logos, hotel photographs, and payment-method illustrations. `src/base.css` preserves the original global styling. `src/overrides.css` adds demo-only interfaces, focus visibility, and reduced-motion support. `src/snapshots/` provides the original initial HTML for static page loads. `scripts/build.mjs` creates each route's HTML and bundles the independent React application.

## Membership and pricing behavior

The Crew costs $350/year; Backroad Circle costs $650/year; Front Row costs $900/year. The join page passes plan details and size to checkout. Merchandise shipping is $9.99 unless the subtotal is greater than $100; membership shipping is free. These are the captured client rules.

Membership promo codes in the reference are DMY (80% discount), MWM (40%), and DAY1 (90%). The festival cart uses MCM01 (50%). They are preserved for fidelity. Real launches need server-authoritative prices, permitted discounts, inventory, and product identifiers: client cart values and query-string prices cannot establish a payable amount.

## Payment and message endpoints observed

| Endpoint | Observable purpose | Rebuild behavior |
| --- | --- | --- |
| `/api/nowpayments/create-payment` | Crypto invoice for membership, merch, tickets, donations | Local order preview; no invoice issued |
| `/api/notify-admin` | Signup notification and support message | Support message saved locally; no email |
| `/api/tickets/payment-selected` | Ticket payment-choice notification | Demo acknowledgment |
| `/api/tickets/payment-proof` | Screenshot submission | Demo acknowledgment; file is not transmitted |
| `/api/sand-orders` | Festival checkout/order persistence | Session-local order draft |
| `/api/sand-orders/pay` | Festival crypto checkout | Local crypto preview |
| `/api/sand-orders/pay-card` | Festival hosted card checkout | Local card preview |

The original Cash App screen names a recipient and asks for screenshot verification. Festival bank checkout exposes bank-transfer instructions. Those recipients and bank details are intentionally replaced in the runnable rebuild. The public reference mentions NOWPayments and Stripe, but provider credentials, webhooks, invoice behavior, and real charge processing were not examined.

`src/services.js` implements all the demo API contracts and the local account adapter. It does not contact the source site's Supabase instance or submit to its API routes. Password fields are stripped from persisted checkout objects. The original checkout serialized its full form, including passwords, into the Cash App order; this behavior is corrected.

## Links and reference defects

Internal routes and anchor links remain local. Existing Instagram, both TikTok accounts, X, Facebook, YouTube, Spotify, and marketing mailto links are preserved. Review them when rebranding.

The reference's seven venue seating-map PNG URLs returned 404. Its client hides failed map images; that fallback is preserved, while ticket section selection remains available. `/merch/membership-box.jpg` also returned 404; it appears as checkout metadata rather than a required visible product image. `/forgot-password`, `/portal`, `/checkout/success`, and `/checkout/cancel` returned 404 during inspection. The rebuild supplies a portal alias and its own crypto completion flow.

The homepage advertises 2026 tour content while the tickets page lists 2027 shows. Some merchandising classifications and size labels also appear inconsistent. The original copy and catalog are preserved for review. Public testimonials, supporter totals, benefits, ticket quantities, and availability claims are captured reference content, not independently verified claims.

## Production services still required

To accept real business, supply your own authentication project, database and access policies; merchant accounts and server-only keys for your chosen payment methods; bank/Cash App destinations; and support email delivery. Implement server-side product pricing and order creation, payment webhooks with signature verification and idempotency, verified fulfillment and membership activation, receipt storage, and a real support workflow. No demo button, browser storage key, or confirmation-page URL should activate real access or mark an order paid.

Do not simply set `mode` to `live`: the static deployment has no production API server. The integration boundary is `src/services.js`; replace it with real account/backend clients when those services are configured. The present deployment remains a private review build.
