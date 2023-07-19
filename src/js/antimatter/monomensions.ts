import { AntimatterRebuyableState } from "./antimatter-rebuyable-state";

import { AMHandler } from ".";
import { SacrificeHandler } from "./sacrifice";
import { SurgeHandler } from "./surge";

import { GlyphEffect, GlyphEffectHandler } from "@/js/glyphs";

import { InfHandler } from "@/js/infinity";

import { Absolve } from "@/js/absolve";

import { player } from "@/js/player";


export const baseCosts = [0.1, 0.01, 1e-5, 1e-11, 1e-14, 1e-20, 1e-28, 1e-99] as const;
const scaling = [Math.sqrt(10), 10, 100, 1e6, 1e10, 1e16, 1e18, 1e90] as const;


export class AntimatterMonomensionState extends AntimatterRebuyableState<OneToEight> {
	get id() { return this.config; }

	get amount() { return player.monomensions.antimatter[this.id].amount; }
	set amount(v: number) { player.monomensions.antimatter[this.id].amount = v; }

	get bought() { return player.monomensions.antimatter[this.id].bought; }
	set bought(v: number) { player.monomensions.antimatter[this.id].bought = v; }

	get isUnlocked() {
		if (Absolve.hasRemoved("the 2nd to 8th Anti Monomensions")) return this.id === 1;
		return player.monomensions.antimatter.unlocks >= this.id;
	}

	get isCurrent() {
		if (Absolve.hasFinished) return this.id === 1;
		return player.monomensions.antimatter.unlocks === this.id;
	}

	get multiplier() {
		if (Absolve.hasFinished) return 0.1;
		let base = 1;
		base /= AMHandler.slowdownFactor;
		if (this.isCurrent) base *= SacrificeHandler.effect;
		if (SurgeHandler.selectedMono === this.id) base *= SurgeHandler.effect;
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.amMult, 1);
		base *= InfHandler.infPowEffect;
		if (base < 1) base = Math.pow(base, 1 / GlyphEffectHandler.effectOrDefault(GlyphEffect.amPow, 1));
		else base = Math.pow(base, GlyphEffectHandler.effectOrDefault(GlyphEffect.amPow, 1));
		return base;
	}

	get effect() {
		if (!this.isUnlocked) return 0;
		let base = this.amount * this.multiplier;
		base *= AMHandler.timeSpeedupFactor;
		return base;
	}

	get production() { return this.effect; }

	get cost() {
		if (this.bought >= 1 || !this.isCurrent) return Infinity;
		return baseCosts[this.id - 1] * Math.pow(scaling[this.id - 1], this.bought);
	}

	handlePurchase() {
		// Avoid rounding errors
		this.bought = (this.bought * 10 + 1) * 0.1;
		this.amount += 0.1;
	}

	reset() {
		this.amount = 0;
		this.bought = 0;
	}
}

function isValidId(dimId: number): dimId is OneToEight {
	return dimId >= 1 && dimId <= 8;
}

export const AntimatterMonomension = (function() {
	const lazyLoad = new Map<OneToEight, AntimatterMonomensionState>();
	function F(id: number | "current"): AntimatterMonomensionState {
		if (id === "current") return F(player.monomensions.antimatter.unlocks);
		if (!isValidId(id)) throw Error(`Invalid id ${id} passed to AntimatterMonomension`);
		if (!lazyLoad.has(id)) lazyLoad.set(id, new AntimatterMonomensionState(id));
		return lazyLoad.get(id) as AntimatterMonomensionState;
	}
	return F;
}());