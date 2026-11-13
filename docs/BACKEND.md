# Backend and CRM

Implemented for a US business, USD prices, Apple Pay, manual BTC/USDT wallet transfers, wire transfer review, and manually renewed annual memberships.

## Structure and storage

`scripts/serve.mjs` builds/serves the frontend, loads `.env`, and starts the API on loopback. `server/api.mjs` contains authenticated endpoints. `server/database.mjs` owns the local schema and payment/membership transactions. `server/sql.mjs` supplies async SQLite/PostgreSQL adapters; `server/migrate.mjs` applies the versioned PostgreSQL schema and seed. `api/index.js` and `server/web-handler.mjs` expose the shared API on Vercel while preserving raw webhook bytes. `server/receipts.mjs` selects filesystem or private Supabase Storage. `server/payments.mjs` creates Stripe sessions and validates signatures. `server/catalog.json` seeds new catalog records without overwriting existing prices.

`src/Admin.jsx` is the protected CRM. `src/Commerce.jsx` supplies the backend-connected checkout, payment result, signup/login, and customer account. `tests/backend.test.mjs` covers access controls, CSRF, credential storage, prices, payment callbacks, receipts, support isolation, and persistence. `tests/ui-preview.mjs` is a separate temporary fixture server used for browser QA; it does not create your real administrator account.

The database contains `accounts`, `sessions`, `customers`, `products`, `orders`, `memberships`, `messages`, `webhook_events`, `audit`, and `settings`. Amounts are integer cents, currency `usd`. Private database files and receipts live in `.data/`, excluded from Git and the static output. Back up the full directory when moving installations.

SQLite supports local development without a cloud account. Production uses Supabase PostgreSQL through a server-only connection string and a private `clubwallen` schema. Application tables enable RLS and grant no anonymous/client access. This remains custom server authentication, rather than Supabase Auth. `dist/` alone does not run the backend. See [cloud setup](CLOUD-SETUP.md).

## Authentication

Passwords use scrypt with a random per-account salt. Session tokens are random; only their hashes are stored. Cookies are HttpOnly and SameSite=Strict, expire after eight hours, and use Secure when the configured base URL is HTTPS. Admin privileges are assigned only at first setup. Remote setup requires the private ADMIN_SETUP_TOKEN, optionally restricts the owner email, and locks creation in a transaction. Remove the setup token after activation and redeploy. Customer signup cannot assign roles.

Customer signup does not prove email ownership. New accounts therefore cannot read historical orders, memberships, or support records until an administrator verifies the email owner under Customers → Notes & profile. This is an interim workflow pending automated email verification.

## API map

| Routes | Purpose |
| --- | --- |
| `GET /api/status` | Safe setup and payment configuration flags, no secrets |
| `GET /api/catalog` | Active products and authoritative prices |
| `POST /api/admin/setup` | One-time administrator setup; loopback locally, secret token on Vercel |
| `/api/auth/signup`, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout` | Customer/admin sessions |
| `GET /api/account` | Verified customer's own history |
| `POST /api/orders` | Validate catalog IDs, quantities, sizes, shipping, and payment method |
| `GET /api/order?order=…&token=…` | Limited guest order status with an unguessable token |
| `POST /api/order/proof?order=…&token=…` | Validate/save a receipt, awaiting review |
| `POST /api/webhooks/stripe` | Signed payment and full-refund events |
| `POST /api/support`, `/api/notify-admin` | Persist support requests |
| `/api/admin/overview` | Revenue, counts, review queue, recent activity |
| `/api/admin/customers` | Customer profiles, notes, email-ownership approval |
| `/api/admin/orders` | Orders, crypto quotes, manual transfer approval, fulfillment |
| `/api/admin/memberships` | Membership records, suspension/reactivation |
| `/api/admin/products` | Product names, prices, visibility, stock counts |
| `/api/admin/messages` | Support conversations and replies |
| `/api/admin/settings` | Business details, Apple Pay enablement, receiving wallets, wire details |
| `/api/admin/receipt` | Authenticated receipt viewing |
| `/api/admin/activity` | Audit history |

Browser mutations require a matching Origin and JSON content type. Webhooks use signature verification. Administrator operations are authorized on the server. Authentication, setup, checkout, support, and uploads are rate limited through database counters, shared across function instances. JSON/image sizes are bounded and private receipts are not part of `dist/`.

## Payments

Checkout reads prices from database product IDs. Browser prices, totals, roles, and payment statuses cannot establish a payable amount or paid state. The copied site's legacy promo codes are not accepted by this checkout; a managed promotion system is not yet implemented.

New orders accept only `applepay`, `btc`, `usdt`, or `wire`. Apple Pay uses server-priced USD PaymentIntents and an Express Checkout Element restricted to Apple Pay. No card entry form or other wallet button is mounted. The signed `payment_intent.succeeded` callback must match the order, currency, exact amount, and test/live mode; the server retrieves the intent and verifies `latest_charge.payment_method_details.card.wallet.type` is `apple_pay` before settlement. Legacy hosted-session callbacks remain available for historical orders.

BTC and USDT use administrator-configured receiving wallets. Wallet syntax and checksums are validated. Each order snapshots its destination/network. Quotes use Kraken USD ticker data and integer decimal arithmetic with a 15-minute expiry. If the quote feed fails, the administrator can issue an exact amount. Wire orders snapshot bank instructions. Bank details are returned only to authenticated administrators or holders of that order's private token; public status exposes readiness flags only.

Wallet transfer submissions require a blockchain transaction hash; images are optional. Wire submissions require a receipt and bank reference. Transfers remain `awaiting_review` until an administrator confirms independently verified funds. In a settlement transaction, a unique `payment_references` record prevents reuse of the same transfer across orders. Only verified payment activates a membership. Confirmed Stripe full refunds revoke related memberships. Manual transfer refunds, disputes, partial refunds, and inventory reservation/expiry require further operational work.

Memberships last one year and renew manually. No automatic recurring charge is created.

Secrets stay in server environment variables. No real provider request or live financial transaction was made during implementation tests; provider calls are mocked. Test revenue is separated from live revenue in the CRM.

For local webhook testing, run the official Stripe CLI listener and place its signing secret in `.env`:

```sh
stripe listen --forward-to localhost:4173/api/webhooks/stripe
```

## Remaining launch work

Cloud deployment code is prepared; account provisioning and live integration verification require connected accounts. Before public operation, configure merchant accounts, outbound email, email verification/recovery, tax/shipping rules, staff administration, refund/dispute handling, backups, monitoring, and a production HTTPS origin. Add inventory reservation/expiry for concurrent sales: current checks cannot prevent separate buyers from simultaneously paying for the last item. Separate live and test databases when launching.

Only merchandise and membership checkout are connected. Ticket issuance, festival/hotel inventory, charitable donations, livestreams, and other benefits need real fulfillment integrations. A marketing content editor/CMS is not included. Support replies appear in verified customer accounts; outbound email is not sent.

Sources: [Stripe Express Checkout](https://docs.stripe.com/elements/express-checkout-element/accept-a-payment), [Stripe webhooks](https://docs.stripe.com/webhooks), [Kraken market data](https://docs.kraken.com/api-reference/market-data/get-ticker-information).
