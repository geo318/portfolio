# Instructions

## Product Goal

Build and maintain a polished personal portfolio for Giorgi Lomidze tailored to 3D frontend work.

## Design Source

Use the existing `geo-blueprint-lab` direction:

- blueprint grid
- CAD/architectural interface
- dark technical cockpit
- neon green/cyan accents
- spatial/product/design-lab feeling

Avoid generic SaaS layouts, crypto visuals, childish game UI, and decorative 3D with no product meaning.

## Copy Tone

- direct
- technical
- confident
- honest
- no fake percentages
- no “rockstar”, “ninja”, or vague hype

## Honesty Rule

Do not claim long production Three.js experience.

Say:

> focused Three.js/WebGL showcase

Use it to demonstrate graphics-heavy frontend thinking, performance boundaries, state isolation, and maintainable rendering code.

## Implementation Rules

- Keep generated Next.js framework config conservative.
- Prefer typed content arrays in `src/content/portfolio.ts`.
- Keep section JSX mapped from content where practical.
- Keep 3D scene lazy-loaded.
- Do not create new objects every frame.
- Do not use React state inside `useFrame`.
- Dispose Three.js resources on unmount.
- Respect reduced motion.
- Keep mobile readable.
- Run lint/build before final handoff.

## Contact Data

Current public links live in `src/content/portfolio.ts`:

- email
- GitHub
- LinkedIn

Update there first.
