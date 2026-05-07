"use client";

import { Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { type DomainNode, domainEdges, domainNodes } from "@/features/three-lab/domain/domain-map";

type ViewMode = "blueprint" | "solid" | "wireframe";
type EdgePath = {
	id: string;
	points: THREE.Vector3[];
};

const modeLabels: Record<ViewMode, string> = {
	blueprint: "Blueprint",
	solid: "Solid",
	wireframe: "Wire",
};

export function DomainMapScene() {
	const [supported] = useState(() => {
		if (typeof document === "undefined") return true;
		const canvas = document.createElement("canvas");
		return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
	});
	const [reducedMotion, setReducedMotion] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	});
	const [mode, setMode] = useState<ViewMode>("blueprint");
	const [activeNodeId, setActiveNodeId] = useState("product");
	const [pulseEnabled, setPulseEnabled] = useState(true);
	const activeNode = domainNodes.find((node) => node.id === activeNodeId) ?? domainNodes[0];

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(query.matches);
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);

	if (!supported) {
		return <WebGLFallback />;
	}

	return (
		<div className="relative min-h-[640px] overflow-hidden bg-[#05070c] sm:min-h-[720px]">
			<div
				className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_68%_36%,rgb(57_215_255/0.18),transparent_32%),radial-gradient(circle_at_28%_62%,rgb(158_255_79/0.1),transparent_28%),linear-gradient(180deg,rgb(5_8_15/0.15),rgb(5_8_15/0.92))]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-0 z-10 opacity-30 scanline"
				aria-hidden="true"
			/>

			<div className="absolute left-4 top-4 z-20 max-w-[calc(100%-2rem)]">
				<div className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
					Domain Signal
				</div>
				<div className="flex max-w-3xl flex-wrap gap-2">
					{domainNodes.map((node) => (
						<button
							key={node.id}
							type="button"
							onClick={() => setActiveNodeId(node.id)}
							className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition ${
								activeNodeId === node.id
									? "border-primary bg-primary/15 text-primary shadow-[0_0_26px_rgb(158_255_79/0.14)]"
									: "border-border/80 bg-background/55 text-muted-foreground backdrop-blur hover:border-secondary/50 hover:text-secondary"
							}`}
						>
							{node.label}
						</button>
					))}
				</div>
			</div>

			<div className="absolute right-4 top-4 z-20 hidden w-72 border border-secondary/30 bg-background/70 p-4 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur md:block">
				<div className="mb-4 flex items-center justify-between text-secondary">
					<span>Render Budget</span>
					<span>Live</span>
				</div>
				<div className="grid gap-2 text-muted-foreground">
					<Metric label="Lazy boundary" value="Dynamic" />
					<Metric label="Motion guard" value={reducedMotion ? "Reduce" : "Auto"} />
					<Metric label="GPU cleanup" value="Dispose" />
					<Metric label="Interaction" value="Orbit" />
				</div>
			</div>

			<Canvas
				camera={{ position: [0.15, 1.15, 7.2], fov: 42 }}
				dpr={[1, 1.55]}
				frameloop={reducedMotion ? "demand" : "always"}
				gl={{ antialias: true, powerPreference: "high-performance" }}
				className="absolute inset-0 h-full!"
			>
				<color attach="background" args={["#05070c"]} />
				<fog attach="fog" args={["#05070c", 6.8, 12]} />
				<ambientLight intensity={0.52} />
				<directionalLight position={[1.5, 4.5, 3.5]} intensity={2.4} color="#dfffc4" />
				<pointLight position={[-3.5, 1.8, 3.2]} intensity={18} color="#9eff4f" />
				<pointLight position={[3.4, 2.4, 2.4]} intensity={16} color="#39d7ff" />
				<DomainMap
					activeNodeId={activeNodeId}
					mode={mode}
					pulseEnabled={pulseEnabled}
					reducedMotion={reducedMotion}
					setActiveNodeId={setActiveNodeId}
				/>
				<OrbitControls
					enablePan={false}
					enableZoom={false}
					minPolarAngle={Math.PI / 3.7}
					maxPolarAngle={Math.PI / 1.75}
					rotateSpeed={0.24}
				/>
			</Canvas>

			<div className="absolute bottom-4 left-4 z-20 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
				{(["blueprint", "solid", "wireframe"] as const).map((nextMode) => (
					<button
						key={nextMode}
						type="button"
						onClick={() => setMode(nextMode)}
						className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
							mode === nextMode
								? "border-primary bg-primary/15 text-primary"
								: "border-border bg-background/65 text-muted-foreground backdrop-blur hover:text-foreground"
						}`}
					>
						{modeLabels[nextMode]}
					</button>
				))}
				<button
					type="button"
					onClick={() => setPulseEnabled((current) => !current)}
					className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
						pulseEnabled
							? "border-secondary bg-secondary/15 text-secondary"
							: "border-border bg-background/65 text-muted-foreground backdrop-blur hover:text-foreground"
					}`}
				>
					Pulse {pulseEnabled ? "On" : "Off"}
				</button>
			</div>

			<div className="absolute bottom-4 right-4 z-20 hidden w-[21.5rem] max-w-[34vw] border border-primary/35 bg-background/75 p-4 backdrop-blur lg:block">
				<div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
					<span className="text-primary">Active Domain</span>
					<span className="text-muted-foreground">
						{String(domainNodes.findIndex((node) => node.id === activeNode.id) + 1).padStart(
							2,
							"0",
						)}
					</span>
				</div>
				<h3 className="text-2xl font-semibold text-foreground">{activeNode.label}</h3>
				<p className="mt-2 text-sm leading-7 text-muted-foreground">{activeNode.description}</p>
			</div>
		</div>
	);
}

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between border border-border/80 bg-background/55 px-3 py-2">
			<span>{label}</span>
			<span className="text-primary">{value}</span>
		</div>
	);
}

function DomainMap({
	activeNodeId,
	mode,
	pulseEnabled,
	reducedMotion,
	setActiveNodeId,
}: {
	activeNodeId: string;
	mode: ViewMode;
	pulseEnabled: boolean;
	reducedMotion: boolean;
	setActiveNodeId: (nodeId: string) => void;
}) {
	const nodeById = useMemo(() => new Map(domainNodes.map((node) => [node.id, node])), []);
	const edgePaths = useMemo(
		() =>
			domainEdges.flatMap(([fromId, toId], index) => {
				const fromNode = nodeById.get(fromId);
				const toNode = nodeById.get(toId);

				if (!fromNode || !toNode) return [];

				const from = new THREE.Vector3(...fromNode.position);
				const to = new THREE.Vector3(...toNode.position);
				return {
					id: `${fromId}-${toId}`,
					points: makeEdgePath(from, to, index),
				};
			}),
		[nodeById],
	);

	return (
		<group rotation={[0.03, -0.18, 0]} position={[0, -0.18, 0]}>
			<OrbitalRings />
			<BlueprintFloor />
			{edgePaths.map((edge, index) => (
				<Line
					key={edge.id}
					points={edge.points}
					color={index % 3 === 0 ? "#9eff4f" : "#39d7ff"}
					lineWidth={1.35}
					transparent
					opacity={0.48}
				/>
			))}
			{domainNodes.map((node) => (
				<DomainNodeMesh
					active={activeNodeId === node.id}
					key={node.id}
					mode={mode}
					node={node}
					setActiveNodeId={setActiveNodeId}
				/>
			))}
			{!reducedMotion && pulseEnabled && <EventPulses paths={edgePaths} />}
			<CameraInvalidator activeNodeId={activeNodeId} mode={mode} />
		</group>
	);
}

function makeEdgePath(from: THREE.Vector3, to: THREE.Vector3, index: number) {
	const control = from
		.clone()
		.lerp(to, 0.5)
		.add(new THREE.Vector3(0, 0.26 + (index % 3) * 0.14, index % 2 ? 0.18 : -0.18));
	const curve = new THREE.QuadraticBezierCurve3(from, control, to);
	return curve.getPoints(24);
}

function DomainNodeMesh({
	active,
	node,
	mode,
	setActiveNodeId,
}: {
	active: boolean;
	node: DomainNode;
	mode: ViewMode;
	setActiveNodeId: (nodeId: string) => void;
}) {
	const [hovered, setHovered] = useState(false);
	const geometry = useMemo(
		() => new THREE.IcosahedronGeometry(node.kind === "core" ? 0.28 : 0.22, 2),
		[node.kind],
	);
	const material = useMemo(() => {
		const color = getNodeColor(node.kind);
		return new THREE.MeshStandardMaterial({
			color,
			emissive: color,
			emissiveIntensity: active ? 0.96 : mode === "solid" ? 0.32 : 0.68,
			metalness: mode === "solid" ? 0.68 : 0.28,
			roughness: 0.24,
			wireframe: mode !== "solid",
			transparent: true,
			opacity: mode === "blueprint" ? 0.88 : 1,
		});
	}, [active, mode, node.kind]);

	useEffect(() => {
		return () => {
			geometry.dispose();
			material.dispose();
		};
	}, [geometry, material]);

	return (
		<group position={node.position}>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: R3F mesh pointer handlers are canvas interactions, not DOM controls. */}
			<mesh
				geometry={geometry}
				material={material}
				scale={active ? 1.45 : hovered ? 1.22 : 1}
				onClick={() => setActiveNodeId(node.id)}
				onPointerEnter={() => setHovered(true)}
				onPointerLeave={() => setHovered(false)}
			/>
			{active || hovered ? (
				<group scale={active ? 1.18 : 1}>
					<mesh rotation={[Math.PI / 2, 0, 0]}>
						<torusGeometry args={[0.42, 0.01, 8, 96]} />
						<meshBasicMaterial
							color={active ? "#9eff4f" : "#39d7ff"}
							transparent
							opacity={active ? 0.74 : 0.46}
						/>
					</mesh>
					<mesh rotation={[0, Math.PI / 2, 0]}>
						<torusGeometry args={[0.55, 0.006, 8, 96]} />
						<meshBasicMaterial
							color={active ? "#39d7ff" : "#9eff4f"}
							transparent
							opacity={active ? 0.42 : 0.28}
						/>
					</mesh>
				</group>
			) : null}
		</group>
	);
}

function getNodeColor(kind: DomainNode["kind"]) {
	if (kind === "integration") return "#ff2bd6";
	if (kind === "commerce") return "#39d7ff";
	return "#9eff4f";
}

function EventPulses({ paths }: { paths: EdgePath[] }) {
	const refs = useRef<THREE.Mesh[]>([]);
	const geometry = useMemo(() => new THREE.SphereGeometry(0.045, 14, 14), []);
	const material = useMemo(
		() =>
			new THREE.MeshBasicMaterial({
				color: "#e7ffb8",
				transparent: true,
				opacity: 0.94,
			}),
		[],
	);

	useFrame(({ clock }) => {
		const elapsed = clock.elapsedTime;
		refs.current.forEach((mesh, index) => {
			const path = paths[index % paths.length]?.points;
			if (!path) return;

			const progress = (elapsed * 0.18 + index * 0.11) % 1;
			const scaled = progress * (path.length - 1);
			const current = Math.floor(scaled);
			const next = Math.min(current + 1, path.length - 1);
			mesh.position.lerpVectors(path[current], path[next], scaled - current);
		});
	});

	useEffect(() => {
		return () => {
			geometry.dispose();
			material.dispose();
		};
	}, [geometry, material]);

	return (
		<group>
			{paths.flatMap((path, pathIndex) =>
				[0, 1].map((offset) => (
					<mesh
						key={`${path.id}-${offset}`}
						ref={(mesh) => {
							if (mesh) refs.current[pathIndex * 2 + offset] = mesh;
						}}
						geometry={geometry}
						material={material}
					/>
				)),
			)}
		</group>
	);
}

function OrbitalRings() {
	return (
		<group rotation={[Math.PI / 2.55, 0.08, -0.28]} position={[0, -0.2, -0.08]}>
			{[2.1, 3.1, 4.05].map((radius, index) => (
				<mesh key={radius}>
					<torusGeometry args={[radius, 0.006, 8, 180]} />
					<meshBasicMaterial
						color={index === 1 ? "#39d7ff" : "#9eff4f"}
						transparent
						opacity={index === 1 ? 0.2 : 0.13}
					/>
				</mesh>
			))}
		</group>
	);
}

function BlueprintFloor() {
	const grid = useMemo(() => new THREE.GridHelper(8, 28, "#39d7ff", "#182f38"), []);

	useEffect(() => {
		return () => {
			grid.geometry.dispose();
			const materials = Array.isArray(grid.material) ? grid.material : [grid.material];

			// biome-ignore lint: This is the correct way to dispose of materials in Three.js
			materials.forEach((material) => material.dispose());
		};
	}, [grid]);

	return <primitive object={grid} position={[0, -2.18, 0]} rotation={[0, 0, 0]} />;
}

function CameraInvalidator({ activeNodeId, mode }: { activeNodeId: string; mode: ViewMode }) {
	const { invalidate } = useThree();

	useEffect(() => {
		const invalidationKey = `${activeNodeId}:${mode}`;
		void invalidationKey;
		invalidate();
	}, [activeNodeId, invalidate, mode]);

	return null;
}

function WebGLFallback() {
	return (
		<div className="blueprint-grid grid min-h-[640px] place-items-center p-6 sm:min-h-[720px]">
			<div className="max-w-md border border-secondary/50 bg-background/85 p-5 font-mono text-sm leading-7 text-muted-foreground">
				<div className="mb-2 uppercase tracking-[0.18em] text-secondary">WebGL unavailable</div>
				This device/browser cannot initialize WebGL. The lab still keeps the static notes and
				fallback boundary available.
			</div>
		</div>
	);
}
