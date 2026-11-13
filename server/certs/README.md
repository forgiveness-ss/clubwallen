# Supabase database certificate authorities

`supabase-ca.crt` contains public CA certificates from Supabase's official CLI. These are trust anchors, not private keys or project credentials. They are used only for Supabase database/pooler hosts; Node's standard trust roots remain available and TLS certificate and hostname verification stay enabled.

Sources retrieved over verified HTTPS on 2026-11-13:

- [2021 template](https://github.com/supabase/cli/blob/develop/apps/cli/src/command-internal/supabase-ca-templates/prod-ca-2021.ts): SHA-256 `80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA`, expires 2031-04-26.
- [2025 template](https://github.com/supabase/cli/blob/develop/apps/cli/src/command-internal/supabase-ca-templates/prod-ca-2025.ts): SHA-256 `5F:9B:77:95:1A:7A:A1:30:3F:9B:58:EE:A9:BF:A8:9E:35:8C:FD:C1:5F:97:86:FF:10:D4:93:0A:72:2C:9A:E2`, expires 2035-09-01.

Both certificates identify themselves as Supabase Root 2021 CA; the newer certificate renews its validity. Update the bundle from official Supabase sources when their CA changes. `DATABASE_SSL_CA` (PEM) or `DATABASE_SSL_CA_FILE` can select a project-specific certificate downloaded from the dashboard. Do not disable certificate verification.
