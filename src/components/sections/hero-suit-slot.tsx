"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { SuitLoader } from "@/features/hero-suit/components/suit-loader";

const HeroSuitScene = dynamic(
	() => import("@/features/hero-suit/scene/hero-suit-scene").then((mod) => mod.HeroSuitScene),
	{
		ssr: false,
		loading: () => <HeroSuitFallback />,
	},
);

export function HeroSuitSlot() {
	const [ready, setReady] = useState(false);
	const readyRef = useRef(false);
	const idleHandleRef = useRef<number | null>(null);

	const startScene = useCallback(() => {
		if (readyRef.current) return;
		readyRef.current = true;
		setReady(true);
	}, []);

	useEffect(() => {
		const desktopQuery = window.matchMedia("(min-width: 1024px)");
		if (!desktopQuery.matches) return;

		const idleWindow = window as Window & {
			requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
			cancelIdleCallback?: (handle: number) => void;
		};

		const timeoutId = window.setTimeout(() => {
			if (
				typeof idleWindow.requestIdleCallback === "function" &&
				typeof idleWindow.cancelIdleCallback === "function"
			) {
				idleHandleRef.current = idleWindow.requestIdleCallback(startScene, {
					timeout: 1600,
				});
				return;
			}

			startScene();
		}, 16000);

		return () => {
			window.clearTimeout(timeoutId);
			if (idleHandleRef.current !== null) {
				idleWindow.cancelIdleCallback?.(idleHandleRef.current);
				idleHandleRef.current = null;
			}
		};
	}, [startScene]);

	return (
		<div onFocusCapture={startScene} onPointerEnter={startScene} onPointerMove={startScene}>
			{ready ? <HeroSuitScene /> : <HeroSuitFallback />}
		</div>
	);
}

function HeroSuitFallback() {
	return (
		<div className="grid h-[430px] place-items-center sm:h-[540px] lg:h-[640px]">
			<SuitLoader label="Loading suit" className="translate-x-[50px] -translate-y-5" />
		</div>
	);
}
