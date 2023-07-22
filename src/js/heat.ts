import { SiphonUpgrades } from "./siphon";

import { player } from "./player";

export const Heat = {
	get heatCapacity() {
		return 10000 / SiphonUpgrades.hc.effect;
	},
	get temperature() {
		return player.energy / this.heatCapacity;
	},
};