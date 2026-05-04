# Development

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Default local URL:

```bash
http://localhost:3000
```

## Project Shape

- `src/app`: Next App Router entry, metadata, global CSS, icon.
- `src/components/layout`: site shell, section wrapper, scan labels.
- `src/components/sections`: portfolio sections.
- `src/content/portfolio.ts`: typed copy/config for profile, nav, fit cards, skills, layers, projects, notes.
- `src/features/scan-mode`: Zustand state for architecture scan mode.
- `src/features/three-lab`: R3F domain map data and scene.
- `src/components/ui`: minimal shadcn-style primitives kept by app.

## Development Rules

- Edit content arrays first when changing copy/cards.
- Keep components small and section-specific.
- Keep 3D code client-only and dynamically imported.
- Respect reduced motion and WebGL fallback.
- Avoid random decorative 3D objects; all visuals should map to frontend/domain/spatial architecture.
- Use `npm`, because this app has `package-lock.json`.

## Verification

Before handoff:

```bash
npm run lint
npm run build
```

For visual changes, check:

- desktop hero
- mobile hero
- Three.js section visible and nonblank
- scan mode labels do not block text
