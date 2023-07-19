import { player } from "@/js/player";

export const Strikes = {
	1: {
		get isUnlocked() { return player.monomensions.antimatter.unlocks >= 5; },
	},
	2: {
		get isUnlocked() { return player.monomensions.antimatter.unlocks >= 6; },
	},
	3: {
		get isUnlocked() { return player.monomensions.antimatter.maxUnlocks >= 7; },
	},
};