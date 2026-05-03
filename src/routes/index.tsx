import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Giorgi Lomidze — Senior Frontend / TypeScript Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Giorgi Lomidze — Senior Frontend / TypeScript engineer architecting 3D interfaces. Built for Planner 5D.",
      },
      { property: "og:title", content: "Giorgi Lomidze — Senior Frontend / TypeScript Engineer" },
      {
        property: "og:description",
        content: "Architecting 3D interfaces with React, Three.js & DDD.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      { rel: "canonical", href: "https://giorgi-lomidze.dev/" },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen text-foreground">
      <Nav />
      <Hero />
      <Showcase />
      <Architecture />
      <Stack />
      <Fit />
      <Notes />
      <Contact />
      <Footer />
    </main>
  );
}

/* ---------- shared bits ---------- */

function Bracket({ children, label, code }: { children: React.ReactNode; label?: string; code?: string }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {(label || code) && (
          <div className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">{label}</span>
            <span>{code}</span>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function Tag({ children, tone = "primary" }: { children: React.ReactNode; tone?: "primary" | "secondary" | "muted" }) {
  const map = {
    primary: "border-primary/40 text-primary bg-primary/5",
    secondary: "border-secondary/40 text-secondary bg-secondary/5",
    muted: "border-border text-muted-foreground bg-muted/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${map[tone]}`}>
      {children}
    </span>
  );
}

/* ---------- nav ---------- */

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3">
          <div className="corner-brackets relative h-9 w-9 grid place-items-center font-mono text-sm font-bold text-primary text-glow">
            GL
          </div>
          <div className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:block">
            <div className="text-primary">GIORGI LOMIDZE</div>
            <div>SR. FRONTEND / TS ENGINEER</div>
          </div>
        </a>
        <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex">
          <a href="#showcase" className="hover:text-primary">3D / Three.js</a>
          <a href="#architecture" className="hover:text-primary">Architecture</a>
          <a href="#stack" className="hover:text-primary">Stack</a>
          <a href="#fit" className="hover:text-primary">Planner 5D Fit</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </nav>
        <a
          href="#contact"
          className="border border-primary bg-primary/10 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          &gt; init_contact
        </a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const [fps, setFps] = useState(144);
  useEffect(() => {
    const i = setInterval(() => setFps(140 + Math.floor(Math.random() * 8)), 700);
    return () => clearInterval(i);
  }, []);

  return (
    <div id="top" className="relative">
      <Bracket label="// SECTOR_00 // PRIMARY" code="VIEWPORT_01">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          {/* left */}
          <div>
            <div className="mb-6 font-mono text-xs text-primary">
              &gt;_ // engineer. builder. problem solver.
            </div>
            <h1 className="font-display text-6xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">
              <span className="block text-foreground">GIORGI</span>
              <span className="block text-primary text-glow">LOMIDZE<span className="blink text-primary">_</span></span>
            </h1>
            <div className="mt-6 max-w-md border-l-2 border-primary/60 pl-4 font-mono text-sm text-muted-foreground">
              Senior Frontend / TypeScript Engineer —{" "}
              <span className="text-primary">Architecting 3D Interfaces</span>.
              I ship production React + Three.js apps with DDD-shaped codebases.
            </div>

            <div className="mt-8 grid max-w-md gap-2">
              <MetaRow icon="◎" k="LAT / LON" v="41.7151° N, 44.8271° E" />
              <MetaRow icon="◉" k="STATUS" v={<span className="text-primary">AVAILABLE</span>} />
              <MetaRow icon="◐" k="ROLE" v="SR. FRONTEND ENGINEER" />
              <MetaRow icon="◇" k="FOCUS" v="3D INTERFACES • PERFORMANCE • DX" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#showcase"
                className="group inline-flex items-center gap-2 border border-primary bg-primary/10 px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View work <span className="transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-secondary/60 px-5 py-3 font-mono text-xs uppercase tracking-widest text-secondary hover:bg-secondary/10 transition-colors"
              >
                Download CV ↓
              </a>
            </div>
          </div>

          {/* right viewport */}
          <Viewport fps={fps} />
        </div>
      </Bracket>
    </div>
  );
}

function MetaRow({ icon, k, v }: { icon: string; k: string; v: React.ReactNode }) {
  return (
    <div className="panel corner-brackets flex items-center justify-between px-4 py-2 font-mono text-xs">
      <span className="flex items-center gap-3">
        <span className="text-primary">{icon}</span>
        <span className="text-muted-foreground uppercase tracking-widest">{k}</span>
      </span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}

/* ---------- viewport with star destroyer ---------- */

function Viewport({ fps }: { fps: number }) {
  return (
    <div className="panel corner-brackets relative overflow-hidden">
      {/* HUD top */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">VIEWPORT_01</span>
        <span>MODEL: IMPERIAL STAR DESTROYER</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> LIVE
        </span>
      </div>

      <div className="relative aspect-[4/3] w-full">
        {/* grid bg */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.06,
          }}
        />
        {/* scanning bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/60 scan-bar" />

        <StarDestroyerSVG />

        {/* annotation labels */}
        <Annot className="left-[18%] top-[18%]" tone="primary" label="React" sub="UI Components" />
        <Annot className="right-[8%] top-[14%]" tone="primary" label="DDD" sub="Domain Modeling" />
        <Annot className="right-[6%] top-[58%]" tone="secondary" label="Three.js" sub="Scene / WebGL" />
        <Annot className="left-[22%] bottom-[18%]" tone="secondary" label="TypeScript" sub="Type safety" />

        {/* axis */}
        <div className="absolute bottom-3 left-3 font-mono text-[10px] text-muted-foreground">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <line x1="6" y1="42" x2="42" y2="42" stroke="oklch(0.65 0.25 25)" strokeWidth="1.5" />
            <line x1="6" y1="42" x2="6" y2="6" stroke="var(--primary)" strokeWidth="1.5" />
            <line x1="6" y1="42" x2="22" y2="26" stroke="var(--secondary)" strokeWidth="1.5" />
            <text x="44" y="42" fill="oklch(0.65 0.25 25)" fontSize="8">X</text>
            <text x="2" y="6" fill="var(--primary)" fontSize="8">Z</text>
            <text x="22" y="22" fill="var(--secondary)" fontSize="8">Y</text>
          </svg>
        </div>

        {/* HUD telemetry */}
        <div className="panel absolute right-3 top-3 w-44 p-3 font-mono text-[10px]">
          <div className="mb-1 flex items-center justify-between text-muted-foreground">
            <span>LIVE TELEMETRY</span>
            <span className="text-primary">●</span>
          </div>
          <Row k="FPS" v={`${fps}`} />
          <Row k="FRAME" v="6.94 ms" />
          <Row k="DRAW" v="1,284" />
          <Row k="TRIS" v="2.36 M" />
          <Row k="MEM" v="512 MB" />
        </div>
      </div>

      {/* bottom toolbar */}
      <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex gap-3">
          <span className="text-primary">⊕ orbit</span>
          <span>✋ pan</span>
          <span>⟳ reset</span>
        </div>
        <span>BLUEPRINT MODE</span>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-foreground/90">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-primary">{v}</span>
    </div>
  );
}

function Annot({
  className,
  tone,
  label,
  sub,
}: {
  className: string;
  tone: "primary" | "secondary";
  label: string;
  sub: string;
}) {
  const color = tone === "primary" ? "border-primary text-primary" : "border-secondary text-secondary";
  return (
    <div className={`absolute ${className} flex items-center gap-2 font-mono text-[10px]`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "primary" ? "bg-primary" : "bg-secondary"}`} />
      <div className={`border ${color} bg-background/70 px-2 py-1 backdrop-blur`}>
        <div className="font-semibold">{label}</div>
        <div className="text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function StarDestroyerSVG() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="absolute inset-0 h-full w-full"
      fill="none"
      stroke="var(--primary)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* perspective ground ellipse */}
      <ellipse cx="400" cy="430" rx="360" ry="40" stroke="var(--primary)" strokeOpacity="0.2" strokeDasharray="2 4" />
      {/* main triangular hull (top view in perspective) */}
      <polygon points="80,360 720,360 560,260" stroke="var(--primary)" strokeOpacity="0.9" />
      {/* hull bottom */}
      <polygon points="80,360 720,360 560,400" stroke="var(--primary)" strokeOpacity="0.6" />
      {/* deck panels */}
      <line x1="120" y1="355" x2="540" y2="280" />
      <line x1="160" y1="350" x2="540" y2="290" />
      <line x1="200" y1="346" x2="540" y2="300" />
      <line x1="240" y1="342" x2="540" y2="310" />
      <line x1="280" y1="338" x2="540" y2="320" />
      <line x1="320" y1="333" x2="540" y2="330" />
      <line x1="360" y1="329" x2="555" y2="335" />
      <line x1="400" y1="325" x2="565" y2="338" />
      <line x1="440" y1="320" x2="580" y2="342" />
      <line x1="480" y1="316" x2="600" y2="346" />
      <line x1="520" y1="312" x2="640" y2="350" />
      <line x1="560" y1="308" x2="680" y2="354" />
      {/* longitudinal */}
      <line x1="80" y1="360" x2="720" y2="360" stroke="var(--primary)" strokeOpacity="0.7" />
      <line x1="200" y1="345" x2="700" y2="358" />
      <line x1="320" y1="335" x2="690" y2="356" />
      <line x1="430" y1="325" x2="685" y2="354" />
      {/* command tower */}
      <polygon points="470,280 540,260 555,275 510,300 470,300" stroke="var(--primary)" strokeOpacity="0.95" />
      <rect x="495" y="248" width="38" height="14" stroke="var(--primary)" strokeOpacity="0.95" />
      <line x1="514" y1="240" x2="514" y2="248" />
      <line x1="514" y1="232" x2="514" y2="240" stroke="var(--primary)" strokeOpacity="0.6" />
      {/* sensor balls */}
      <circle cx="500" cy="244" r="4" />
      <circle cx="528" cy="244" r="4" />
      {/* tower hatching */}
      <line x1="478" y1="290" x2="540" y2="278" />
      <line x1="486" y1="295" x2="548" y2="282" />
      {/* engine cluster */}
      <circle cx="660" cy="370" r="14" />
      <circle cx="660" cy="370" r="9" stroke="var(--primary)" strokeOpacity="0.6" />
      <circle cx="660" cy="370" r="4" stroke="var(--primary)" strokeOpacity="1" />
      <circle cx="690" cy="372" r="10" />
      <circle cx="690" cy="372" r="6" stroke="var(--primary)" strokeOpacity="0.6" />
      <circle cx="700" cy="378" r="6" />
      <circle cx="700" cy="378" r="3" stroke="var(--primary)" strokeOpacity="0.6" />
      {/* hangar bay slit */}
      <rect x="100" y="356" width="40" height="3" stroke="var(--secondary)" />
      {/* trench detail */}
      <line x1="260" y1="358" x2="540" y2="345" stroke="var(--primary)" strokeOpacity="0.5" />
      <line x1="260" y1="362" x2="540" y2="350" stroke="var(--primary)" strokeOpacity="0.5" />
      {/* measurements */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--muted-foreground)">
        <line x1="80" y1="450" x2="720" y2="450" stroke="currentColor" strokeOpacity="0.4" />
        <line x1="80" y1="446" x2="80" y2="454" stroke="currentColor" strokeOpacity="0.4" />
        <line x1="720" y1="446" x2="720" y2="454" stroke="currentColor" strokeOpacity="0.4" />
        <text x="380" y="465" textAnchor="middle">L = 1,600 m</text>
      </g>
    </svg>
  );
}

/* ---------- 3D / Three.js Showcase ---------- */

function Showcase() {
  const [scan, setScan] = useState(true);
  const [fps, setFps] = useState(144);
  useEffect(() => {
    const i = setInterval(() => setFps(140 + Math.floor(Math.random() * 8)), 600);
    return () => clearInterval(i);
  }, []);
  return (
    <div id="showcase" className="border-t border-border/40">
      <Bracket label="// SECTOR_01 // 3D / THREE.JS SHOWCASE" code="BLUEPRINT_002">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Architecture <span className="text-primary text-glow">Scan Mode</span>
            </h2>
            <p className="mt-2 max-w-xl font-mono text-sm text-muted-foreground">
              Hover the schematic to inspect subsystems mapped to a real codebase. Each module is a
              bounded context, every annotation a contract.
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <span className="text-muted-foreground">Architecture Scan Mode</span>
            <button
              onClick={() => setScan((s) => !s)}
              className={`relative h-6 w-12 rounded-full border transition-colors ${
                scan ? "border-primary bg-primary/30" : "border-border bg-muted"
              }`}
              aria-pressed={scan}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${
                  scan ? "left-6 bg-primary" : "left-0.5 bg-muted-foreground"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="panel corner-brackets relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">VIEWPORT: IMPERIAL STAR DESTROYER</span>
              <span>SYSTEM BLUEPRINT</span>
            </div>
            <div className="relative aspect-[16/10]">
              <StarDestroyerSVG />
              {scan && (
                <>
                  <Annot className="left-[44%] top-[18%]" tone="primary" label="Command Tower" sub="→ Tenant Module" />
                  <Annot className="right-[6%] top-[40%]" tone="primary" label="Engine Thrusters" sub="→ Render Pipeline" />
                  <Annot className="left-[10%] top-[60%]" tone="secondary" label="Hangar Bay" sub="→ Asset Loader" />
                  <Annot className="right-[20%] bottom-[16%]" tone="secondary" label="Hull Plating" sub="→ Component Layer" />
                  <Annot className="left-[40%] bottom-[10%]" tone="primary" label="Shield Grid" sub="→ State Store" />
                </>
              )}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/60 scan-bar" />
            </div>
            <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>TIMELINE: SYSTEM ASSEMBLY • 00:23.47 / 01:30.00</span>
              <span className="text-primary">▶ playing</span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="panel corner-brackets p-4">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span>Performance Monitor</span>
                <span className="flex items-center gap-1.5 text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Live
                </span>
              </div>
              <Metric label="FPS" value={`${fps}`} max="200" />
              <Metric label="Draw Calls" value="1,284" max="2K" />
              <Metric label="Triangles" value="2.36M" max="4M" tone="secondary" />
              <Metric label="Memory" value="512 MB" max="1 GB" tone="secondary" />
              <Metric label="Frame Time" value="6.94 ms" max="16 ms" />
            </div>
            <div className="panel corner-brackets p-4 font-mono text-[11px]">
              <div className="mb-2 uppercase tracking-widest text-muted-foreground">Renderer Spec</div>
              <SpecRow k="Renderer" v="WebGL 2 (Three.js r165)" />
              <SpecRow k="Resolution" v="1920×1080 (DPR 1)" />
              <SpecRow k="Anti-Aliasing" v="TAA" />
              <SpecRow k="Shadows" v="PCF Soft (High)" />
              <SpecRow k="Post FX" v="ON" />
            </div>
          </div>
        </div>
      </Bracket>
    </div>
  );
}

function Metric({ label, value, max, tone = "primary" }: { label: string; value: string; max: string; tone?: "primary" | "secondary" }) {
  const c = tone === "primary" ? "text-primary" : "text-secondary";
  const bg = tone === "primary" ? "bg-primary" : "bg-secondary";
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1 flex justify-between text-muted-foreground">
        <span>{label}</span>
        <span className={c}>{value} <span className="text-muted-foreground">/ {max}</span></span>
      </div>
      <div className="h-1 w-full bg-muted">
        <div className={`h-full ${bg}`} style={{ width: `${30 + Math.random() * 50}%` }} />
      </div>
    </div>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/40 py-1 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-foreground/90">{v}</span>
    </div>
  );
}

/* ---------- DDD architecture ---------- */

function Architecture() {
  const layers = [
    { name: "UI Layer", items: ["React Components", "Routing", "Animations"], tone: "secondary" as const },
    { name: "Application", items: ["Use Cases", "Commands / Queries", "Orchestration"], tone: "primary" as const },
    { name: "Domain", items: ["Aggregates", "Entities", "Value Objects"], tone: "primary" as const },
    { name: "Infrastructure", items: ["HTTP / WebSocket", "Persistence", "Adapters"], tone: "secondary" as const },
  ];
  return (
    <div id="architecture" className="border-t border-border/40">
      <Bracket label="// SECTOR_02 // DDD ARCHITECTURE" code="BLUEPRINT_003">
        <h2 className="mb-2 font-display text-3xl font-bold md:text-5xl">
          Layered <span className="text-primary text-glow">Domain</span> Architecture
        </h2>
        <p className="mb-8 max-w-2xl font-mono text-sm text-muted-foreground">
          A codebase shaped like a system schematic — clear contracts between layers, no leaking
          concerns, and a domain that survives framework changes.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          {layers.map((l, i) => (
            <div key={l.name} className="panel corner-brackets relative p-4">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                <span className={l.tone === "primary" ? "text-primary" : "text-secondary"}>
                  L{i + 1} / {l.name}
                </span>
                <span className="text-muted-foreground">0{i + 1}</span>
              </div>
              <ul className="space-y-1.5 font-mono text-xs text-foreground/90">
                {l.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className={l.tone === "primary" ? "text-primary" : "text-secondary"}>▸</span>
                    {it}
                  </li>
                ))}
              </ul>
              {i < layers.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 font-mono text-primary md:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </Bracket>
    </div>
  );
}

/* ---------- stack ---------- */

function Stack() {
  const stack = [
    "TypeScript", "React 19", "Three.js", "React Three Fiber", "Next.js",
    "TanStack Start", "Tailwind v4", "Zustand", "Vite", "Vitest",
    "Playwright", "WebGL 2", "GLSL", "Node.js", "tRPC",
    "WebSocket", "Zod", "DDD", "Storybook", "GraphQL",
  ];
  return (
    <div id="stack" className="border-t border-border/40">
      <Bracket label="// SECTOR_03 // TECH STACK" code="BLUEPRINT_004">
        <h2 className="mb-8 font-display text-3xl font-bold md:text-5xl">
          Parts <span className="text-primary text-glow">Diagram</span>
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {stack.map((s, i) => (
            <div
              key={s}
              className="panel corner-brackets flex items-center justify-between px-3 py-2 font-mono text-xs"
            >
              <span className="text-foreground/90">{s}</span>
              <span className="text-muted-foreground">P{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </Bracket>
    </div>
  );
}

/* ---------- Planner 5D fit ---------- */

function Fit() {
  const fits = [
    {
      title: "3D Real-Time Rendering",
      copy: "Years shipping React + Three.js. Comfortable in scene graphs, custom shaders, instancing, LODs and frame-budget triage.",
      tags: ["Three.js", "R3F", "WebGL 2", "GLSL"],
    },
    {
      title: "Cross-Device Sync",
      copy: "Designed CRDT and event-sourced sync layers. Optimistic UI with conflict resolution that survives offline edits.",
      tags: ["WebSocket", "CRDT", "Event Sourcing"],
    },
    {
      title: "Performance Engineering",
      copy: "Profiling pipelines: TTI, LCP, INP, GPU frame time. I treat 60 FPS as a contract, not a goal.",
      tags: ["Profiling", "Web Vitals", "GPU"],
    },
    {
      title: "Design-Lab DX",
      copy: "Type-safe, well-bounded modules. Storybook + visual diff. New engineers ship in days, not weeks.",
      tags: ["TypeScript", "DDD", "Storybook"],
    },
  ];
  return (
    <div id="fit" className="border-t border-border/40">
      <Bracket label="// SECTOR_04 // PLANNER 5D FIT" code="MISSION_BRIEF">
        <h2 className="mb-2 font-display text-3xl font-bold md:text-5xl">
          Why I fit <span className="text-primary text-glow">Planner 5D</span>
        </h2>
        <p className="mb-8 max-w-2xl font-mono text-sm text-muted-foreground">
          A 3D / home-design product needs frontends that behave like CAD tools — fast, correct,
          and architecturally honest. That's the work I've been doing for years.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {fits.map((f) => (
            <div key={f.title} className="panel corner-brackets p-5">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="text-primary">FIT_CARD</span>
                <span>● aligned</span>
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mb-4 font-mono text-sm text-muted-foreground">{f.copy}</p>
              <div className="flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Bracket>
    </div>
  );
}

/* ---------- terminal notes ---------- */

function Notes() {
  return (
    <div className="border-t border-border/40">
      <Bracket label="// SECTOR_05 // APPLICATION NOTES" code="TERM_01">
        <div className="panel corner-brackets overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2 font-mono text-[11px] text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span>~/giorgi/notes-to-planner-5d.md</span>
            <span>UTF-8 · TS</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-foreground/90">
{`> cat notes-to-planner-5d.md

# Hello, Planner 5D team 👋

I've been following Planner 5D for a long time and the product is exactly
where I want to ship code. A few notes from my side:

  ${chalk("[1]")} I treat 3D performance as a contract — frame time first.
  ${chalk("[2]")} I prefer DDD-shaped frontends. The domain outlives React.
  ${chalk("[3]")} I love CAD-grade UX: keyboard-first, snap, undo, history.
  ${chalk("[4]")} TypeScript everywhere. Zod at every boundary.

Happy to walk through architecture, share a code sample, or pair on a
real Planner 5D scene.

${chalk("→")} giorgi.lomidze@example.com
${chalk("→")} github.com/giorgi-lomidze
${chalk("→")} linkedin.com/in/giorgi-lomidze
`}
            <span className="text-primary blink">█</span>
          </pre>
        </div>
      </Bracket>
    </div>
  );
}

function chalk(s: string) {
  return s; // placeholder — visual highlight is via CSS-applied font color
}

/* ---------- contact ---------- */

function Contact() {
  return (
    <div id="contact" className="border-t border-border/40">
      <Bracket label="// SECTOR_06 // INIT CONTACT" code="HANDSHAKE">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Open a <span className="text-primary text-glow">channel</span>.
            </h2>
            <p className="mt-3 max-w-md font-mono text-sm text-muted-foreground">
              Best reached by email. I usually reply within a working day.
            </p>
            <div className="mt-6 grid max-w-md gap-2">
              <ContactRow k="EMAIL" v="giorgi.lomidze@example.com" href="mailto:giorgi.lomidze@example.com" />
              <ContactRow k="GITHUB" v="github.com/giorgi-lomidze" href="https://github.com" />
              <ContactRow k="LINKEDIN" v="linkedin.com/in/giorgi-lomidze" href="https://linkedin.com" />
              <ContactRow k="TIMEZONE" v="UTC+04:00 · Tbilisi, GEO" />
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const subject = encodeURIComponent("Planner 5D — opportunity");
              const body = encodeURIComponent(`From: ${f.get("name")} <${f.get("email")}>\n\n${f.get("msg")}`);
              window.location.href = `mailto:giorgi.lomidze@example.com?subject=${subject}&body=${body}`;
            }}
            className="panel corner-brackets p-5"
          >
            <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-primary">
              &gt; transmit_message
            </div>
            <Field name="name" label="Name" />
            <Field name="email" label="Email" type="email" />
            <Field name="msg" label="Message" textarea />
            <button
              type="submit"
              className="mt-2 w-full border border-primary bg-primary/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              ⟶ send_transmission
            </button>
          </form>
        </div>
      </Bracket>
    </div>
  );
}

function ContactRow({ k, v, href }: { k: string; v: string; href?: string }) {
  const Comp: any = href ? "a" : "div";
  return (
    <Comp
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="panel corner-brackets flex items-center justify-between px-4 py-2 font-mono text-xs hover:border-primary/60"
    >
      <span className="text-muted-foreground uppercase tracking-widest">{k}</span>
      <span className="text-primary">{v}</span>
    </Comp>
  );
}

function Field({ name, label, type = "text", textarea }: { name: string; label: string; type?: string; textarea?: boolean }) {
  const cls =
    "w-full border border-border bg-background/40 px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none";
  return (
    <label className="mb-3 block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        &gt; {label}
      </span>
      {textarea ? (
        <textarea name={name} required rows={4} className={cls} />
      ) : (
        <input name={name} required type={type} className={cls} />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
        <div>
          <span className="text-primary">GL_</span> · giorgi lomidze · sr. frontend / ts engineer
        </div>
        <div>© 2026 · Built like a blueprint, shipped like a product.</div>
      </div>
    </footer>
  );
}
