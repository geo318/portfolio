import { ImageResponse } from "next/og";

export const alt = "Giorgi Lomidze full-stack software engineer portfolio";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: "linear-gradient(135deg, #02040b 0%, #07101f 48%, #041219 100%)",
				color: "#f8fafc",
				padding: 72,
				fontFamily: "Arial, sans-serif",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(rgba(158,255,79,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(57,215,255,0.08) 1px, transparent 1px)",
					backgroundSize: "42px 42px",
					opacity: 0.35,
				}}
			/>
			<div
				style={{
					position: "absolute",
					right: -90,
					top: -120,
					width: 520,
					height: 520,
					borderRadius: 999,
					background:
						"radial-gradient(circle, rgba(158,255,79,0.36), rgba(57,215,255,0.12) 38%, transparent 68%)",
				}}
			/>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						gap: 18,
						alignItems: "center",
						color: "#9eff4f",
						fontSize: 28,
						letterSpacing: 8,
						textTransform: "uppercase",
					}}
				>
					Giorgi Lomidze
					<span style={{ color: "#94a3b8" }}>/</span>
					<span style={{ color: "#94a3b8" }}>Tbilisi, Georgia</span>
				</div>
				<div
					style={{
						marginTop: 48,
						fontSize: 86,
						fontWeight: 800,
						lineHeight: 0.98,
						letterSpacing: -2,
						maxWidth: 930,
					}}
				>
					Full-stack engineer for reliable product UI.
				</div>
			</div>
			<div
				style={{
					display: "flex",
					gap: 20,
					color: "#39d7ff",
					fontSize: 28,
					letterSpacing: 5,
					textTransform: "uppercase",
				}}
			>
				React / Next.js / TypeScript / Node.js / Integrations
			</div>
		</div>,
		size,
	);
}
