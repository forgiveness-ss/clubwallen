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

This applies `supabase/migrations/001_crm.sql` inside a transaction, seeds missing products/settings without overwriting CRM changes, and creates or secures the `payment-receipts` bucket as private. Allowed images are PNG/JPEG/WebP up to 3 MB. The migration uses a private schema and does not expose customer tables through Supabase's public Data API. Run setup separately from the Vercel build; builds never migrate a production database automatically.

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
| `STRIPE_SECRET_KEY` | Your Stripe test secret key to begin |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for this deployment's Stripe webhook |

The database/storage variables are required for the API. Payment keys can be omitted while setting up the CRM; card and crypto checkout stay unavailable. Use separate Supabase projects and Stripe test credentials for preview/testing. Do not attach production secrets to untrusted preview branches.

4. Deploy or redeploy after environment changes. Deploying the complete repository includes both the website/CRM and `api/index.js`; Supabase remains a separate persistent service.
5. Public visitors should use the **production domain**. Check Vercel Deployment Protection if the production website asks for a Vercel login. The CRM has its own administrator login at `/admin`; visitors do not need ChatGPT accounts.

## Activate the administrator

Open `https://YOUR-DOMAIN/admin`. Enter your name, configured owner email, a password of at least 12 characters, and the setup token stored in Vercel. Setup is locked after the first administrator is created. Remove `ADMIN_SETUP_TOKEN` from Vercel and redeploy after activation. Later visits use the administrator email/password. Public customer signup never creates an administrator.

If `/admin` cannot check setup, it shows a connection error and a retry button. Open `/api/status` for a safe configuration error. In particular, `APP_BASE_URL` in Vercel must be your actual HTTPS production origin, rather than the localhost value in `.env.example`. Fix the named Production environment variables and redeploy; adding `ADMIN_EMAIL` alone does not create an account.

In CRM → Payment settings, enter your Cash App handle. Cards and supported stablecoins are automatically marked paid only after verified Stripe webhooks. Cash App receipts require an administrator to verify the transfer and record its reference before approval. Memberships renew manually each year.

## Connect Stripe and verify

Register `https://YOUR-DOMAIN/api/webhooks/stripe` in Stripe, selecting `checkout.session.completed`, `checkout.session.async_payment_succeeded`, and `charge.refunded`. Save its signing secret in Vercel and redeploy. Enable stablecoins in Stripe before enabling them in CRM settings. No Bitcoin integration is included.

Check `/api/status`, create the owner account, complete a Stripe **test** payment, confirm one membership grant, submit a Cash App test receipt, and confirm anonymous requests cannot view `/api/admin/receipt`. Then redeploy and confirm records and private receipt access persist. Live checkout requires your merchant configuration and a separate live verification.

The automated suite covers SQLite and an embedded PostgreSQL engine, raw signed callback bodies, account isolation, CRM queries, setup protection, receipt authorization, and durable rate counters. It does not establish that a live Supabase project, Vercel deployment, or merchant account is configured.

Official references: [Supabase connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [private storage buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals), [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Stripe webhooks](https://docs.stripe.com/webhooks).
