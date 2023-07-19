import { Strikes } from "@/js/strikes";

import { AMHandler } from ".";
import { AntimatterMonomension } from "./monomensions";

import { TimeRebuyables, TimeUpgrades } from "@/js/time";

import { player } from "@/js/player";

export const SacrificeHandler = {
	get canSac() {
		return player.antimatter >= AMHandler.baseAM && AntimatterMonomension("current").amount > 0;
	},
	get softcapThreshold() {
		return 1e10;
	},
	get sacAmount() {
		if (!this.canSac) return 0;
		let amount = (player.antimatter - AMHandler.baseAM) * (AntimatterMonomension("current").amount ** 2);
		amount *= Math.pow(Strikes[3].isUnlocked ? 30 : 100, player.monomensions.antimatter.unlocks) * 0.1;
		amount *= TimeRebuyables.sacPointGain.effectOrDefault(1);
		amount = Math.pow(amount, TimeUpgrades.sacBefore1.effectOrDefault({ power: 1, multiplier: 1 }).power);
		amount *= TimeUpgrades.sacBefore1.effectOrDefault({ power: 1, multiplier: 1 }).multiplier;
		amount = Math.pow(amount, TimeUpgrades.sacAfter1.effectOrDefault(1));
		const softcap = this.softcapThreshold;
		if (amount > softcap) amount = Math.sqrt(softcap * (2 * amount - softcap));
		return amount;
	},
	doSac() {
		if (!this.canSac) return;
		player.monomensions.antimatter.sacrifice += this.sacAmount;
		player.antimatter = AMHandler.baseAM;
		player.monomensions.antimatter.timeElapsed = 0;
		for (let i = 1; i <= 8; i++) AntimatterMonomension(i).reset();
	},
	get sacPow() {
		return Strikes[3].isUnlocked ? 0.1 : 0.5;
	},
	effectAtScore(x: number = player.monomensions.antimatter.sacrifice) {
		return Math.pow(1 + x, this.sacPow);
	},
	get effect() {
		return this.effectAtScore();
	}
};