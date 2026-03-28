# LinkParty

Networking for live events: one **event code**, one **link**, and a guest list that updates in real time. Organizers create events and share a QR; attendees join with a short flow (often just LinkedIn). **Present mode** can cycle through guests on a big screen with scannable QR codes so people can connect from their seats.

## Stack

- **Next.js** (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Convex** — events and attendees
- **Clerk** — authentication
- **Cloudinary** — event assets (e.g. fliers)

## Getting started

Install dependencies:

```bash
npm install
```

### Environment variables

Create `.env.local` in the project root with:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL (from [Convex dashboard](https://dashboard.convex.dev) or `npx convex dev`) |
| `NEXT_PUBLIC_BASE_URL` | Public site URL (e.g. `http://localhost:3000` in dev; your production URL in prod). Used where absolute URLs are needed (e.g. QR payloads). |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (server-side) |

Clerk requires its standard Next.js keys (see [Clerk Next.js quickstart](https://clerk.com/docs/quickstarts/nextjs)), typically `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

### Convex

From the repo root, link and sync functions:

```bash
npx convex dev
```

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | TypeScript check |

## Adding UI components

This project uses shadcn/ui. To add a component:

```bash
npx shadcn@latest add button
```

Import from `@/components/ui/...`.
