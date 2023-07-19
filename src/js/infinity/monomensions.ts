import { GlyphEffect, GlyphEffectHandler } from "@/js/glyphs";

import { player } from "@/js/player";

import { RebuyableState } from "@/utils";


const baseCosts = [0.02, 0.06, 0.1, 0.14, 0.2, 0.3, 0.45, 0.6] as const;
const scaling = [0.02, 0.04, 0.05, 0.07, 0.1, 0.15, 0.2, 0.3] as const;


export class InfinityMonomensionState extends RebuyableState<OneToEight> {
	get id() { return this.config; }

	get currencyAmount() { return player.infinity.ip; }
	set currencyAmount(v) { player.infinity.ip = v; }

	get amount() { return player.monomensions.infinity[this.id].amount; }
	set amount(v: number) { player.monomensions.infinity[this.id].amount = v; }

	get bought() { return player.monomensions.infinity[this.id].bought; }
	set bought(v: number) { player.monomensions.infinity[this.id].bought = v; }

	get isUnlocked() {
		return player.infinity.bestIP >= baseCosts[this.id - 1];
	}

	get multiplier() {
		let base = 0.1;
		base *= Math.min(Math.pow(2, this.bought), Math.max(Math.pow(this.bought, 2), 1));
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.imMult, 1);
		return base;
	}

	get effect() {
		if (!this.isUnlocked) return 0;
		return this.amount * this.multiplier;
	}

	get production() { return this.effect; }

	get cost() {
		return Math.round((baseCosts[this.id - 1] + scaling[this.id - 1] * this.bought) * 100) / 100;
	}

	handlePurchase() {
		this.bought++;
		this.amount++;
	}

	reset() {
		this.amount = 0;
		this.bought = 0;
	}
}

function isValidId(dimId: number): dimId is OneToEight {
	return dimId >= 1 && dimId <= 8;
}

export const InfinityMonomension = (function() {
	const lazyLoad = new Map<OneToEight, InfinityMonomensionState>();
	function F(id: number): InfinityMonomensionState {
		if (!isValidId(id)) throw Error(`Invalid id ${id} passed to InfinityMonomension`);
		if (!lazyLoad.has(id)) lazyLoad.set(id, new InfinityMonomensionState(id));
		return lazyLoad.get(id) as InfinityMonomensionState;
	}
	return F;
}());