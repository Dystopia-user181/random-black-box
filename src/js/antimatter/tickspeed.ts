import { Strikes } from "@/js/strikes";

import { AMHandler } from ".";
import { AntimatterMonomension } from "./monomensions";
import { AntimatterRebuyableState } from "./antimatter-rebuyable-state";

import { TimeRebuyables } from "@/js/time";

import { GlyphEffect, GlyphEffectHandler } from "@/js/glyphs";

import { Absolve } from "@/js/absolve";

import { player } from "@/js/player";

export const TickspeedUpgrade = new (class extends AntimatterRebuyableState<undefined> {
	get amount() { return player.monomensions.antimatter.tickspeed; }
	set amount(v: number) { player.monomensions.antimatter.tickspeed = v; }

	get isUnlocked() {
		return player.monomensions.antimatter.unlocks >= 2 && !Absolve.hasFinished;
	}

	get freeAmount() {
		let base = 0;
		base += TimeRebuyables.freeTickspeed.effectOrDefault(0);
		return base;
	}

	get perUpgrade() {
		let base = 1.2;
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.tickMult, 0) + 1;
		return base;
	}

	get effect() {
		return Math.pow(this.perUpgrade, this.amount + this.freeAmount);
	}

	get cost() {
		const effectiveAmt = Strikes[2].isUnlocked ? Math.pow(this.amount, 1.2) : this.amount;
		return AMHandler.baseAM * 0.1 * Math.pow(8, effectiveAmt);
	}

	get isPurchaseable() {
		return AntimatterMonomension("current").amount > 0;
	}
})(undefined);