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
		description: "Fire 2 energy packets each time",
		cost: 0.2,
		time: 5,
		isUnlocked: () => Researches.siphon.canApply
	}),
	fireVision: new ResearchState({
		id: 2,
		description: "Gain laser vision to help with aiming",
		cost: 0.6,
		time: 20,
		isUnlocked: () => Researches.siphon.canApply
	}),
	fireEvenMore: new ResearchState({
		id: 3,
		description: "Fire 3 energy packets each time",
		cost: 1.5,
		time: 20,
		isUnlocked: () => Researches.fireMore.canApply
	}),
	fireBetter: new ResearchState({
		id: 4,
		description: "Each packet carries 2 J of energy",
		cost: 1.5,
		time: 30,
		isUnlocked: () => Researches.fireMore.canApply
	}),
	fireLaser: new ResearchState({
		id: 5,
		description: "Fire activates a laser for 15s instead of producing energy packets",
		cost: 10,
		time: 40,
		onAttain() {
			player.packets.lastFire = 0;
		},
		isUnlocked: () => Researches.fireEvenMore.effect && Researches.fireBetter.effect && Researches.fireVision.effect
	}),
	fireRadius: new ResearchState({
		id: 6,
		description: "Decrease distance between turret and box",
		cost: 3,
		time: 20,
		isUnlocked: () => Researches.siphon.canApply
	}),
	buildLasers: new ResearchState({
		id: 7,
		description: "You can mount your own lasers. The game is not implemented past this point. Congrats for beating it I guess",
		cost: 100,
		time: 60,
		isUnlocked: () => Researches.fireLaser.canApply
	})
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