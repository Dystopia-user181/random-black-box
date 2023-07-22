import { player } from "@/js/player";

import { BuyableState, format, run } from "@/utils";

interface ResearchConfig {
	id: number,
	description: string,
	cost: number,
	time: number,
	onAttain?: () => void,
	isUnlocked?: boolean | (() => boolean)
}
export class ResearchState extends BuyableState<ResearchConfig, boolean> {
	get id() {
		return this.config.id;
	}

	get description() {
		return this.config.description;
	}

	get cost() {
		return this.config.cost;
	}

	get timeRequirement() {
		return this.config.time;
	}

	get percentageCompletion() {
		return Math.max(0, player.researches[this.id]);
	}

	get formattedCost() {
		return this.cost ? `${format(this.cost)} usable energy` : "Free";
	}

	get canApply() {
		return player.researches[this.id] >= 1;
	}

	get currencyAmount() { return player.usableEnergy; }

	set currencyAmount(x) { player.usableEnergy = x; }

	get effect() { return this.canApply; }

	get isUnlocked() { return run(this.config.isUnlocked) ?? true; }

	get isPurchaseable() { return player.researches[this.id] === -1; }

	handlePurchase() {
		player.researches[this.id] = 0;
		if (this.config.onAttain) this.config.onAttain();
	}
}