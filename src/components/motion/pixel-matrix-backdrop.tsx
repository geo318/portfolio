"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";

const MATRIX_GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789";

type CursorState = {
	active: boolean;
	x: number;
	y: number;
	targetX: number;
	targetY: number;
};

type Star = {
	alpha: number;
	size: number;
	tint: "cyan" | "green" | "white" | "violet";
	twinkle: number;
	x: number;
	y: number;
	z: number;
};

type Planet = {
	color: string;
	glow: string;
	orbitX: number;
	orbitY: number;
	phase: number;
	radius: number;
	speed: number;
};

function seededRandom(seed: number) {
	let value = seed;
	return () => {
		value += 0x6d2b79f5;
		let result = Math.imul(value ^ (value >>> 15), value | 1);
		result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
		return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
	};
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function glyphFor(column: number, row: number, tick: number) {
	const index = Math.abs(
		(column * 13 + row * 17 + tick) % MATRIX_GLYPHS.length,
	);
	return MATRIX_GLYPHS[index];
}

export function PixelMatrixBackdrop() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const reducedMotion = useReducedMotionPreference();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		const cursor: CursorState = {
			active: false,
			x: window.innerWidth * 0.5,
			y: window.innerHeight * 0.5,
			targetX: window.innerWidth * 0.5,
			targetY: window.innerHeight * 0.5,
		};

		let width = 0;
		let height = 0;
		let dpr = 1;
		let frame = 0;
		let stars: Star[] = [];
		let planets: Planet[] = [];

		const buildScene = () => {
			const random = seededRandom(
				7001 + Math.round(width * 0.17) + Math.round(height * 0.29),
			);
			const starCount = width < 760 ? 340 : 640;

			stars = Array.from({ length: starCount }, () => {
				const tintRoll = random();
				return {
					alpha: 0.34 + random() * 0.66,
					size: 0.42 + random() * 1.8,
					tint:
						tintRoll > 0.88
							? "violet"
							: tintRoll > 0.66
								? "cyan"
								: tintRoll > 0.48
									? "green"
									: "white",
					twinkle: random() * Math.PI * 2,
					x: random() * 2.35 - 1.18,
					y: random() * 2.2 - 1.1,
					z: 0.34 + random() * 1.26,
				};
			});

			const scale = clamp(Math.min(width, height) / 780, 0.56, 1.2);
			planets = [
				{
					color: "rgba(248,255,79,0.94)",
					glow: "rgba(248,255,79,0.58)",
					orbitX: 150 * scale,
					orbitY: 42 * scale,
					phase: 2.76,
					radius: 1.7,
					speed: 0.052,
				},
				{
					color: "rgba(57,215,255,0.95)",
					glow: "rgba(57,215,255,0.5)",
					orbitX: 265 * scale,
					orbitY: 76 * scale,
					phase: 2.52,
					radius: 2.1,
					speed: 0.036,
				},
				{
					color: "rgba(158,255,79,0.9)",
					glow: "rgba(158,255,79,0.5)",
					orbitX: 430 * scale,
					orbitY: 126 * scale,
					phase: 2.84,
					radius: 2.45,
					speed: 0.026,
				},
				{
					color: "rgba(139,92,246,0.9)",
					glow: "rgba(139,92,246,0.46)",
					orbitX: 660 * scale,
					orbitY: 194 * scale,
					phase: 2.62,
					radius: 2.9,
					speed: 0.018,
				},
				{
					color: "rgba(248,250,252,0.86)",
					glow: "rgba(57,215,255,0.34)",
					orbitX: 920 * scale,
					orbitY: 270 * scale,
					phase: 2.48,
					radius: 3.15,
					speed: 0.012,
				},
			];
		};

		const resize = () => {
			dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			buildScene();
			render();
		};

		const drawCosmosBase = (sunX: number, sunY: number) => {
			const base = ctx.createLinearGradient(0, 0, width, height);
			base.addColorStop(0, "rgba(1,3,12,0.99)");
			base.addColorStop(0.36, "rgba(5,8,22,0.98)");
			base.addColorStop(0.72, "rgba(8,5,20,0.98)");
			base.addColorStop(1, "rgba(0,1,7,0.99)");
			ctx.fillStyle = base;
			ctx.fillRect(0, 0, width, height);

			const sunWash = ctx.createRadialGradient(
				sunX,
				sunY,
				0,
				sunX,
				sunY,
				Math.max(width, height) * 0.95,
			);
			sunWash.addColorStop(0, "rgba(248,255,190,0.24)");
			sunWash.addColorStop(0.08, "rgba(57,215,255,0.17)");
			sunWash.addColorStop(0.24, "rgba(139,92,246,0.1)");
			sunWash.addColorStop(0.58, "rgba(8,12,28,0.2)");
			sunWash.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = sunWash;
			ctx.fillRect(0, 0, width, height);
		};

		const drawStars = (time: number, pointerX: number, pointerY: number) => {
			ctx.save();
			ctx.globalCompositeOperation = "screen";

			for (const star of stars) {
				const depth = 1 / star.z;
				const px =
					width * 0.5 +
					star.x * width * 0.52 * depth -
					pointerX * (1.62 - star.z) * 62;
				const py =
					height * 0.5 +
					star.y * height * 0.5 * depth -
					pointerY * (1.62 - star.z) * 48;
				if (px < -6 || px > width + 6 || py < -6 || py > height + 6) continue;

				const pulse =
					0.72 +
					Math.sin(time * (0.45 + star.size * 0.12) + star.twinkle) * 0.28;
				const alpha = clamp(star.alpha * pulse * (1.7 - star.z), 0.08, 0.96);
				const color =
					star.tint === "cyan"
						? `rgba(57,215,255,${alpha})`
						: star.tint === "green"
							? `rgba(158,255,79,${alpha})`
							: star.tint === "violet"
								? `rgba(139,92,246,${alpha})`
								: `rgba(248,250,252,${alpha})`;

				const size = star.size * depth;
				ctx.fillStyle = color;
				ctx.fillRect(px, py, size, size);
				if (size > 1.15 && star.alpha > 0.78) {
					ctx.fillStyle = color.replace(`${alpha}`, `${alpha * 0.24}`);
					ctx.fillRect(px - size, py, size * 3, 0.8);
					ctx.fillRect(px, py - size, 0.8, size * 3);
				}
			}

			ctx.restore();
		};

		const drawSolarSystem = (
			time: number,
			sunX: number,
			sunY: number,
			pointerX: number,
			pointerY: number,
		) => {
			const scale = clamp(Math.min(width, height) / 780, 0.56, 1.2);
			const coreRadius = 7.5 * scale;
			const coronaRadius = 285 * scale;

			ctx.save();
			ctx.globalCompositeOperation = "screen";

			const corona = ctx.createRadialGradient(
				sunX,
				sunY,
				0,
				sunX,
				sunY,
				coronaRadius,
			);
			corona.addColorStop(0, "rgba(255,250,206,0.98)");
			corona.addColorStop(0.035, "rgba(248,255,79,0.56)");
			corona.addColorStop(0.12, "rgba(57,215,255,0.24)");
			corona.addColorStop(0.34, "rgba(139,92,246,0.1)");
			corona.addColorStop(0.7, "rgba(10,16,32,0.04)");
			corona.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = corona;
			ctx.beginPath();
			ctx.arc(sunX, sunY, coronaRadius, 0, Math.PI * 2);
			ctx.fill();

			ctx.fillStyle = "rgba(255,255,221,0.96)";
			ctx.shadowColor = "rgba(248,255,79,0.9)";
			ctx.shadowBlur = 22 * scale;
			ctx.beginPath();
			ctx.arc(sunX, sunY, coreRadius, 0, Math.PI * 2);
			ctx.fill();
			ctx.shadowBlur = 0;

			ctx.translate(sunX + pointerX * 16, sunY + pointerY * 10);
			ctx.rotate(-0.26 + pointerX * 0.025);

			for (const planet of planets) {
				const orbitAlpha = planet.orbitX > 600 * scale ? 0.145 : 0.17;
				ctx.beginPath();
				ctx.ellipse(
					0,
					20 * scale,
					planet.orbitX,
					planet.orbitY,
					0,
					Math.PI * 0.08,
					Math.PI * 1.82,
				);
				ctx.strokeStyle = `rgba(57,215,255,${orbitAlpha})`;
				ctx.lineWidth = 1;
				ctx.stroke();

				const angle = planet.phase + (reducedMotion ? 0 : time * planet.speed);
				const x = Math.cos(angle) * planet.orbitX;
				const y = 18 * scale + Math.sin(angle) * planet.orbitY;
				const farSide = Math.sin(angle) < 0;

				ctx.fillStyle = planet.glow;
				ctx.beginPath();
				ctx.arc(x, y, planet.radius * scale * 4.2, 0, Math.PI * 2);
				ctx.fill();

				ctx.fillStyle = farSide
					? planet.color.replaceAll("0.9", "0.48").replaceAll("0.8", "0.44")
					: planet.color;
				ctx.beginPath();
				ctx.arc(
					x,
					y,
					planet.radius * scale * (farSide ? 0.72 : 1),
					0,
					Math.PI * 2,
				);
				ctx.fill();
			}

			ctx.restore();
		};

		const drawMatrixReveal = (time: number) => {
			if (!cursor.active) return;

			const radius = width < 760 ? 132 : 210;
			const columnGap = width < 760 ? 18 : 15;
			const rowGap = width < 760 ? 18 : 16;
			const leftColumn = Math.floor((cursor.x - radius) / columnGap);
			const rightColumn = Math.ceil((cursor.x + radius) / columnGap);
			const tick = Math.floor(time * 12);

			ctx.save();
			ctx.globalCompositeOperation = "lighter";
			ctx.font = `${width < 760 ? 13 : 14}px "JetBrains Mono", "IBM Plex Mono", monospace`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			const halo = ctx.createRadialGradient(
				cursor.x,
				cursor.y,
				0,
				cursor.x,
				cursor.y,
				radius,
			);
			halo.addColorStop(0, "rgba(158,255,79,0.13)");
			halo.addColorStop(0.34, "rgba(57,215,255,0.08)");
			halo.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = halo;
			ctx.beginPath();
			ctx.arc(cursor.x, cursor.y, radius, 0, Math.PI * 2);
			ctx.fill();

			for (let column = leftColumn; column <= rightColumn; column += 1) {
				const x = column * columnGap;
				const dx = x - cursor.x;
				const columnStrength = Math.max(0, 1 - Math.abs(dx) / radius);
				if (columnStrength <= 0) continue;

				const seed = (Math.sin(column * 91.17) + 1) * 0.5;
				const speed = 46 + seed * 72;
				const phase = seed * height;
				const rows = Math.ceil(height / rowGap) + 6;

				for (let row = 0; row < rows; row += 1) {
					const y =
						((row * rowGap + time * speed + phase) % (height + rowGap * 4)) -
						rowGap * 2;
					const dy = y - cursor.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					const radialStrength = Math.max(0, 1 - distance / radius);
					if (radialStrength <= 0.02) continue;

					const trail = 0.35 + ((row + tick + column) % 9) / 12;
					const alpha = clamp(radialStrength * columnStrength * trail, 0, 0.84);
					const hot = radialStrength > 0.72 && (row + column + tick) % 5 === 0;

					ctx.fillStyle = hot
						? `rgba(248,255,79,${alpha})`
						: `rgba(158,255,79,${alpha})`;
					ctx.fillText(glyphFor(column, row, tick), x, y);

					if (hot) {
						ctx.fillStyle = `rgba(57,215,255,${alpha * 0.55})`;
						ctx.fillRect(x - 1, y + rowGap * 0.45, 2, 2);
					}
				}
			}

			const pixelGap = 7;
			const startX =
				Math.floor((cursor.x - radius * 0.8) / pixelGap) * pixelGap;
			const endX = cursor.x + radius * 0.8;
			const startY =
				Math.floor((cursor.y - radius * 0.8) / pixelGap) * pixelGap;
			const endY = cursor.y + radius * 0.8;

			for (let x = startX; x <= endX; x += pixelGap) {
				for (let y = startY; y <= endY; y += pixelGap) {
					const dx = x - cursor.x;
					const dy = y - cursor.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					const strength = Math.max(0, 1 - distance / (radius * 0.8));
					if (strength <= 0.1) continue;

					ctx.fillStyle = `rgba(57,215,255,${strength * 0.12})`;
					ctx.fillRect(x, y, 1, 1);
				}
			}

			ctx.restore();
		};

		const render = () => {
			cursor.x += (cursor.targetX - cursor.x) * 0.085;
			cursor.y += (cursor.targetY - cursor.y) * 0.085;

			const time = performance.now() * 0.001;
			const pointerX = cursor.active ? cursor.x / width - 0.5 : 0;
			const pointerY = cursor.active ? cursor.y / height - 0.5 : 0;
			const sunX = width * (width < 760 ? 0.88 : 0.86) - pointerX * 34;
			const sunY = height * (width < 760 ? 0.14 : 0.16) - pointerY * 22;

			ctx.clearRect(0, 0, width, height);
			drawCosmosBase(sunX, sunY);
			drawStars(time, pointerX, pointerY);
			drawSolarSystem(time, sunX, sunY, pointerX, pointerY);
			drawMatrixReveal(time);
		};

		const loop = () => {
			render();
			frame = requestAnimationFrame(loop);
		};

		const onPointerMove = (event: PointerEvent) => {
			if (event.pointerType === "touch") return;
			cursor.active = true;
			cursor.targetX = event.clientX;
			cursor.targetY = event.clientY;
			if (reducedMotion) render();
		};

		const onPointerLeave = () => {
			cursor.active = false;
			if (reducedMotion) render();
		};

		const onVisibilityChange = () => {
			cancelAnimationFrame(frame);
			if (!document.hidden && !reducedMotion) {
				frame = requestAnimationFrame(loop);
			}
		};

		resize();
		if (!reducedMotion) frame = requestAnimationFrame(loop);

		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onPointerMove, { passive: true });
		window.addEventListener("pointerleave", onPointerLeave);
		document.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerleave", onPointerLeave);
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [reducedMotion]);

	return (
		<canvas
			ref={canvasRef}
			className="pixel-matrix-canvas pointer-events-none"
			tabIndex={-1}
			aria-hidden="true"
		/>
	);
}
