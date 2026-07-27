# CoachOS Booking

CoachOS Booking is the self-hosted scheduling engine built into CoachOS — booking pages, event types, availability, and calendar sync for coaches.

This is a private, internally-operated instance. There is no hosted/managed public version and no external support channel.

### Built With

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma.io](https://prisma.io/)
- [Daily.co](https://daily.co/)

## Getting Started

### Prerequisites

- Node.js (Version: >=18.x)
- PostgreSQL (Version: >=13.x)
- Yarn _(recommended)_

> If you want to enable any of the available integrations, you'll need additional credentials for each one. See the [Integrations](#integrations) section below.

## Development

### Setup

1. Install packages with yarn

   ```sh
   yarn
   ```

2. Set up your `.env` file

   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET`
   - Use `openssl rand -base64 24` to generate a key and add it under `CALENDSO_ENCRYPTION_KEY`

   > **Windows users:** the `packages/prisma/.env` symlink gets checked out as a literal text file (containing the string `../../.env`) instead of a real symlink, which breaks Prisma. Replace it with a real copy:
   >
   > ```sh
   > # Git Bash
   > rm packages/prisma/.env && cp .env packages/prisma/.env
   > ```

3. Set up Node

   ```sh
   nvm use
   # or, if the required version isn't installed yet:
   nvm install && nvm use
   ```

#### Development tips

1. Add `export NODE_OPTIONS="--max-old-space-size=16384"` to your shell profile to raise the memory limit for the Node process, if builds run out of memory.

2. Add `NEXT_PUBLIC_LOGGER_LEVEL={level}` to `.env` to control tRPC query/mutation logging verbosity: `0` silly, `1` trace, `2` debug, `3` info, `4` warn, `5` error, `6` fatal. Each level logs itself and everything above it.

#### Manual database setup

1. Configure `DATABASE_URL` (and `DATABASE_DIRECT_URL`, if your provider pools connections) in `.env`.

2. Copy `DATABASE_URL` from `.env` into `.env.appStore`.

3. Apply the Prisma schema (`packages/prisma/schema.prisma`):

   ```sh
   # Development
   yarn workspace @coachos/prisma db-migrate

   # Production
   yarn workspace @coachos/prisma db-deploy
   ```

   **Windows/PowerShell note:** if this fails with `Environment variable not found: DATABASE_DIRECT_URL`, Turbo may not be injecting the root `.env`. Run it directly instead:

   ```powershell
   cd packages/prisma
   $env:DATABASE_URL="<url>"; $env:DATABASE_DIRECT_URL="<direct-url>"
   npx prisma db push
   cd ../..
   ```

4. Run [mailhog](https://github.com/mailhog/MailHog) to view emails sent during development (required when `E2E_TEST_MAILHOG_ENABLED=1`):

   ```sh
   docker pull mailhog/mailhog
   docker run -d -p 8025:8025 -p 1025:1025 mailhog/mailhog
   ```

5. Start the dev server:

   ```sh
   yarn dev
   ```

#### Setting up the first admin user

The setup wizard at `/auth/setup` walks through creating the first administrator account on first run. Alternatively:

- **Via Prisma Studio**: `yarn db-studio`, open the `User` model, add a record with `email`, `username`, a BCrypt-hashed `password`, and `metadata: {}`.
- **Via seed script**: `cd packages/prisma && yarn db-seed` populates the local DB with dummy users for testing.

### E2E Testing

Set `NEXTAUTH_URL` to your local URL (e.g. `http://localhost:3000`), then:

```sh
yarn test-e2e

# View the last report:
yarn playwright show-report test-results/reports/playwright-html-report
```

If browsers aren't installed: `npx playwright install`.

### Upgrading

```sh
git pull
yarn
yarn workspace @coachos/prisma db-deploy   # or db-migrate in dev
yarn predev                                # check for .env changes
yarn build && yarn start                   # or `yarn dev`
```

## Deployment

### Docker

```bash
cp .env.example .env
```

Generate and set the required secrets before starting:

```bash
openssl rand -base64 32   # NEXTAUTH_SECRET
openssl rand -base64 24   # CALENDSO_ENCRYPTION_KEY
```

If you see `Error: No key set vapidDetails.publicKey`, generate VAPID keys for web push:

```bash
npx web-push generate-vapid-keys
```

and set `NEXT_PUBLIC_VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` in `.env`. Never commit real keys to `.env.example`.

Then bring up the stack:

```bash
docker compose up -d              # full stack: db + app + Prisma Studio
docker compose up -d coachos-web studio  # app + studio against a remote DB
docker compose up -d coachos-web         # app only
```

Open the app at your configured `NEXT_PUBLIC_WEBAPP_URL`. On first run, the setup wizard creates the first admin user. The "Connect your Calendar" step during setup can be skipped by navigating directly to `<NEXT_PUBLIC_WEBAPP_URL>/event-types` — calendar integrations can be added later under Settings > Integrations.

#### Building the image from source

```bash
docker compose up -d database
DOCKER_BUILDKIT=0 docker compose build coachos-web
docker compose up -d
```

#### Troubleshooting

- **SSL edge termination**: behind a load balancer that terminates TLS, set `NODE_TLS_REJECT_UNAUTHORIZED=0` only if you trust the upstream proxy.
- **`Invalid 'prisma.user.create()'`**: use an empty JSON object `{}` for `metadata`, and leave `id` empty to autoincrement.
- **`CLIENT_FETCH_ERROR`**: the container can't resolve its own configured host. Set `NEXTAUTH_URL` to a hostname the container can reach (often `http://localhost:PORT/api/auth` in local setups).

#### Runtime variables

| Variable | Description | Required | Default |
| --- | --- | --- | --- |
| `DATABASE_URL` | Database URL with credentials — point at your pooler if using one | required | — |
| `NEXT_PUBLIC_WEBAPP_URL` | Base URL of the site. Changing this after build causes a short delay on container start while static files update | optional | `http://localhost:3000` |
| `NEXTAUTH_URL` | Location of the auth server | optional | `{NEXT_PUBLIC_WEBAPP_URL}/api/auth` |
| `NEXTAUTH_SECRET` | Cookie encryption key. Generate with `openssl rand -base64 32` | required | — |
| `CALENDSO_ENCRYPTION_KEY` | Encryption key, 32 bytes for AES256. Generate with `openssl rand -base64 24` | required | — |

#### Build-time variables

| Variable | Description | Required | Default |
| --- | --- | --- | --- |
| `DATABASE_URL` | Same as above, required during build | required | — |
| `MAX_OLD_SPACE_SIZE` | Node/npm build memory limit | required | 4096 |
| `NEXTAUTH_SECRET` | Must match runtime value | required | — |
| `CALENDSO_ENCRYPTION_KEY` | Must match runtime value | required | — |
| `NEXT_PUBLIC_WEBAPP_URL` | Base URL injected into static files | optional | `http://localhost:3000` |
| `NEXT_PUBLIC_WEBSITE_TERMS_URL` | Custom terms-of-service URL | optional | — |
| `NEXT_PUBLIC_WEBSITE_PRIVACY_POLICY_URL` | Custom privacy-policy URL | optional | — |

## Content Security Policy

Set `CSP_POLICY="non-strict"` to enable [Strict CSP](https://web.dev/strict-csp/) except for `unsafe-inline` in `style-src`. Currently only enforced on the login page; other SSR pages run it in report-only mode. Not yet supported on SSG pages.

## Integrations

Each integration below is off until you configure its credentials — no code path calls out to any of these services otherwise.

### Google Calendar

1. Open the [Google API Console](https://console.cloud.google.com/apis/dashboard), create/select a project, enable the Google Calendar API.
2. Configure the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent), adding the `.../auth/calendar.events` and `.../auth/calendar.readonly` scopes.
3. Create OAuth credentials ([Credentials](https://console.cloud.google.com/apis/credentials) → Create Credentials → OAuth Client ID → Web Application).
4. Add authorized redirect URIs: `<your booking URL>/api/integrations/googlecalendar/callback` and `<your booking URL>/api/auth/callback/google`.
5. Download the JSON and paste its full contents into `GOOGLE_API_CREDENTIALS` in `.env`.
6. Re-seed the app store if needed: `cd packages/prisma && yarn seed-app-store`.
7. Publish the OAuth consent screen (not just leave it in testing).

### Microsoft Graph (Office 365 Calendar)

1. Register an app in [Azure App Registration](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps), multitenant.
2. Redirect URI: `<your booking URL>/api/integrations/office365calendar/callback`.
3. Set `MS_GRAPH_CLIENT_ID` and `MS_GRAPH_CLIENT_SECRET` from the app registration.

### Zoom

1. Create a "General App" (user-managed) in the [Zoom Marketplace](https://marketplace.zoom.us/).
2. Set `ZOOM_CLIENT_ID` / `ZOOM_CLIENT_SECRET`.
3. OAuth redirect: `<your booking URL>/api/integrations/zoomvideo/callback` (add to allow-list, enable subdomain check).
4. Scopes: `meeting:write:meeting`, `user:read:settings`.

### Daily.co (video)

1. Create an account at [Daily.co](https://daily.co/), copy your API key from the [developers dashboard](https://dashboard.daily.co/developers).
2. Set `DAILY_API_KEY`. If on the Scale plan, set `DAILY_SCALE_PLAN=true` for recording support.

### Basecamp

1. Register an app at the 37signals Integrations Dashboard, targeting Basecamp 4.
2. Redirect URL: `<your booking URL>/api/integrations/basecamp3/callback`.
3. Set `BASECAMP3_CLIENT_ID` / `BASECAMP3_CLIENT_SECRET` (secret format: `{your_domain} ({support_email})`).

### HubSpot

1. Create a legacy public app at [HubSpot Developer](https://developer.hubspot.com/).
2. Set `HUBSPOT_CLIENT_ID` / `HUBSPOT_CLIENT_SECRET`.
3. Redirect URL: `<your booking URL>/api/integrations/hubspot/callback`.
4. Scopes: read/write on `crm.objects.contacts` and `crm.lists`.

### Webex

See [packages/app-store/webex](./packages/app-store/webex/).

### Zoho CRM

1. Register a server-based app at the [Zoho API Console](https://api-console.zoho.com/).
2. Set `ZOHOCRM_CLIENT_ID` / `ZOHOCRM_CLIENT_SECRET`.
3. Redirect URL: `<your booking URL>/api/integrations/zohocrm/callback`.

### Zoho Calendar / Zoho Bigin

See [packages/app-store/zohocalendar](./packages/app-store/zohocalendar/) and [packages/app-store/zoho-bigin](./packages/app-store/zoho-bigin/).

### Pipedrive

See [packages/app-store/pipedrive-crm](./packages/app-store/pipedrive-crm/).

### Rate limiting (Unkey)

Optional. Sign up at [unkey.com](https://unkey.com), create a root key with `ratelimit.create_namespace` and `ratelimit.limit` permissions, and set `UNKEY_ROOT_KEY`. Without it, rate limiting is simply disabled.


