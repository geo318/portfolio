# Giorgi Lomidze Portfolio

Personal portfolio for Giorgi Lomidze, built as a CV-backed technical profile for full-stack and frontend-heavy product engineering work.

The site presents practical experience in React, Next.js, TypeScript, Node.js, SQL, GraphQL, ConnectRPC, API integrations, product UI, performance, and maintainable delivery. It also includes a focused Three.js/WebGL showcase. The 3D work is intentionally framed as a technical lab and visual shell, not as a claim of long production graphics tenure.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Content Editing](#content-editing)
- [AI Chat](#ai-chat)
- [Performance Strategy](#performance-strategy)
- [SEO and Accessibility](#seo-and-accessibility)
- [Deployment](#deployment)
- [Maintenance Notes](#maintenance-notes)
- [License](#license)

## Overview

This is a Next.js App Router portfolio with a dark CAD/blueprint visual direction. The design language uses technical panels, neon green/cyan accents, scan overlays, a canvas-rendered space backdrop, and a lazy-loaded WebGL suit model.

The main goal is to communicate engineering credibility quickly:

- Who Giorgi is and what kind of work he does.
- Where his strongest production experience sits.
- Which projects and responsibilities are relevant.
- How he approaches frontend architecture, integrations, performance, and delivery.
- How to contact him, download the CV, open GitHub, or ask the embedded chat questions.

## Features

- Server-rendered hero and content sections for strong initial load and SEO.
- CV-backed portfolio copy stored in typed content configuration.
- Lazy-loaded interactive WebGL model for desktop users.
- Canvas-rendered solar-system and Matrix-style backdrop, gated by viewport, motion preference, and delayed activation.
- Live performance monitor overlay.
- Architecture scan mode with contextual component labels.
- Streaming AI chat section backed by the Vercel AI SDK and Google Gemini.
- Downloadable CV from `public/GL.pdf`.
- Dynamic Open Graph image, sitemap, robots file, web app manifest, and JSON-LD profile metadata.
- Vercel-friendly cache headers for immutable 3D model assets.

## Tech Stack

- **Framework:** Next.js 16, App Router
- **UI:** React 19, TypeScript, Tailwind CSS v4
- **Components:** local shadcn-style primitives, Radix Slot
- **Motion:** Framer Motion, CSS keyframes, pointer-reactive canvas effects
- **3D:** Three.js, React Three Fiber, Drei
- **State:** Zustand for scan mode
- **AI:** Vercel AI SDK with Google Generative AI provider
- **Validation and utility:** Zod, clsx, tailwind-merge, class-variance-authority
- **Tooling:** Biome, TypeScript, npm
- **Hosting:** Vercel

## Architecture

The app follows a composition-first App Router structure:

- `src/app` owns route entry points, global CSS, metadata, sitemap, robots, manifest, Open Graph image, and API routes.
- `src/components/sections` owns page sections such as hero, work, stack, performance, contact, and chat.
- `src/components/layout` owns the page shell, header, section wrappers, and scan labels.
- `src/components/motion` owns interactive visual behavior such as reveal wrappers, tilt cards, backdrop canvas, and performance monitor.
- `src/features` contains domain-specific interactive systems:
  - `hero-suit` for the WebGL suit scene and loader.
  - `three-lab` for the 3D domain map showcase.
  - `scan-mode` for architecture scan state.
- `src/content` is the primary place for profile, project, section, and chat prompt content.
- `src/lib` contains metadata and shared utility helpers.

Heavy browser-only pieces are isolated behind client components and dynamic imports. The initial page remains mostly server-rendered, while expensive visual systems load only when useful.

## Project Structure

```text
.
|-- public/
|   |-- GL.pdf
|   `-- models/
|       `-- rust_space_suit.fd010165.glb
|-- src/
|   |-- app/
|   |   |-- api/chat/route.ts
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   |-- manifest.ts
|   |   |-- opengraph-image.tsx
|   |   |-- robots.ts
|   |   |-- sitemap.ts
|   |   `-- page.tsx
|   |-- components/
|   |   |-- layout/
|   |   |-- motion/
|   |   |-- sections/
|   |   `-- ui/
|   |-- content/
|   |   |-- chat-profile.ts
|   |   `-- portfolio.ts
|   |-- features/
|   |   |-- hero-suit/
|   |   |-- scan-mode/
|   |   `-- three-lab/
|   |-- hooks/
|   `-- lib/
|-- next.config.ts
|-- biome.json
|-- package.json
`-- tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 20 or newer is recommended.
- npm is the package manager used by the tracked lockfile.

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

## Environment Variables

Create a local `.env` file when running features that need server-side configuration.

```bash
# Used for canonical URLs, sitemap, Open Graph metadata, and JSON-LD.
NEXT_PUBLIC_SITE_URL=https://www.lomize.com

# AI chat provider key. Either name works.
CHAT_API_KEY=...
# or
GOOGLE_GENERATIVE_AI_API_KEY=...

# Optional. Defaults to gemini-2.5-flash-lite.
CHAT_MODEL=gemini-2.5-flash-lite
```

Do not expose provider keys in client-side variables. The chat route reads keys only on the server.

## Available Scripts

```bash
npm run dev
```

Starts the Next.js dev server.

```bash
npm run build
```

Creates a production build and runs TypeScript checks through Next.js.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs Biome checks.

```bash
npm run lint:fix
```

Runs Biome and applies safe fixes.

```bash
npm run format
```

Formats files with Biome.

## Content Editing

Most public copy lives in `src/content/portfolio.ts`. Prefer editing the typed arrays and objects there instead of hardcoding text in section components.

Chat grounding and first-person response rules live in `src/content/chat-profile.ts`.

When changing copy, keep these rules:

- Keep the positioning honest and CV-backed.
- Do not overclaim 3D/WebGL production experience.
- Keep the portfolio focused on product engineering, frontend architecture, integrations, performance, and delivery.
- Avoid generic marketing filler. The copy should explain real strengths and responsibilities.

## AI Chat

The chat endpoint is implemented at:

```text
src/app/api/chat/route.ts
```

The route:

- Accepts a `messages` array from the client.
- Limits recent chat history before sending it to the model.
- Uses the Google provider from the Vercel AI SDK.
- Streams text responses back to the UI.
- Grounds answers in `src/content/chat-profile.ts`.
- Answers in Giorgi's first-person voice.

The UI lives in:

```text
src/components/sections/live-chat-section.tsx
```

The chat section is deferred through:

```text
src/components/sections/deferred-live-chat-section.tsx
```

This keeps the first page load lighter and loads the chat only when it is likely to be used.

## Performance Strategy

The site is visual-heavy, so expensive work is isolated and delayed:

- The hero text and main content are server-rendered.
- The WebGL suit is desktop-only and loaded through a dynamic client component.
- The 3D domain map section is lazy-loaded near viewport entry.
- The AI chat section is lazy-loaded near viewport entry.
- The canvas backdrop respects reduced-motion preference and is delayed until interaction or idle time.
- The performance monitor delays sampling to avoid competing with initial render.
- The WebGL model file is content-versioned and served with immutable CDN cache headers.
- Next.js hashed chunks under `/_next/static` are left to Next/Vercel's immutable static asset caching.

The GLB model is served from:

```text
public/models/rust_space_suit.fd010165.glb
```

`next.config.ts` sets long-lived CDN caching for `/models/:path*`.

## SEO and Accessibility

The app includes:

- Static metadata in `src/app/layout.tsx`.
- Canonical URL support through `NEXT_PUBLIC_SITE_URL`.
- Open Graph and Twitter metadata.
- Dynamic Open Graph image route.
- `robots.ts` and `sitemap.ts`.
- Web app manifest.
- JSON-LD `Person` and `ProfilePage` data from `src/lib/site-metadata.ts`.
- Semantic section structure.
- Reduced-motion handling for animation-heavy UI.
- Readable static fallbacks for deferred or unsupported WebGL paths.

## Deployment

The app is intended for Vercel.

Recommended Vercel configuration:

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: managed by Next.js
- Environment variables:
  - `NEXT_PUBLIC_SITE_URL`
  - `CHAT_API_KEY` or `GOOGLE_GENERATIVE_AI_API_KEY`
  - optional `CHAT_MODEL`

After deploy, verify:

- `/` renders without client errors.
- `/GL.pdf` downloads.
- `/models/rust_space_suit.fd010165.glb` returns long-lived cache headers.
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, and `/opengraph-image` are reachable.
- Chat streams when provider credentials are configured.

## Maintenance Notes

- Use `npm`, not pnpm, unless the lockfile strategy is intentionally changed.
- Keep large binary assets out of `src` unless they are imported by the bundler.
- Version immutable public assets by filename when changing their contents.
- Keep AI provider keys server-side only.
- Run `npm run lint` and `npm run build` after structural changes.
- Keep local AI agent guidance in:
  - `AGENTS.md`
  - `INSTRUCTIONS.md`
  - `IMPLEMENTATION.md`
  - `DEVELOPMENT.md`
  - `SKILL.md`

## License

This is a private personal portfolio project. No open-source license is currently declared.
