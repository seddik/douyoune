# Douyoune Frontend

Douyoune is an Angular 21 debt-ledger app focused on two audiences:

1. **Account owners** who log in, record debts, review the running total, and share a legacy access code.
2. **Heirs or guardians** who can enter that legacy code to view the ledger without the account password.

The UI is built with Angular Material and talks to the Laravel API in `..\douyoune-api`.

## What the app currently does

### Authenticated user flow

- Register a new account
- Sign in with email and password
- View a private dashboard with the total outstanding amount
- Add debt records with:
  - creditor name
  - amount
  - currency
  - debt direction (`I owe them` / `They owe me`)
  - notes / evidence
- Open **Legacy Settings** to copy the legacy code returned by the API
- Log out

### Guardian / heir flow

- Open the guardian access screen
- Enter a legacy code in the `XXXX-XXXX-XXXX` format
- View the matching ledger in read-only mode

## Routes

| Route | Purpose |
| --- | --- |
| `/login` | Sign-in screen |
| `/register` | Account creation |
| `/` | Protected dashboard for the signed-in user |
| `/legacy-settings` | Shows the legacy code and logout action |
| `/guardian` | Guardian / heir access form |
| `/guest-dashboard` | Ledger view loaded from a legacy code |
| `/debts-details` | Debt details view |

## API dependency

The frontend currently calls these endpoints directly:

- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/debts/list`
- `POST /api/debts/add`
- `POST /api/debts/guest`

**Important:** the API base URL is hard-coded in `src/app/services/debts.service.ts` to:

```ts
http://localhost:6010
```

If your backend runs on another host or port, update that file before starting the frontend.

## Local development

### Prerequisites

- Node.js LTS
- Yarn 1.22.x
- A running Douyoune API instance at `http://localhost:6010`

### Install and run

```bash
yarn install
yarn start
```

Angular serves the app at `http://localhost:4200` by default.

## Available scripts

| Command | Description |
| --- | --- |
| `yarn start` | Start the Angular dev server |
| `yarn build` | Build the production bundle |
| `yarn test` | Run the Angular test target |
| `yarn watch` | Rebuild in development watch mode |

## Implementation notes

- Authentication uses a bearer token stored in `localStorage` as `token`.
- The legacy access code is stored in `localStorage` as `lcode`.
- Guardian access stores the entered code in `localStorage` as `gtoken`.
- An HTTP interceptor adds the bearer token to outgoing requests.
- No frontend `*.spec.ts` files are currently committed, so the test command mainly validates the Angular test setup rather than app-specific behavior.

## Working with the backend

The frontend assumes the API already supports:

- Sanctum token authentication
- a `users.lcode` field for the legacy code
- a `debt` table that stores the ledger entries

See `..\douyoune-api\README.md` for the backend setup details and the current schema caveats.
