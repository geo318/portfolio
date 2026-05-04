# Giorgi Lomidze Portfolio

3D-focused portfolio built from the `geo-blueprint-lab` visual shell.

## Stack

- Next.js 16
- React 19
- TypeScript
- App Router
- Tailwind CSS v4
- shadcn/ui primitives
- Framer Motion
- Three.js / React Three Fiber / Drei
- Zustand
- Zod

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Local Docs

- `AGENTS.md`: agent notes and guardrails.
- `INSTRUCTIONS.md`: product/design/copy rules.
- `IMPLEMENTATION.md`: app shape and current TODOs.
- `DEVELOPMENT.md`: commands and verification workflow.
- `SKILL.md`: repo-specific AI workflow.

Local dev URL:

```bash
http://localhost:3000
```

## Notes

- The original repository used a TanStack/Vite design shell. This implementation keeps the blueprint/CAD visual direction but uses an official `create-next-app` generated Next.js 16 scaffold as the app foundation.
- The Three.js/WebGL section is intentionally framed as a focused technical showcase, not as a claim of long production 3D graphics experience.
- If WebGL or reduced motion constraints apply, the portfolio keeps readable static fallbacks.
