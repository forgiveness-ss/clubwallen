# Club Wallen — The Exclusive

The storefront includes a Node.js backend, customer accounts, a protected CRM, and payment integration code. Vercel hosts the frontend and API; Supabase supplies PostgreSQL and private receipt storage. Local development also works with SQLite without ChatGPT authentication. Cloud accounts and payment credentials must be configured before deployment is operational.

See [Cloud setup](docs/CLOUD-SETUP.md) for the account connection, database setup, Vercel import, environment variables, and administrator activation.

## Run locally

Vercel uses Node.js 24. Local checks were also run on Node.js 26.5.

```sh
npm ci
npm run dev
```

- Website: http://localhost:4173
- CRM: http://localhost:4173/admin
- Customer account: http://localhost:4173/dashboard

On your first CRM visit, create your own administrator account. There is no default administrator password. Customer signup creates a separate customer account without administrator privileges.

Records persist in `.data/exclusive.sqlite`. Private transfer receipt images are stored in `.data/receipts/`. These files and `.env` are excluded from Git and the static website output. Back up the entire `.data/` directory before moving this installation.

After frontend edits, run `npm run build` and refresh. Restart after backend or environment changes. The server binds only to loopback.

```sh
npm run build
npm run check
```

## Payments: United States, USD, manual annual renewal

- **Apple Pay:** an Apple Pay-only Stripe Express Checkout button; no standalone card-entry form. Automatic confirmation requires a signed webhook and a verified Apple Pay wallet charge.
- **Bitcoin and USDT:** transfers to receiving addresses configured in the CRM. BTC uses Bitcoin mainnet; USDT supports one selected Ethereum/ERC-20 or Tron/TRC-20 receiving network. An administrator verifies each transaction before approval.
- **Wire transfer:** USD bank instructions configured in the CRM. Customers submit a private receipt and bank reference; approval requires verification of received funds.
- **Memberships:** one-year purchases with manual renewal. No subscription is created.

Cash App, standalone cards, and Stripe USDC are no longer offered for new orders. Receiving details are captured per order; settings changes affect new orders. Crypto amounts use a 15-minute market quote when available; administrators can issue exact quotes when the price feed is unavailable.

Copy `.env.example` to `.env`, supply your Stripe test secret key, publishable key, and webhook signing secret, and restart. Never put secret keys in frontend code. For local webhook testing with the official Stripe CLI:

```sh
stripe listen --forward-to localhost:4173/api/webhooks/stripe
```

Use that listener's signing secret as `STRIPE_WEBHOOK_SECRET`. The CRM displays configuration status and test/live mode. Test revenue is kept separate from live revenue.

See [docs/BACKEND.md](docs/BACKEND.md) for the API and verification rules.

## Scope and remaining integrations

Merchandise and membership checkout use the new backend. Customers, orders, payment status, membership activation, product prices, stock counts, support replies, and audit history use the configured database (Supabase PostgreSQL in production; SQLite locally). Newly registered customer accounts require administrator verification of email ownership before historical customer records are released.

Original event, festival, hotel, foundation, and legacy payment screens remain labeled reference previews. Real ticket/hotel inventory, donation processing, a content editor, outbound email, automated email verification/password recovery, shipping services, and tax configuration are not implemented.

The shop and membership-selection pages read prices from the backend. Homepage promotional plan descriptions/prices remain marketing copy in `src/components/Home.js`; update those when changing offers. Do not rerun `scripts/extract-components.mjs` over customized components; that research utility imports the original captured application.

`dist/` contains the frontend. `api/index.js` supplies the Vercel Function; `vercel.json` routes API requests to it. Deploy the complete Git repository to Vercel, rather than uploading `dist/` alone. Database tables and storage are provisioned separately with `npm run setup:cloud`; they are not created by a Git push. The earlier private Sites preview has not been updated.

[Original reference audit](docs/ARCHITECTURE.md)
