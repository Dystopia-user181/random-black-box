import { SiphonUpgradeState } from "./siphon-upgrade-state";

import { Rectangle } from "@/js/rectangle";

import { formatPercents, formatX } from "@/utils";

export const SiphonUpgrades = {
	efficiency: new SiphonUpgradeState({
		id: 0,
		description: "Upgrade heat engine",
		cost: x => 0.01 + 0.005 * x + 0.001 * x * x + 0.0001 * x * x * x,
		cap: 99,
		effect: x => 0.01 * (1 + x),
		formatEffect: x => `${formatPercents(x)} efficiency`,
		boundingBox: new Rectangle(-5, -16, 4, 3),
	}),
	hc: new SiphonUpgradeState({
		id: 1,
		description: "Decrease heat capacity",
		cost: x => 0.05 * Math.pow(1.6, x),
		effect: x => Math.pow(1.2, x) + x * x * 0.1,
		formatEffect: x => `Currently: ${formatX(1 / x)}`,
		boundingBox: new Rectangle(1, -16, 4, 3),
	}),
} as Record<string, SiphonUpgradeState>;