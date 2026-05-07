import * as React from "react";
import { cn } from "@/lib/utils";

type CyberButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean;
	variant?: "primary" | "secondary" | "ghost";
};

export function CyberButton({
	asChild = false,
	children,
	className,
	variant = "primary",
	...props
}: CyberButtonProps) {
	const renderContent = (label: React.ReactNode) => (
		<>
			<span className="cyber-button-grid" aria-hidden="true" />
			<span className="cyber-button-glitch" aria-hidden="true" />
			<span className="cyber-button-label">{label}</span>
		</>
	);

	const classes = cn("cyber-button", `cyber-button-${variant}`, className);

	if (asChild) {
		const child = React.Children.only(children);

		if (!React.isValidElement<{ className?: string; children?: React.ReactNode }>(child)) {
			return null;
		}

		return React.cloneElement(child, {
			className: cn(classes, child.props.className),
			children: renderContent(child.props.children),
		});
	}

	return (
		<button className={classes} {...props}>
			{renderContent(children)}
		</button>
	);
}
