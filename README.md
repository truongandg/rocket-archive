# Rocket Archive

[Live demo](https://rocket-atlas-ten.vercel.app/)

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

Other commands:

```bash
npm run build
npm run lint
npm run preview
```

## Routes

| Route          | Purpose                                                       |
| -------------- | ------------------------------------------------------------- |
| `/`            | Rocket explorer with search, filters, sorting, and pagination |
| `/rockets/:id` | Rocket configuration detail and related launch history        |
| `/collections` | Favourites and custom rocket collections                      |

## Architecture

The app is a client-rendered React application built with Vite and TypeScript. React provides reusable components for rocket cards, collections, and dialogs; Vite keeps local development and production builds straightforward. React Router gives each page its own URL without requiring a server-rendering framework.

TanStack React Query manages API caching, loading/error states, and pagination. Zustand handles favourites and collections with `localStorage` persistence, while temporary UI state such as search text and open dialogs stays inside components. Tailwind CSS supports consistent responsive styling, and Lucide supplies reusable icons.

Pages compose feature components, hooks manage remote data, and services handle API requests. This separates presentation from data access and keeps shared behaviour reusable.

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

The app uses the development API to avoid rate limits during development and testing. We can switch to the production API by setting `VITE_API_BASE_URL` in `.env` to `https://ll.thespacedevs.com/2.3.0/`. The production API currently limits unauthenticated requests to 15 calls per hour; higher limits require an API key. See the [official API documentation](https://lldev.thespacedevs.com/) for rate-limit details.

The explorer uses `/launcher_configurations/` with server-side search, filter, and ordering parameters. It requests 10 records at a time and follows the API's `next` pagination URL on demand.

Rocket detail pages request `/launcher_configurations/:id/`. Related launch history uses `/launches/` filtered by launcher configuration, limited to the 20 most recent completed launches.

The development API can have incomplete or delayed information. The UI treats optional fields as nullable and uses fallbacks rather than inventing values.

## Tradeoffs and future improvements

For the two-hour scope, the implementation prioritizes the core search, favourite, and collection flows. Browser storage avoids the need for a backend or authentication, but saved data is limited to the current browser and does not sync across devices. A client-rendered app keeps deployment simple, while accepting that rocket content loads after JavaScript runs. Automated tests and more advanced features remain follow-up work.

- Launch history is limited to 20 completed launches; it could use its own Load More control.
- Video links appear only when the API supplies a `mission.vid_urls` entry.
- Collection rocket details are fetched individually and cached by React Query; a batch endpoint or cache hydration could optimize large personal libraries.
- No automated component or end-to-end tests are included due to the take-home scope.
- Additional filters, image credit treatment, and richer launch-media support are natural next steps.
