import { Strikes } from "@/js/strikes";

import { TimeUpgrades } from "@/js/time";

import { Absolve } from "@/js/absolve";

import { player } from "@/js/player";

function isDimId(v: number): v is OneToEight {
	return v >= 1 && v <= 8;
}

export const SurgeHandler = {
	get boostAmount() { return player.monomensions.antimatter.surge.boost; },
	set boostAmount(v: number) { player.monomensions.antimatter.surge.boost = v; },

	get selectedMono() { return player.monomensions.antimatter.surge.monoId; },
	set selectedMono(v: number) {
		if (!isDimId(v)) throw Error(`ID ${v} passed into SurgeHandler.selectedMono`);
		if (!this.canSwitch) return;
		player.monomensions.antimatter.surge.monoId = v;
	},

	get timePerSurge() {
		let base = 20;
		if (TimeUpgrades.surgeActive.canApply) base *= 0.5;
		return base;
	},

	get isUnlocked() { return player.monomensions.antimatter.unlocks >= 4 && !Absolve.hasFinished; },

	get baseMultiplier() {
		if (TimeUpgrades.surgeIdle.canApply) return 7.5;
		let base = 10;
		if (TimeUpgrades.surgeActive.canApply) base *= 10;
		return base;
	},
	get effectiveBoostAmount() {
		if (TimeUpgrades.surgeIdle.canApply) return 1;
		let base = this.boostAmount;
		if (TimeUpgrades.surgeActive.canApply) base = Math.pow(base, 1.3);
		return base;
	},
	get effect() {
		return Math.pow(this.baseMultiplier, this.effectiveBoostAmount);
	},
	tick(diff: number) {
		if (this.isAlwaysActive) return;
		this.boostAmount = Math.max(this.boostAmount - diff / this.timePerSurge, 0);
		if (this.boostAmount <= 0 && player.auto.surge && Strikes[2].isUnlocked) this.doSurge();
	},
	get isAlwaysActive() {
		return TimeUpgrades.surgeIdle.canApply;
	},
	get canSurge() {
		return this.boostAmount <= 0 && !this.isAlwaysActive;
	},
	get canSwitch() {
		return this.canSurge || TimeUpgrades.surgeIdle.canApply;
	},
	doSurge() {
		this.boostAmount = 1;
	}
};