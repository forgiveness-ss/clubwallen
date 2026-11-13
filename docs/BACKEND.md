# Local backend and CRM

Implemented for a US business, USD prices, cards, supported stablecoins, manual Cash App review, and manually renewed annual memberships.

## Structure and storage

`scripts/serve.mjs` builds/serves the frontend, loads `.env`, and starts the API on loopback. `server/api.mjs` contains authenticated endpoints. `server/database.mjs` owns the SQLite schema and payment/membership transactions. `server/payments.mjs` creates Stripe sessions and validates signatures. `server/catalog.json` seeds new catalog records without overwriting existing prices.

`src/Admin.jsx` is the protected CRM. `src/Commerce.jsx` supplies the backend-connected checkout, payment result, signup/login, and customer account. `tests/backend.test.mjs` covers access controls, CSRF, credential storage, prices, payment callbacks, receipts, support isolation, and persistence. `tests/ui-preview.mjs` is a separate temporary fixture server used for browser QA; it does not create your real administrator account.

The database contains `accounts`, `sessions`, `customers`, `products`, `orders`, `memberships`, `messages`, `webhook_events`, `audit`, and `settings`. Amounts are integer cents, currency `usd`. Private database files and receipts live in `.data/`, excluded from Git and the static output. Back up the full directory when moving installations.

SQLite was selected so local CRM development needs no cloud database account. A future PostgreSQL/managed-auth migration is not implemented. `dist/` alone does not run the Node backend.

## Authentication

Passwords use scrypt with a random per-account salt. Session tokens are random; only their hashes are stored. Cookies are HttpOnly and SameSite=Strict, expire after eight hours, and use Secure when the configured base URL is HTTPS. Admin privileges are assigned only at first local setup. Customer signup cannot assign roles.

Customer signup does not prove email ownership. New accounts therefore cannot read historical orders, memberships, or support records until an administrator verifies the email owner under Customers → Notes & profile. This is an interim local workflow pending automated email verification.

## API map

| Routes | Purpose |
| --- | --- |
| `GET /api/status` | Safe setup and payment configuration flags, no secrets |
| `GET /api/catalog` | Active products and authoritative prices |
| `POST /api/admin/setup` | One-time first administrator setup from loopback |
| `/api/auth/signup`, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout` | Customer/admin sessions |
| `GET /api/account` | Verified customer's own history |
| `POST /api/orders` | Validate catalog IDs, quantities, sizes, shipping, and payment method |
| `GET /api/order?order=…&token=…` | Limited guest order status with an unguessable token |
| `POST /api/order/proof?order=…&token=…` | Validate/save a receipt, awaiting review |
| `POST /api/webhooks/stripe` | Signed payment and full-refund events |
| `POST /api/support`, `/api/notify-admin` | Persist support requests |
| `/api/admin/overview` | Revenue, counts, review queue, recent activity |
| `/api/admin/customers` | Customer profiles, notes, email-ownership approval |
| `/api/admin/orders` | Orders, manual Cash App approval, fulfillment |
| `/api/admin/memberships` | Membership records, suspension/reactivation |
| `/api/admin/products` | Product names, prices, visibility, stock counts |
| `/api/admin/messages` | Support conversations and replies |
| `/api/admin/settings` | Business details, Cash App handle, stablecoin enablement |
| `/api/admin/receipt` | Authenticated receipt viewing |
| `/api/admin/activity` | Audit history |

Browser mutations require a matching Origin and JSON content type. Webhooks use signature verification. Administrator operations are authorized on the server. Authentication, setup, checkout, support, and uploads are rate limited within this process. JSON/image sizes are bounded and private receipts are not part of `dist/`.

## Payments

Checkout reads prices from database product IDs. Browser prices, totals, roles, and payment statuses cannot establish a payable amount or paid state. The copied site's legacy promo codes are not accepted by this checkout; a managed promotion system is not yet implemented.

Stripe sessions use `mode=payment` with USD pricing. Cards use `payment_method_types[]=card`; stablecoins use `payment_method_types[]=crypto`. Memberships do not create subscriptions. Stablecoins require eligibility/enablement in your Stripe account and are capped at $10,000 per order. Bitcoin is not included.

Returning from checkout does not confirm payment. Stripe events must have a valid signature within a five-minute timestamp window and match the stored session ID, order metadata, amount, currency, and test/live mode. Replay processing does not create duplicate memberships. Confirmed full refunds revoke memberships granted by the order. Partial refunds and disputes still require an operational integration.

Cash App receipts remain `awaiting_review` until an administrator verifies the actual transfer and records the transaction reference. A screenshot alone cannot mark an order paid. Approvals are audited. Membership access lasts one year after verified payment and renewal never charges automatically.

Secrets stay in server environment variables. No real provider request or live financial transaction was made during implementation tests; provider calls are mocked. Test revenue is separated from live revenue in the CRM.

For local webhook testing, run the official Stripe CLI listener and place its signing secret in `.env`:

```sh
stripe listen --forward-to localhost:4173/api/webhooks/stripe
```

## Remaining launch work

This is a local operational backend. Before public operation, configure merchant accounts, outbound email, email verification/recovery, tax/shipping rules, staff administration, refund/dispute handling, backups, monitoring, and production HTTPS hosting. Add inventory reservation/expiry for concurrent sales: current checks cannot prevent separate buyers from simultaneously paying for the last item. Separate live and test databases when launching.

Only merchandise and membership checkout are connected. Ticket issuance, festival/hotel inventory, charitable donations, livestreams, and other benefits need real fulfillment integrations. A marketing content editor/CMS is not included. Support replies appear in verified customer accounts; outbound email is not sent.

The original NOWPayments provider is not used: its guidance excludes US-registered businesses. Stripe documents stablecoin acceptance for eligible US merchants instead.

Sources: [Stripe Checkout](https://docs.stripe.com/payments/checkout), [Stripe webhooks](https://docs.stripe.com/webhooks), [Stripe stablecoins](https://docs.stripe.com/payments/stablecoin-payments), [NOWPayments US restriction](https://nowpayments.io/blog/are-crypto-payments-legal-in-the-united-states).
