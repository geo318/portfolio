import { cn } from "@/lib/utils";

export function ScanLabel({
	children,
	detail,
	className,
}: {
	children: React.ReactNode;
	detail?: string;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"scan-label pointer-events-none absolute right-3 top-3 z-20 max-w-[14rem] border border-secondary/55 bg-[#050a12]/88 px-2.5 py-1.5 font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-secondary shadow-[0_0_18px_rgb(57_215_255_/_0.14)] backdrop-blur-sm",
				className,
			)}
		>
			<span className="block text-secondary">{children}</span>
			{detail ? (
				<span className="block border-t border-secondary/20 pt-1 text-[9px] normal-case leading-4 tracking-[0.02em] text-muted-foreground">
					{detail}
				</span>
			) : null}
		</span>
	);
}
