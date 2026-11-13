# Club Wallen — The Exclusive

The storefront now includes a local Node.js backend, persistent SQLite database, customer accounts, a protected CRM, and payment integration code. It runs on localhost without ChatGPT authentication. No live payment credentials are configured by default.

## Run locally

Requires Node.js 24 or later; verified with Node.js 26.5.

```sh
npm ci
npm run dev
```

- Website: http://localhost:4173
- CRM: http://localhost:4173/admin
- Customer account: http://localhost:4173/dashboard

On your first CRM visit, create your own administrator account. There is no default administrator password. Customer signup creates a separate customer account without administrator privileges.

Records persist in `.data/exclusive.sqlite`. Private Cash App receipt images are stored in `.data/receipts/`. These files and `.env` are excluded from Git and the static website output. Back up the entire `.data/` directory before moving this installation.

After frontend edits, run `npm run build` and refresh. Restart after backend or environment changes. The server binds only to loopback.

```sh
npm run build
npm run check
```

## Payments: United States, USD, manual annual renewal

- **Cards:** Stripe hosted Checkout, server-calculated USD prices, signed webhooks.
- **Crypto:** Stripe supported stablecoins such as USDC. Enable stablecoins in your Stripe account and then in CRM payment settings. Bitcoin is not implemented.
- **Manual Cash App:** configure your own `$CashTag` in CRM settings. Receipts enter an awaiting-review queue. An administrator must independently verify the transfer and supply a transaction reference before approval.
- **Memberships:** one-year purchases with manual renewal. No automatic recurring charge is created.

Copy `.env.example` to `.env`, supply your Stripe test secret key and webhook signing secret, and restart. Never put secret keys in frontend code. For local webhook testing with the official Stripe CLI:

```sh
stripe listen --forward-to localhost:4173/api/webhooks/stripe
```

Use that listener's signing secret as `STRIPE_WEBHOOK_SECRET`. The CRM displays configuration status and test/live mode. Test revenue is kept separate from live revenue.

See [docs/BACKEND.md](docs/BACKEND.md) for the API and verification rules.

## Scope and remaining integrations

Merchandise and membership checkout use the new backend. Customers, orders, payment status, membership activation, product prices, stock counts, support replies, and audit history are backed by SQLite. Newly registered customer accounts require administrator verification of email ownership before historical customer records are released.

Original event, festival, hotel, foundation, and legacy payment screens remain labeled reference previews. Real ticket/hotel inventory, donation processing, a content editor, outbound email, automated email verification/password recovery, shipping services, and tax configuration are not implemented.

The shop and membership-selection pages read prices from the backend. Homepage promotional plan descriptions/prices remain marketing copy in `src/components/Home.js`; update those when changing offers. Do not rerun `scripts/extract-components.mjs` over customized components; that research utility imports the original captured application.

`dist/` contains only the frontend. Hosting that directory alone does not run the backend or CRM API. This work remains local as requested; the earlier private hosted preview has not been updated with the backend.

[Original reference audit](docs/ARCHITECTURE.md)
