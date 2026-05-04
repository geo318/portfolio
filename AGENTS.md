# Agents Notes

Lightweight log for AI copilots working on this portfolio. Keep entries terse and update only for decisions future maintainers need.

## Current Context

- App target: personal portfolio for Giorgi Lomidze, positioned for 3D frontend role.
- Stack: Next.js 16, React 19, TypeScript, App Router, Tailwind CSS v4, shadcn-style primitives, Framer Motion, Three.js/R3F/Drei, Zustand, Zod.
- Visual direction comes from original `geo-blueprint-lab`: dark blueprint/CAD lab, neon green/cyan accents, technical viewport, scan overlays.
- Content must stay honest: production strength is React/Next/TypeScript, real-time UI, architecture, performance. Three.js/WebGL is a focused showcase, not years-long production graphics experience.
- Main content config lives in `src/content/portfolio.ts`; prefer editing typed arrays there over hardcoding cards in JSX.
- 3D scene lives in `src/features/three-lab`; keep it lazy-loaded through `src/components/sections/three-showcase-section.tsx`.

## Recent Changes

- Converted original TanStack/Vite design shell into official `create-next-app` generated Next.js 16 app.
- Added 3D-focused sections: Hero, 3D Fit, Stack, Three.js/WebGL Showcase, DDD Architecture, Selected Work, Performance, Property Background, Application Notes, Contact.
- Added architecture scan mode via Zustand in `src/features/scan-mode/store.ts`.
- Added custom app icon at `src/app/icon.svg`.
- `.gitignore` now ignores `.next`, `.playwright-cli`, `output`, and generated artifacts.
- Added interaction polish: pointer-reactive backdrop, scroll reveal wrappers, 3D tilt cards, magnetic button sheen, parallax hero/property layers, and interactive 3D scene controls.
- Cyberpunk shift: added `CyberButton` primitive using angled clipped outline, neon flicker fill, grid/glitch sweep, and magenta/cyan accents for primary CTAs.
- Backdrop now uses `PixelMatrixBackdrop` as a canvas-rendered deep cosmos: star-depth parallax, distant sun/orbit plane, tiny planets, and cursor-revealed Matrix glyph rain. Do not re-add CSS blob circles/beams/reticles behind content.

## Guardrails

- Do not turn this into generic SaaS/portfolio styling. Keep blueprint/CAD/product cockpit language.
- Do not overclaim 3D production experience.
- Do not reintroduce Google font runtime fetches; local/system font stack keeps builds offline-safe.
- Heavy visual code must stay lazy-loaded and have readable fallback.
- Run `npm run lint` and `npm run build` after structural changes.
