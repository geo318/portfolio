export type DomainNode = {
	id: string;
	label: string;
	kind: "core" | "commerce" | "integration";
	position: [number, number, number];
	description: string;
};

export const domainNodes: DomainNode[] = [
	{
		id: "tenant",
		label: "Tenant",
		kind: "core",
		position: [-3.2, 1.6, 0],
		description: "Path routing, settings, ownership boundary",
	},
	{
		id: "product",
		label: "Product",
		kind: "core",
		position: [-1.25, 0.92, -0.4],
		description: "Catalog, variants, markdown, media",
	},
	{
		id: "inventory",
		label: "Inventory",
		kind: "commerce",
		position: [1.15, 1.15, 0.25],
		description: "Ledger, snapshot, reserve/release",
	},
	{
		id: "auction",
		label: "Auction",
		kind: "commerce",
		position: [3.15, 0.25, -0.25],
		description: "Bids, timers, anti-snipe, events",
	},
	{
		id: "cart",
		label: "Cart",
		kind: "commerce",
		position: [-2.55, -1.0, 0.45],
		description: "Session state and checkout preparation",
	},
	{
		id: "order",
		label: "Order",
		kind: "commerce",
		position: [-0.2, -1.45, -0.1],
		description: "Status, user history, delivery state",
	},
	{
		id: "payment",
		label: "Payment",
		kind: "integration",
		position: [2.05, -1.25, 0.45],
		description: "Keepz, Credo, callbacks, refunds",
	},
	{
		id: "shipping",
		label: "Shipping",
		kind: "integration",
		position: [3.45, -2.0, -0.35],
		description: "Manual first, provider adapter later",
	},
];

export const domainEdges = [
	["tenant", "product"],
	["product", "inventory"],
	["inventory", "auction"],
	["product", "cart"],
	["cart", "order"],
	["order", "payment"],
	["order", "shipping"],
	["auction", "order"],
] as const;
