import { InfinityMonomension } from "./monomensions";
import { InfUpgrades } from "./upgrades";

import { GlyphEffect, GlyphEffectHandler } from "@/js/glyphs";

import { Absolve } from "@/js/absolve";

import { player } from "@/js/player";

export * from "./monomensions";
export * from "./upgrades";

export const InfHandler = {
	get isUnlocked() { return player.infinity.bestIP > 0 && !Absolve.hasRemoved("Infinity"); },

	get progressToNext() { return player.infinity.ipProgress; },
	set progressToNext(v) { player.infinity.ipProgress = v; },
	get progressRequired() {
		let base = 2;
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.ipReqDiv, 1);
		let gainFactor = 1;
		gainFactor *= InfUpgrades.ipGain.effectOrDefault(1);
		return Math.pow(base, player.infinity.ip * 100 / gainFactor);
	},

	get infPowPower() {
		return this.isUnlocked ? 0.3 : 0;
	},
	get infPowEffect() {
		return Math.pow(player.infinity.infPow + 1, this.infPowPower);
	},

	tick(diff: number) {
		player.infinity.ip = Math.round(player.infinity.ip * 100) / 100;
		while (this.progressToNext >= this.progressRequired && player.infinity.ip < 1) {
			this.progressToNext -= this.progressRequired;
			player.infinity.ip += 0.01;
			player.infinity.bestIP = Math.max(player.infinity.bestIP, player.infinity.ip);
		}
		for (let i = 1; i <= 8; i++) {
			let production = InfinityMonomension(i).production * diff;
			for (let j = i - 1; j >= 1; j--) {
				InfinityMonomension(j).amount += production;
				production *= InfinityMonomension(j).multiplier * diff / (i - j + 1);
			}
			player.infinity.infPow += production;
		}
	},
};