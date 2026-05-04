import { cn } from "@/lib/utils";

export function ScanLabel({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"scan-label pointer-events-none absolute right-3 top-3 z-20 border border-secondary/60 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary shadow-[0_0_18px_rgb(57_215_255_/_0.16)]",
				className,
			)}
		>
			{children}
		</span>
	);
}
