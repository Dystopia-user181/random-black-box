import { ResearchState } from "./research-class";

import { player } from "@/js/player";

export * from "./research-class";

export const Researches = {
	siphon: new ResearchState({
		id: 0,
		description: "Unlock the energy siphon.",
		cost: 0,
		time: 10,
		isUnlocked: () => player.totalEnergy >= 10
	}),
	fireMore: new ResearchState({
		id: 1,
		description: "Fire 2 energy packets each time.",
		cost: 0.2,
		time: 5,
		isUnlocked: () => Researches.siphon.canApply
	}),
	fireVision: new ResearchState({
		id: 2,
		description: "Gain laser vision to help with aiming.",
		cost: 0.6,
		time: 20,
		isUnlocked: () => Researches.siphon.canApply
	}),
} as Record<string, ResearchState>;

// @ts-ignore
window.re = Researches;

export function tickResearches(diff: number) {
	for (const research of Object.values(Researches)) {
		if (player.researches[research.id] === -1) continue;
		player.researches[research.id] += diff / research.config.time;
		player.researches[research.id] = Math.min(1, player.researches[research.id]);
	}
}