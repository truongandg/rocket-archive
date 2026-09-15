# Rocket Archive

Live demo: [https://rocket-archive.vercel.app](https://rocket-archive.vercel.app/)

Rocket Archive is a premium, aerospace-inspired explorer for launch vehicle configurations. Browse rockets, compare their flight records, inspect a configuration's detailed history, and save personal favourites and collections.

## Features

- Browse Launch Library 2 launcher configurations
- Server-side search, filtering, and ordering
- Progressive `Load more` pagination (10 rockets per request)
- Rocket detail pages with technical specifications, flight records, landing records, and related launch history
- Favourite rockets and organize them into custom collections
- Add or remove rockets from collections directly from a card or detail page
- Persist favourites and collections in `localStorage`
- Responsive UI with loading, error, and empty states

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- TanStack React Query
- Zustand + `localStorage`
- Lucide React icons
- [Launch Library 2 development API](https://lldev.thespacedevs.com/2.3.0/) — used for development because it has no rate limits.

## Running locally

Prerequisites: Node.js **24** (the version used to verify the build) and npm.

```bash
npm install
cp .env.sample .env
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`.

The `.env` file sets `VITE_API_BASE_URL` to the development API. Change this value to use another API endpoint, then restart the dev server. For production builds, set the variable before running `npm run build`. Local `.env` files are ignored by Git; `.env.sample` documents the required configuration.

## CI/CD

GitHub Actions runs lint and build checks on pull requests and pushes to `main`. Successful checks on `main` trigger a Vercel deployment.

Setup:

1. Connect the GitHub repository to Vercel.
2. Create a Vercel deploy hook for `main` and save its URL as the GitHub Actions secret `VERCEL_DEPLOY_HOOK_URL`.
3. Set `VITE_API_BASE_URL` in Vercel using the value in `.env.sample`.

Check deployment status in Vercel. Its automatic Git deployments may also run if enabled.

## Routes

| Route          | Purpose                                                       |
| -------------- | ------------------------------------------------------------- |
| `/`            | Rocket explorer with search, filters, sorting, and pagination |
| `/rockets/:id` | Rocket configuration detail and related launch history        |
| `/collections` | Favourites and custom rocket collections                      |

## Architecture

The app uses React, TypeScript, and Vite for a simple setup with reusable components. React Router handles navigation between pages.

React Query handles API data, caching, loading states, and pagination. Zustand saves favourites and collections to `localStorage`. Search text and dialog state stay in their components. Tailwind CSS handles styling, and Lucide provides icons.

The code is split into pages, components, hooks, and API services to keep UI and data handling separate.

```text
src/
├── components/
│   ├── collection/    # Collection dialog, cards, and picker
│   ├── rocket/        # Explorer, cards, and launch history
│   ├── layout/        # Application shell and navigation
│   └── ui/            # Shared button, badge, and confirmation dialog
├── hooks/             # React Query hooks and UI utilities
├── pages/             # Route-level components
├── services/          # API fetcher and Launch Library endpoints
├── store/             # Persisted user-owned state
└── types/             # Launch Library response and app state types
```

## Data and state

Remote API data is handled by React Query. Query hooks own cache keys, loading state, retries, and pagination. The service layer owns endpoint construction; the shared fetcher owns HTTP request handling.

The app intentionally uses Launch Library 2's native `snake_case` response fields throughout. This keeps the small take-home codebase close to the API payload and avoids an unnecessary transformation layer.

Zustand manages only user-owned state:

- `favouriteRocketIds`
- collections and their `rocketIds`

This state persists under the `rocket-archive-storage` localStorage key. Remote API responses are not persisted.

## API usage

The app uses the [Launch Library 2 development API](https://lldev.thespacedevs.com/2.3.0/), which has no rate limits for development and testing.

- `/launcher_configurations/` — search, filter, and sort rockets, with 10 results per page.
- `/launcher_configurations/:id/` — get a rocket's details.
- `/launches/` — get a rocket's 20 most recent completed launches.

To use production, set `VITE_API_BASE_URL` in `.env` to `https://ll.thespacedevs.com/2.3.0/`. Production has rate limits; see the [API documentation](https://lldev.thespacedevs.com/).

## Known limitations

- Favourites and collections are saved in the current browser only and do not sync across devices. Clearing site data removes them.
- The development API can return incomplete or outdated data. Missing or failed rocket images display a fallback icon.

## Tradeoffs and future improvements

For the two-hour scope, I focused on search, favourites, and collections. Data is saved in the browser to keep setup simple, so there is no login or syncing across devices. The app loads content in the browser and is easy to deploy. With more time, I would add automated tests and improve the features listed below.

- Launch history is limited to 20 completed launches; it could use its own Load More control.
- Video links appear only when the API supplies a `mission.vid_urls` entry.
- Collection rocket details are fetched individually and cached by React Query; a batch endpoint or cache hydration could optimize large personal libraries.
- No automated component or end-to-end tests are included due to the take-home scope.
- Additional filters, image credit treatment, and richer launch-media support are natural next steps.
