import { InfHandler } from ".";

import { player } from "@/js/player";

import { BitUpgradeState, formatPercents, formatX, run } from "@/utils";

interface InfUpgradeConfig<E> {
	id: number,
	cost: number,
	effect?: (() => E) | E,
	isUnlocked?: () => boolean,

	title: string,
	description: ((x: InfUpgrade<E>) => string) | (() => string) | string,
}

export class InfUpgrade<E = number> extends BitUpgradeState<InfUpgradeConfig<E>, E> {
	get bits() { return player.infinity.upgrades; }
	set bits(v) { player.infinity.upgrades = v; }

	get currencyAmount() { return player.infinity.ip; }
	set currencyAmount(v) { player.infinity.ip = v; }

	get isUnlocked() { return player.infinity.bestIP >= 0.2 && (run(this.config.isUnlocked) ?? true); }

	get cost() { return this.config.cost; }
	get effect() {
		if (!this.config.effect) throw Error(`Accessed effect where unimplemented for TimeUpgrade ${this.id}`);
		return run(this.config.effect);
	}

	get isDisabled() { return !InfHandler.isUnlocked; }

	get title() { return this.config.title; }
	get description() { return run(this.config.description, this); }
}


export const InfUpgrades = {
	infPowBoostMomentum: new InfUpgrade({
		id: 0,
		cost: 0.4,
		effect: () => Math.pow(player.infinity.infPow / 1e24, 0.25) + 1,

		title: "Boundlessly Eternal",
		description: upg => `Infinity Power increases the momentum to IP conversion by ${formatX(upg.effect - 1)}`
	}),
	ipGain: new InfUpgrade({
		id: 1,
		cost: 0.5,
		effect: Math.sqrt(2),

		title: "Irrational Contentness",
		description: `Adjust IP requirement to boost IP gain by ${formatX(Math.sqrt(2))} (Sqrt of 2)`
	}),
	ipBoostGlyphLevel: new InfUpgrade({
		id: 2,
		cost: 0.7,
		effect: () => (player.infinity.ip) / 3 + 1,

		title: "Ritualistic Symbolism",
		description: upg => `IP increases effective Glyph level by ${formatPercents(upg.effect - 1)}`
	})
};