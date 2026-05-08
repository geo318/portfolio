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
			role="status"
			className={cn(
				"suit-loader relative grid size-44 place-items-center font-mono text-primary",
				className,
			)}
			aria-label={label}
		>
			<div className="suit-loader-glow" aria-hidden="true" />
			<svg
				className="suit-loader-svg"
				viewBox="0 0 180 180"
				fill="none"
				aria-hidden="true"
				focusable="false"
			>
				<defs>
					<radialGradient id="suit-loader-core" cx="42%" cy="34%" r="70%">
						<stop offset="0%" stopColor="#f8ffb8" stopOpacity="0.98" />
						<stop offset="30%" stopColor="#9eff4f" stopOpacity="0.9" />
						<stop offset="68%" stopColor="#39d7ff" stopOpacity="0.36" />
						<stop offset="100%" stopColor="#07100a" stopOpacity="0.12" />
					</radialGradient>
					<linearGradient id="suit-loader-edge" x1="42" x2="138" y1="36" y2="146">
						<stop stopColor="#39d7ff" stopOpacity="0.9" />
						<stop offset="0.48" stopColor="#9eff4f" stopOpacity="0.72" />
						<stop offset="1" stopColor="#ff2bd6" stopOpacity="0.52" />
					</linearGradient>
				</defs>
				<ellipse
					className="suit-loader-orbit suit-loader-orbit-a"
					cx="90"
					cy="90"
					rx="68"
					ry="28"
				/>
				<ellipse
					className="suit-loader-orbit suit-loader-orbit-b"
					cx="90"
					cy="90"
					rx="42"
					ry="72"
				/>
				<path
					className="suit-loader-blob suit-loader-blob-shadow"
					d="M92 39c18 1 38 10 47 28 10 19 7 44-8 60-14 16-38 25-60 18-21-7-35-29-34-51 1-21 16-42 35-50 6-3 13-5 20-5Z"
				/>
				<path
					className="suit-loader-blob suit-loader-blob-core"
					d="M91 38c20 0 38 12 47 30 9 19 3 43-11 58-15 17-39 24-59 15-19-8-31-30-29-51 2-20 17-39 35-47 5-2 11-5 17-5Z"
				/>
				<path
					className="suit-loader-blob suit-loader-blob-face"
					d="M82 51c18-6 39 4 47 22 8 17 3 39-11 51-15 13-39 13-53 0-14-12-18-34-9-51 5-10 15-18 26-22Z"
				/>
				<path
					className="suit-loader-blob-highlight"
					d="M75 58c14-8 32-6 43 5"
					strokeLinecap="round"
				/>
				<circle className="suit-loader-particle suit-loader-particle-a" cx="135" cy="78" r="3" />
				<circle className="suit-loader-particle suit-loader-particle-b" cx="53" cy="113" r="2.4" />
			</svg>
			<span className="suit-loader-monogram" aria-hidden="true">
				GL
			</span>
		</div>
	);
}
