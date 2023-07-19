export abstract class Effect<C, E = number> {
	readonly config: C;
	constructor(config: C) {
		this.config = config;
	}

	abstract get canApply(): boolean;
	abstract get effect(): E;

	effectOrDefault(def: E) {
		return this.canApply ? this.effect : def;
	}
}

export abstract class BuyableState<C, E = number> extends Effect<C, E> {
	abstract get cost(): number;

	abstract get currencyAmount(): number;
	abstract set currencyAmount(v: number);

	get isPurchaseable() { return true; }
	get canAfford() { return this.currencyAmount >= this.cost && this.isPurchaseable; }

	abstract handlePurchase(): void;
	buy() {
		if (!this.canAfford) return;
		this.currencyAmount -= this.cost;
		this.handlePurchase();
	}
}

export abstract class RebuyableState<C, E = number> extends BuyableState<C, E> {
	get canApply() { return true; }

	get cap() { return Infinity; }
	get isCapped() { return this.amount >= this.cap; }

	get canAfford() { return super.canAfford && !this.isCapped; }

	abstract get amount(): number;
	abstract set amount(v: number);

	handlePurchase() {
		this.amount++;
	}
}

export abstract class BitUpgradeState<C extends { id: number }, E = number> extends BuyableState<C, E> {
	abstract get bits(): number;
	abstract set bits(v: number);

	get id() { return this.config.id; }

	get isBought() { return (this.bits & (1 << this.id)) > 0; }

	get isDisabled() { return false; }
	get canApply() { return this.isBought && !this.isDisabled; }

	get canAfford() { return super.canAfford && !this.isBought; }

	handlePurchase() {
		this.bits |= 1 << this.id;
	}
}