# Vercel + Supabase setup

The source supports this stack. Creating provider accounts alone does not provision or connect a project. The setup command provisions and verifies Supabase; Vercel deployment and live payment configuration require separate verification.

## Connect the accounts in this conversation

Use the Vercel and Supabase plugin connection cards. Select Connect and authorize each new account in its provider window. If the cards are unavailable, open the app's Plugins/Apps area, find each provider, and connect it. Account passwords and secret keys should not be sent in chat.

After connecting, the available provider tools determine which provisioning steps can be automated. The dashboard steps below also work directly.

## Create the Supabase project

1. In your Supabase organization, create a project called `clubwallen`. Choose an appropriate US region and save the database password privately. Wait until the project is ready.
2. From **Connect → Transaction pooler**, copy the complete PostgreSQL connection string, including the project's actual pooler host. Replace the password placeholder with your database password (URL-encode special characters). Use this as `DATABASE_URL`.
3. Copy the project URL and a server secret API key from project settings. Use `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. A publishable/anon key cannot upload or read these private receipts.
4. Copy `.env.example` to private `.env`, supply these values, then run:

```sh
npm ci
npm run setup:cloud
```

This applies the versioned SQL migrations in `supabase/migrations/` inside a transaction, seeds missing products/settings without overwriting CRM changes, and creates or secures the `payment-receipts` bucket as private. Allowed images are PNG/JPEG/WebP up to 3 MB. The migration uses a private schema and does not expose customer tables through Supabase's public Data API. Run setup separately from the Vercel build; builds never migrate a production database automatically.

If a migration connection is needed, set `DATABASE_MIGRATION_URL` to the project's session pooler connection. A migration may use this override while runtime requests use the transaction pooler. TLS certificate verification remains enabled.

Supabase's public database CA certificates are bundled for both local setup and Vercel. If you use a different database CA, set `DATABASE_SSL_CA` to its PEM text (multiline or escaped `\n`) or `DATABASE_SSL_CA_FILE` to a local certificate file. On Vercel use the PEM environment variable rather than a path on your Mac. Setup reports the failing stage and a safe explanation without printing provider messages or credentials.

The existing local database currently has no accounts, customers, orders, memberships, or messages. Local records created later do not copy themselves into Supabase; move those records and receipts explicitly before switching a populated installation. Never commit a database dump.

## Import GitHub into Vercel

1. Create a Vercel project by importing `forgiveness-ss/clubwallen` from GitHub.
2. Choose framework **Other**. The repository root is the application root; build `npm run build`, output `dist`, install `npm ci`. `vercel.json` provides routing and the API function. Use Node.js **24.x**.
3. In the project's **Production** environment variables, add:

| Variable | Value |
| --- | --- |
| `APP_BASE_URL` | The final HTTPS origin, e.g. `https://clubwallen.vercel.app`, no trailing path |
| `DATABASE_URL` | Supabase transaction pooler connection string |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SECRET_KEY` | Server secret key; never prefixed with a frontend/public variable name |
| `ADMIN_SETUP_TOKEN` | A privately generated random secret of at least 32 characters |
| `ADMIN_EMAIL` | Your administrator email (recommended) |
| `STRIPE_SECRET_KEY` | Optional, only for legacy Stripe orders |

| `STRIPE_WEBHOOK_SECRET` | Optional, only for legacy Stripe callbacks |

The database/storage variables are required for the API. New orders use manual instructions or wallet/wire transfers; no Stripe account or keys are required. Use separate Supabase projects for preview/testing. Do not attach production secrets to untrusted preview branches.

4. Deploy or redeploy after environment changes. Deploying the complete repository includes both the website/CRM and `api/index.js`; Supabase remains a separate persistent service.
5. Public visitors should use the **production domain**. Check Vercel Deployment Protection if the production website asks for a Vercel login. The CRM has its own administrator login at `/admin`; visitors do not need ChatGPT accounts.

## Activate the administrator

Open `https://YOUR-DOMAIN/admin`. Enter your name, configured owner email, a password of at least 12 characters, and the setup token stored in Vercel. Setup is locked after the first administrator is created. Remove `ADMIN_SETUP_TOKEN` from Vercel and redeploy after activation. Later visits use the administrator email/password. Public customer signup never creates an administrator.

If `/admin` cannot check setup, it shows a connection error and a retry button. Open `/api/status` for a safe configuration error. In particular, `APP_BASE_URL` in Vercel must be your actual HTTPS production origin, rather than the localhost value in `.env.example`. Fix the named Production environment variables and redeploy; adding `ADMIN_EMAIL` alone does not create an account.

In CRM → Payment settings, configure the receiving Bitcoin address, USDT network/address, and wire beneficiary/bank/account instructions, then enable each completed method. These destinations are validated before saving and captured per order. Wallet transfers and wire receipts require independent administrator verification; a submission alone never marks an order paid. The same transfer reference cannot be approved for multiple orders. Memberships renew manually each year.

## Configure the editable instruction panel

In CRM → Payment settings, the former Apple Pay option is an instruction-only flow. Configure its checkout label and description, heading, instruction body, optional receiving number/details, continue button text, reference and receipt labels, submit button text, receipt requirement, and review heading/message. The preview shows how the instruction content will appear. Enable the completed option and save.

Clicking the option opens a compact modal. New orders capture a copy of the instructions. Returning customers see the original details from their order, even after the admin changes the CRM settings. Customers submit a payment reference and, when required, a private receipt; the order remains unpaid until an administrator verifies funds and explicitly approves it. This option does not initiate Apple Pay, Apple Cash, or card processing; instructions must accurately identify the actual receiving service. A fixed instructions-only/admin-verification notice remains visible.

No Stripe account, provider keys, or domain registration is needed for new orders. The old Stripe endpoints remain solely to handle historical orders created under the previous integration.

BTC and USDT are manual wallet transfers, not Stripe payments. The server requests a USD market quote from Kraken and calculates the exact asset amount with decimal arithmetic, rounded up to BTC's eight or USDT's six decimal places. Quotes expire in 15 minutes. If quotes are unavailable, the order enters `quote_requested`; the administrator can issue an exact amount from Orders & payments → Review. Customers must wait for a valid quote before transferring and submit the blockchain transaction hash. Approval requires checking the destination, network, amount, and confirmations in the receiving wallet. A wire approval requires a receipt and a verified bank reference.

Check `/api/status`, create/sign into the owner account, save real receiving details, and verify the desired methods are enabled. Preview the instruction modal, create a test order, and confirm the original text/receiving details remain attached after editing settings. Submit a test transfer for review, confirm it remains unpaid until verified, and confirm anonymous requests cannot view `/api/admin/receipt`. Then redeploy and confirm records and private receipt access persist. Live wallet, bank, and other external transfers have not been performed by the automated suite.

The automated suite covers SQLite and an embedded PostgreSQL engine, raw signed callback bodies, account isolation, CRM queries, setup protection, receipt authorization, and durable rate counters. It does not establish that a live Supabase project, Vercel deployment, or merchant account is configured.

Official references: [Supabase connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [private storage buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals), [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Stripe webhooks](https://docs.stripe.com/webhooks), [Apple Pay domain registration](https://docs.stripe.com/payments/payment-methods/pmd-registration), [Kraken public tickers](https://docs.kraken.com/api-reference/market-data/get-ticker-information).
