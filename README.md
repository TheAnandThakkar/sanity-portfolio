# Portfolio — Sanity Studio + Next.js

This repository is a **Sanity CMS** project with a **Next.js** front end. Content is modeled in the Studio, stored in Sanity’s cloud dataset, fetched with **GROQ** in the Next app, and rendered as pages (home, blog index, blog posts).

---

## How the pieces fit together

```text
┌─────────────────┐     schema      ┌──────────────────┐
│  schemaTypes/   │ ──────────────► │  Sanity Cloud    │
│  (documents)    │    deploy /     │  (dataset)       │
└─────────────────┘    first sync   └────────┬─────────┘
        ▲                                    │
        │ edit content                       │ read API
        │                                    ▼
┌───────┴─────────┐                 ┌──────────────────┐
│  Sanity Studio  │                 │  Next.js (web/)  │
│  npm run dev    │                 │  GROQ + client   │
└─────────────────┘                 └──────────────────┘
```

1. **Schema** (`schemaTypes/`) defines document types (e.g. profile, author, post).
2. **Sanity Studio** (root) is the editorial UI; editors create and publish documents into the **dataset**.
3. **Next.js** (`web/`) uses `@sanity/client` to run **GROQ** queries (`web/lib/queries.ts`) and renders routes under `web/app/`.
4. **Images** use `@sanity/image-url` for CDN URLs (thumbnails, hero images, etc.).

---

## Prerequisites

- **Node.js** (LTS recommended)
- **npm**
- A **Sanity account** and project ([sanity.io/manage](https://www.sanity.io/manage))

---

## Step 1 — Install dependencies

From the repository root:

```bash
npm install
npm install --prefix web
```

---

## Step 2 — Create or choose a Sanity project

If you do not have a project yet:

1. Sign in at [sanity.io/manage](https://www.sanity.io/manage).
2. Create a project and note the **Project ID** and **Dataset** name (often `production`).

You will use these values in environment variables in the next step.

---

## Step 3 — Environment variables

This repo uses **two** env locations: one for **Studio/CLI** (repo root) and one for the **Next.js** app (`web/`).

### Studio and CLI (repository root)

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set:

   - `SANITY_STUDIO_PROJECT_ID` — your Sanity project ID  
   - `SANITY_STUDIO_DATASET` — your dataset name (e.g. `production`)

`Sanity Studio` and commands like `sanity build` read these via `sanity.config.ts` and `sanity.cli.ts`.

### Next.js (`web/`)

1. Copy the example file:

   ```bash
   cp web/env.local.example web/.env.local
   ```

2. Edit `web/.env.local` and set:

   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — same project ID as above  
   - `NEXT_PUBLIC_SANITY_DATASET` — same dataset as above  

The public `NEXT_PUBLIC_*` variables are bundled for the browser where needed; the client in `web/lib/sanity.ts` uses them to query content.

---

## Step 4 — Run Sanity Studio (content editing)

From the **repository root**:

```bash
npm run dev
```

This starts **Sanity Studio** (development mode). Open the URL shown in the terminal (typically `http://localhost:3333`).

In the Studio you can:

- Create **profile**, **author**, and **post** documents (per your schema).
- Upload images and set hotspots where configured.
- Publish changes so the dataset updates for the Next app.

---

## Step 5 — Run the Next.js site

In a **second terminal**, from the **repository root**:

```bash
npm run dev:web
```

This runs the Next.js dev server inside `web/` (often `http://localhost:3000`).

Visit the home page and blog routes; they load data from Sanity using the GROQ queries in `web/lib/queries.ts`.

---

## Step 6 — Typical content workflow (end to end)

1. **Schema** — Adjust or add types under `schemaTypes/` if you need new fields or documents.
2. **Studio** — Run `npm run dev`, edit content, publish.
3. **Queries** — Update `web/lib/queries.ts` (and `web/types/sanity.ts` types) when you change what the front end needs.
4. **UI** — Update components and routes under `web/app/` and `web/components/`.
5. **Verify** — Run `npm run lint --prefix web` and open the site locally.

---

## Useful npm scripts (repository root)

| Command | Purpose |
|--------|---------|
| `npm run dev` | Sanity Studio (development) |
| `npm run dev:web` | Next.js development server |
| `npm run build` | Build Studio for production |
| `npm run build:web` | Build the Next.js app |
| `npm run deploy` | Deploy Studio (Sanity hosting; requires setup) |
| `npm start` | Serve a production Studio build locally |

---

## Project layout (short)

| Path | Role |
|------|------|
| `schemaTypes/` | Sanity document and object schemas |
| `sanity.config.ts` | Studio configuration |
| `sanity.cli.ts` | CLI / deployment API settings |
| `web/app/` | Next.js App Router pages |
| `web/lib/sanity.ts` | Sanity client + image URL helpers |
| `web/lib/queries.ts` | GROQ queries shared by pages |
| `web/components/` | React components (e.g. Portable Text, images) |

---

## Further reading

- [Sanity — Getting started](https://www.sanity.io/docs/introduction/getting-started)  
- [GROQ](https://www.sanity.io/docs/groq)  
- [Next.js + Sanity](https://www.sanity.io/docs/js-client)
