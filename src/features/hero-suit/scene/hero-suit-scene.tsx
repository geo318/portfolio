"use client";

import { Center, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SuitLoader } from "@/features/hero-suit/components/suit-loader";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";

const SUIT_MODEL_URL = "/models/rust_space_suit.glb";

export function HeroSuitScene() {
	const reducedMotion = useReducedMotionPreference();
	const compact = useCompactViewport();
	const [supported] = useState(() => {
		if (typeof document === "undefined") return true;
		const canvas = document.createElement("canvas");
		return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
	});

	if (!supported) {
		return <SuitFallback label="WebGL suit unavailable" />;
	}

	return (
		<div className="relative h-[430px] w-full min-w-0 overflow-visible sm:h-[540px] lg:h-[640px]">
			<div className="pointer-events-none absolute right-0 top-6 z-10 hidden border border-secondary/35 bg-background/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-secondary backdrop-blur-sm sm:block">
				Drag model
			</div>
			<Canvas
				camera={{
					position: compact ? [0, 0.08, 6.4] : [0, 0.1, 5.4],
					fov: compact ? 40 : 36,
				}}
				className="absolute inset-0 h-full w-full"
				dpr={[1, 1.5]}
				frameloop={reducedMotion ? "demand" : "always"}
				gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
				onCreated={({ gl }) => {
					gl.outputColorSpace = THREE.SRGBColorSpace;
					gl.toneMapping = THREE.ACESFilmicToneMapping;
					gl.toneMappingExposure = 1.55;
				}}
			>
				<ambientLight intensity={1.45} />
				<hemisphereLight
					args={["#d7f7ff", "#1b2130", 1.2]}
				/>
				<directionalLight
					color="#f8ffb8"
					intensity={5.2}
					position={[-2.5, 3, 4]}
				/>
				<directionalLight color="#ffffff" intensity={2.8} position={[2, 1.5, 3]} />
				<pointLight color="#39d7ff" intensity={24} position={[-3, -0.8, 3]} />
				<pointLight color="#9eff4f" intensity={12} position={[2.8, 1.8, 2.4]} />
				<Suspense fallback={<SuitCanvasLoader />}>
					<SuitRig compact={compact} reducedMotion={reducedMotion} />
				</Suspense>
				<OrbitControls
					enableDamping
					enablePan={false}
					enableZoom={false}
					maxPolarAngle={Math.PI / 1.55}
					minPolarAngle={Math.PI / 2.9}
					rotateSpeed={0.34}
				/>
			</Canvas>
		</div>
	);
}

function SuitCanvasLoader() {
	return (
		<Html center>
			<SuitLoader label="GLB sync" className="scale-90" />
		</Html>
	);
}

function SuitRig({
	compact,
	reducedMotion,
}: {
	compact: boolean;
	reducedMotion: boolean;
}) {
	const groupRef = useRef<THREE.Group>(null);
	const { scene } = useGLTF(SUIT_MODEL_URL);
	const scale = compact ? 1.12 : 1.36;

	useEffect(() => {
		scene.traverse((object) => {
			if ("isMesh" in object && object.isMesh) {
				const mesh = object as THREE.Mesh;
				mesh.frustumCulled = false;
			}
		});
	}, [scene]);

	useFrame(({ clock, pointer }) => {
		if (reducedMotion || !groupRef.current) return;
		const elapsed = clock.elapsedTime;
		groupRef.current.rotation.y = pointer.x * 0.1 + Math.sin(elapsed * 0.24) * 0.035;
		groupRef.current.rotation.x = pointer.y * -0.055 + Math.sin(elapsed * 0.31) * 0.018;
		groupRef.current.position.y = Math.sin(elapsed * 0.48) * 0.035;
	});

	return (
		<group
			ref={groupRef}
			position={compact ? [0.06, -0.02, 0] : [0.48, 0.02, 0]}
			scale={scale}
		>
			<Center rotation={[0, -0.36, 0]}>
				<primitive object={scene} />
			</Center>
		</group>
	);
}

function useCompactViewport() {
	const [compact, setCompact] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.innerWidth < 640;
	});

	useEffect(() => {
		const update = () => setCompact(window.innerWidth < 640);
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return compact;
}

function SuitFallback({ label }: { label: string }) {
	return (
		<div className="grid h-[430px] place-items-center sm:h-[540px] lg:h-[640px]">
			<SuitLoader label={label} />
		</div>
	);
}

useGLTF.preload(SUIT_MODEL_URL);
