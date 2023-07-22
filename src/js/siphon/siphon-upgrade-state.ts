import { RebuyableState } from "@/utils";

import { Rectangle } from "@/js/rectangle";

import { Heat } from "@/js/heat";
import { player } from "@/js/player";

interface SiphonUpgradeConfig<E> {
	id: number,
	description: string,
	cost: (x: number) => number,
	effect: (x: number) => E,
	formatEffect: (x: E) => string,
	boundingBox: Rectangle,
	cap?: number,
	isUnlocked?: () => boolean,
}
export class SiphonUpgradeState<E = number> extends RebuyableState<SiphonUpgradeConfig<E>, E> {
	get id() { return this.config.id; }

	get description() { return this.config.description; }

	get currencyAmount() { return Heat.temperature; }
	set currencyAmount(x) { player.energy = x * Heat.heatCapacity; }

	get cost() { return this.config.cost(this.amount); }

	get effect() { return this.config.effect(this.amount); }

	get formattedEffect() {
		return this.config.formatEffect(this.effect);
	}

	get amount() { return player.siphon.upgrades[this.id]; }
	set amount(x) { player.siphon.upgrades[this.id] = x; }

	get cap() {
		return this.config.cap ?? Infinity;
	}

	get isUnlocked() {
		return this.config.isUnlocked?.() ?? true;
	}

	handlePurchase() {
		this.amount++;
		player.energy = 0;
	}
}