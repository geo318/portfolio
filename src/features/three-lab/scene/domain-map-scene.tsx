"use client";

import { Html, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
	type DomainNode,
	domainEdges,
	domainNodes,
} from "@/features/three-lab/domain/domain-map";

type ViewMode = "blueprint" | "solid" | "wireframe";

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
	const [activeNodeId, setActiveNodeId] = useState("tenant");
	const [pulseEnabled, setPulseEnabled] = useState(true);
	const activeNode =
		domainNodes.find((node) => node.id === activeNodeId) ?? domainNodes[0];

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
		<div className="relative min-h-[520px] overflow-hidden">
			<div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
				{(["blueprint", "solid", "wireframe"] as const).map((nextMode) => (
					<button
						key={nextMode}
						type="button"
						onClick={() => setMode(nextMode)}
						className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
							mode === nextMode
								? "border-primary bg-primary/15 text-primary"
								: "border-border bg-background/70 text-muted-foreground hover:text-foreground"
						}`}
					>
						{nextMode}
					</button>
				))}
				<button
					type="button"
					onClick={() => setPulseEnabled((current) => !current)}
					className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
						pulseEnabled
							? "border-secondary bg-secondary/15 text-secondary"
							: "border-border bg-background/70 text-muted-foreground hover:text-foreground"
					}`}
				>
					WebSocket pulse
				</button>
			</div>
			<div className="absolute right-4 top-4 z-10 hidden w-64 border border-primary/35 bg-background/85 p-3 font-mono text-[10px] leading-5 text-muted-foreground backdrop-blur sm:block">
				<div className="mb-1 uppercase tracking-[0.18em] text-primary">
					Active Domain
				</div>
				<div className="text-sm font-semibold text-foreground">
					{activeNode.label}
				</div>
				<div className="mt-1">{activeNode.description}</div>
			</div>

			<Canvas
				camera={{ position: [0, 0.9, 7.4], fov: 46 }}
				dpr={[1, 1.55]}
				frameloop={reducedMotion ? "demand" : "always"}
				gl={{ antialias: true, powerPreference: "high-performance" }}
				className="h-130!"
			>
				<color attach="background" args={["#070a0f"]} />
				<ambientLight intensity={0.75} />
				<pointLight position={[3, 5, 4]} intensity={24} color="#39d7ff" />
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
					minPolarAngle={Math.PI / 3.2}
					maxPolarAngle={Math.PI / 1.9}
					rotateSpeed={0.32}
				/>
			</Canvas>

			<div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border/70 bg-background/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
				<span className="text-primary">3D Domain Map</span>
				<span>Tenant → Product → Inventory → Auction → Order</span>
			</div>
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
	const nodeById = useMemo(
		() => new Map(domainNodes.map((node) => [node.id, node])),
		[],
	);
	const edgePoints = useMemo(
		() =>
			domainEdges.map(([from, to]) => [
				new THREE.Vector3(...nodeById.get(from)!.position),
				new THREE.Vector3(...nodeById.get(to)!.position),
			]),
		[nodeById],
	);

	return (
		<group>
			<BlueprintFloor />
			{edgePoints.map(([from, to], index) => (
				<Line
					key={`${from.toArray().join("-")}-${to.toArray().join("-")}`}
					points={[from, to]}
					color={index % 2 === 0 ? "#9eff4f" : "#39d7ff"}
					lineWidth={1.2}
					transparent
					opacity={0.54}
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
			{!reducedMotion && pulseEnabled && <EventPulses edges={edgePoints} />}
			<CameraInvalidator mode={mode} />
		</group>
	);
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
		() => new THREE.IcosahedronGeometry(node.kind === "core" ? 0.23 : 0.18, 1),
		[node.kind],
	);
	const material = useMemo(() => {
		const color =
			node.kind === "integration"
				? "#8b5cf6"
				: node.kind === "commerce"
					? "#39d7ff"
					: "#9eff4f";
		return new THREE.MeshStandardMaterial({
			color,
			emissive: color,
			emissiveIntensity: mode === "solid" ? 0.42 : 0.78,
			metalness: 0.35,
			roughness: 0.32,
			wireframe: mode !== "solid",
			transparent: true,
			opacity: mode === "blueprint" ? 0.86 : 1,
		});
	}, [mode, node.kind]);

	useEffect(() => {
		return () => {
			geometry.dispose();
			material.dispose();
		};
	}, [geometry, material]);

	return (
		<group position={node.position}>
			{/* biome-ignore lint: The mesh is most semantically correct here */}
			<mesh
				geometry={geometry}
				material={material}
				scale={active ? 1.38 : hovered ? 1.22 : 1}
				onClick={() => setActiveNodeId(node.id)}
				onPointerEnter={() => setHovered(true)}
				onPointerLeave={() => setHovered(false)}
				aria-label={`${node.label} domain: ${node.description}`}
			/>
			{active ? (
				<mesh scale={1.7}>
					<ringGeometry args={[0.17, 0.2, 36]} />
					<meshBasicMaterial
						color="#9eff4f"
						transparent
						opacity={0.68}
						side={THREE.DoubleSide}
					/>
				</mesh>
			) : null}
			<Html center distanceFactor={9} position={[0, -0.52, 0]}>
				<div className="whitespace-nowrap border border-primary/35 bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary backdrop-blur">
					{node.label}
				</div>
			</Html>
			{hovered ? (
				<Html distanceFactor={7} position={[0.2, 0.42, 0]}>
					<div className="w-48 border border-secondary/50 bg-background/90 p-3 font-mono text-[10px] leading-5 text-muted-foreground backdrop-blur">
						<div className="mb-1 uppercase tracking-[0.16em] text-secondary">
							{node.label}
						</div>
						{node.description}
					</div>
				</Html>
			) : null}
		</group>
	);
}

function EventPulses({ edges }: { edges: THREE.Vector3[][] }) {
	const refs = useRef<THREE.Mesh[]>([]);
	const geometry = useMemo(() => new THREE.SphereGeometry(0.045, 12, 12), []);
	const material = useMemo(
		() =>
			new THREE.MeshBasicMaterial({
				color: "#9eff4f",
				transparent: true,
				opacity: 0.92,
			}),
		[],
	);

	useFrame(({ clock }) => {
		const elapsed = clock.elapsedTime;
		refs.current.forEach((mesh, index) => {
			const edge = edges[index % edges.length];
			const progress = (elapsed * 0.22 + index * 0.17) % 1;
			mesh.position.lerpVectors(edge[0], edge[1], progress);
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
			{edges.map((edge, index) => (
				<mesh
					key={`${edge[0].toArray().join("-")}-${index}`}
					ref={(mesh) => {
						if (mesh) refs.current[index] = mesh;
					}}
					geometry={geometry}
					material={material}
				/>
			))}
		</group>
	);
}

function BlueprintFloor() {
	const grid = useMemo(
		() => new THREE.GridHelper(8, 24, "#39d7ff", "#1f3a42"),
		[],
	);

	useEffect(() => {
		return () => {
			grid.geometry.dispose();
			const materials = Array.isArray(grid.material)
				? grid.material
				: [grid.material];

			// biome-ignore lint: This is the correct way to dispose of materials in Three.js
			materials.forEach((material) => material.dispose());
		};
	}, [grid]);

	return (
		<primitive object={grid} position={[0, -2.2, 0]} rotation={[0, 0, 0]} />
	);
}

function CameraInvalidator({ mode }: { mode: ViewMode }) {
	const { invalidate } = useThree();

	// biome-ignore lint: Invalidate the scene on mode change to ensure material updates are reflected immediately
	useEffect(() => {
		invalidate();
	}, [invalidate, mode]);

	return null;
}

function WebGLFallback() {
	return (
		<div className="blueprint-grid grid min-h-130 place-items-center p-6">
			<div className="max-w-md border border-secondary/50 bg-background/85 p-5 font-mono text-sm leading-7 text-muted-foreground">
				<div className="mb-2 uppercase tracking-[0.18em] text-secondary">
					WebGL unavailable
				</div>
				This device/browser cannot initialize WebGL. Static architecture cards
				still describe the scene boundaries and performance choices.
			</div>
		</div>
	);
}
