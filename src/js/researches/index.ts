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
	})
} as const;

export function tickResearches(diff: number) {
	for (const research of Object.values(Researches)) {
		if (player.researches[research.id] === -1) continue;
		player.researches[research.id] += diff / research.config.time;
	}
}