import { cn } from "@/lib/utils";

export function SuitLoader({
	label = "Model sync",
	className,
}: {
	label?: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"suit-loader relative grid size-44 place-items-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary",
				className,
			)}
			aria-label={label}
		>
			<div className="suit-loader-glow" aria-hidden="true" />
			<div className="suit-loader-ring suit-loader-ring-outer" aria-hidden="true" />
			<div className="suit-loader-ring suit-loader-ring-inner" aria-hidden="true" />
			<div className="suit-loader-crosshair" aria-hidden="true" />
			<div className="relative z-10 grid size-20 place-items-center border border-primary/45 bg-background/75 text-center shadow-[0_0_32px_rgb(158_255_79_/_0.16)] backdrop-blur-sm">
				<span className="text-lg font-bold leading-none text-primary text-glow">
					GL
				</span>
				<span className="mt-1 text-[8px] text-muted-foreground">{label}</span>
			</div>
		</div>
	);
}
