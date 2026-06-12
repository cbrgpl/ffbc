# admin-panel

## Envs list

| Name             | Type                 | Description                                                                                                     |
| ---------------- | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| VITE_API_MOCKING | enabled \| undefined | Enables MSW browser mocks in dev mode when set to `enabled`. Leave empty or unset to use real network requests. |

## CI/CD build app (mock for while)

Mock flow for now. Build app from `apps/admin-panel` after deps installed:
`npm run build`.

## Local API start (mock for while)

Mock flow for now. Local real API start guide will be added later.

## Local mock start

Pre requirements: `VITE_API_MOCKING` **MUST BE** `enabled`

```sh
npm i

// generate mock api
npm run mock:api:generate
// install MSW worker into public
npm run mock:init

npm run dev
```

## API mocking

API mocks are generated from `mock/swagger.yaml` by Orval config in `mock/orval.config.ts`.

`npm run mock:api:generate` writes fetch client, types, and MSW handlers into `src/shared/api/generated`.

- Browser mocking uses MSW worker from `src/shared/api/mocks/browser.ts`.
  App enables it only in dev mode when `VITE_API_MOCKING=enabled`.
  Use `.env.example` as env sample.

- Tests use MSW server from `src/shared/api/mocks/server.ts`.
  Both browser and test mocks combine generated handlers from `getFFBCAdminPanelAPIMock()` with manual handlers from `src/shared/api/mocks/manual-handlers.ts`.

Manual handlers cover custom cases that are not generated from Swagger:
`GET /health` returns `{ status: 'ok' }`, and `POST /file-storage/file` passes through to real network.
