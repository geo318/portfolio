# Implementation Notes

This portfolio presents Giorgi Lomidze as a frontend systems engineer for 3D.

## Scope

- Single-page portfolio.
- Next.js 16 App Router.
- React 19 client/server component split.
- Blueprint/CAD technical design language from `geo-blueprint-lab`.
- Focused Three.js/WebGL showcase for graphics-heavy interface readiness.

## Positioning

Core positioning copy:

> Production frontend experience in React, Next.js, TypeScript, real-time product UI, architecture, and performance. This portfolio adds a focused Three.js/WebGL showcase to demonstrate how I approach graphics-heavy interfaces.

Do not weaken or exaggerate this. Keep the honesty boundary clear.

## Sections

1. Hero
2. 3D Fit
3. Technical Stack
4. Three.js / WebGL Showcase
5. DDD Architecture
6. Selected Work
7. Performance Habits
8. Property Appraisal Background
9. Application Notes
10. Contact

## Architecture

- Portfolio copy/data is validated and exported from `src/content/portfolio.ts`.
- Page composition starts at `src/components/portfolio-page.tsx`.
- Scan mode state is isolated in Zustand.
- Three.js scene domain data lives separately from rendering code.
- UI primitives remain minimal: `Button`, `Badge`, `Card`.

## 3D Showcase

Scene concept: `3D Domain Map`.

Nodes:

- Tenant
- Product
- Inventory
- Auction
- Cart
- Order
- Payment
- Shipping

Requirements kept:

- dynamic import
- Suspense fallback
- R3F Canvas
- WebGL fallback
- reduced-motion handling
- memoized geometry/materials
- refs for animation state
- cleanup/dispose on unmount

## Current TODO

- Replace placeholder CV disabled button only when a real CV file exists.
- Confirm final public email/LinkedIn/GitHub before deployment.
- Optional: add a static Open Graph image matching the blueprint UI.
- Optional: reduce/remove upstream Three/R3F dev warning if dependency versions expose one.

## Interaction Layer

- Pointer-reactive fixed backdrop updates CSS variables without React render churn.
- Cards use CSS-driven 3D tilt with glare and reduced-motion fallback.
- Section content uses Framer Motion reveal-on-scroll.
- Hero/property diagrams use lightweight CSS parallax.
- Three.js scene supports mode switching, active-node selection, and WebSocket pulse toggle.
- Main CTAs use `CyberButton`, inspired by clipped cybertruck-style outline/fill timing but tuned to portfolio colors and accessibility.
- Section transitions use spring-eased scroll progress for deep parallax.
- Background uses `PixelMatrixBackdrop`: canvas-rendered cosmos depth, distant sun, orbit plane, tiny planets, star parallax, and cursor-revealed Matrix glyph rain. CSS blob/reticle shapes were removed.
