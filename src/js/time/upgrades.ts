import { Strikes } from "@/js/strikes";

import { TimeDilationHandler } from "./dilation";

import { GlyphEffect, GlyphEffectHandler, GlyphHandler } from "@/js/glyphs";

import { InfHandler } from "@/js/infinity";

import { player } from "@/js/player";

import { BitUpgradeState, format, formatInt, formatX, RebuyableState, run } from "@/utils";

export const UpgradeHandler = {
	get choices() {
		return 1;
	}
};

interface TimeUpgradeConfig<E> {
	id: number,
	cost: number,
	effect?: (() => E) | E,
	isUnlocked?: () => boolean,

	description: ((x: TimeUpgrade<E>) => string) | (() => string) | string,
}

export class TimeUpgrade<E = number> extends BitUpgradeState<TimeUpgradeConfig<E>, E> {
	get bits() { return player.time.upgrades; }
	set bits(v) { player.time.upgrades = v; }

	get currencyAmount() { return player.time.tachyonMatter; }
	set currencyAmount(v) { player.time.tachyonMatter = v; }

	get isUnlocked() { return run(this.config.isUnlocked) ?? true; }

	get cost() { return this.config.cost; }
	get effect() {
		if (!this.config.effect) throw Error(`Accessed effect where unimplemented for TimeUpgrade ${this.id}`);
		return run(this.config.effect);
	}

	get isDisabled() { return !TimeDilationHandler.isUnlocked || player.time.chosenUpgrade !== this.id; }

	get description() { return run(this.config.description, this); }
	select() { player.time.chosenUpgrade = this.id; }
}

interface TimeRebuyableConfig<E> {
	id: number,
	cost: (amt: number) => number,
	effect?: ((amt: number) => E) | E,
	cap?: (() => number) | number,
	isToggleable?: boolean,
	isUnlocked?: () => boolean,

	description: ((x: TimeRebuyable<E>) => string) | (() => string) | string,
}

export class TimeRebuyable<E = number> extends RebuyableState<TimeRebuyableConfig<E>, E> {
	get id() { return this.config.id; }

	get amount() { return player.time.rebuyables[this.id]; }
	set amount(v) { player.time.rebuyables[this.id] = v; }

	get cap() { return run(this.config.cap) ?? Infinity; }

	get currencyAmount() { return player.time.tachyonMatter; }
	set currencyAmount(v) { player.time.tachyonMatter = v; }

	get isTogglable() { return this.config.isToggleable || false; }
	get isToggledOn() { return !this.isTogglable || player.time.rebuyablesEnabled[this.id]; }
	set isToggledOn(v) { player.time.rebuyablesEnabled[this.id] = v; }
	toggle() {
		if (!this.config.isToggleable) return;
		player.time.rebuyablesEnabled[this.id] = !player.time.rebuyablesEnabled[this.id];
	}

	get isUnlocked() { return run(this.config.isUnlocked) ?? true; }

	get cost() {
		return run(this.config.cost, this.amount) /
			GlyphEffectHandler.effectOrDefault(GlyphEffect.timeBuyableCost, 1);
	}

	get effect() {
		if (!this.config.effect) throw Error(`Accessed effect where unimplemented for TimeRebuyable ${this.id}`);
		return run(this.config.effect, this.amount);
	}

	get canApply() { return TimeDilationHandler.isUnlocked && this.isToggledOn; }

	get description() { return run(this.config.description, this); }
	select() { player.time.chosenUpgrade = this.id; }
}

export const TimeUpgrades = {
	tpIdle: new TimeUpgrade({
		id: 0,
		cost: 1.5,
		effect: 10,

		description: `Time passes 10 times slower for Monomensions while reversing`
	}),
	tpActive: new TimeUpgrade({
		id: 1,
		cost: 1.5,
		effect: 4,

		description: `Quadruple Tachyon Matter gain but also time speed for Monomensions while reversing`
	}),
	surgeIdle: new TimeUpgrade({
		id: 2,
		cost: 8,

		description: `Surge effect is at ×7.5 but always active`
	}),
	surgeActive: new TimeUpgrade({
		id: 3,
		cost: 8,

		description: `Surge starts at ×100 instead of ×10 but lasts shorter and decreases quicker`
	}),
	sacBefore1: new TimeUpgrade<{ power: number, multiplier: number }>({
		id: 4,
		cost: 300,
		effect: {
			power: 0.33,
			multiplier: 3
		},

		description: `Sacrifice point gain is raised ^0.330 then tripled (Works before 1)`
	}),
	sacAfter1: new TimeUpgrade({
		id: 5,
		cost: 300,
		effect: 1.2,

		description: `Sacrifice point gain is raised ^1.200 (Works before 1)`
	}),
	glyphPowStatic: new TimeUpgrade({
		id: 6,
		cost: 1e4,
		effect: 2,
		isUnlocked: () => GlyphHandler.isUnlocked,

		description: `Double glyph power gain`
	}),
	glyphPowDynamic: new TimeUpgrade({
		id: 7,
		cost: 1e4,
		effect: () => Math.max(Math.log10(player.time.tachyonMatter + 10) / 2.4,
			Math.log10(player.time.tachyonMatter + 10) ** 2 / 15),
		isUnlocked: () => GlyphHandler.isUnlocked,

		description: (upg: TimeUpgrade) => `${formatX(upg.effect)} glyph power gain based on Tachyon Matter`
	}),
	momentumGain: new TimeUpgrade({
		id: 8,
		cost: 1e13,
		effect: () => Math.pow(Math.log10(player.infinity.infPow + 1), 2) / 10 + 1,
		isUnlocked: () => InfHandler.isUnlocked,

		description: (upg: TimeUpgrade) => `${formatX(upg.effect)} momentum gain speed based on Infinity Power`
	})
};

export const TimeRebuyables = (function() {
	const isToggleable = true;
	return {
		gainBasedOnDil: new TimeRebuyable({
			id: 0,
			cost: x => Math.pow(2, Math.pow(x, 1.23)) * 5,
			effect: x => Math.pow(x / 4.5, 0.7),
			cap: 20,

			description(upg) {
				return `Gain more Tachyon Matter based on time dilation
				<br>
				Currently: ×Dilation^${format(upg.effect)}`;
			}
		}),
		sacPointGain: new TimeRebuyable({
			id: 1,
			cost: x => Math.pow(3, x) * 20,
			effect: x => Math.pow(x + 1, 5),
			cap: 30,

			description(upg) {
				return `Increase Sacrifice Point gain
				<br>
				Currently: ${formatX(upg.effect)}`;
			}
		}),
		freeTickspeed: new TimeRebuyable({
			id: 2,
			cost: x => Math.pow(2, x) * 10,
			effect: x => x,
			cap: 40,

			description(upg) {
				return `Get a free tickspeed upgrade
				<br>
				Currently: +${formatInt(upg.effect)}`;
			}
		}),
		dilNerf: new TimeRebuyable({
			id: 3,
			cost: x => Math.pow(3, Math.pow(x, 1.05)) * 50,
			effect: x => 2 / (x + 2),
			cap: 20,
			isToggleable,

			description(upg) {
				return `Decrease the dilation nerf effectiveness
				<br>
				Currently: x${format(upg.effect)}`;
			}
		}),
		tachyonEngine: new TimeRebuyable({
			id: 4,
			cost: x => Math.pow(10, Math.pow(x + (x >= 1 ? 2 : 0), 1.05)) * 200,
			effect: x => x,
			cap: 20,
			isUnlocked() { return Strikes[3].isUnlocked; },

			description(upg) {
				return upg.amount <= 0 ? "Unlock the Tachyon Engine"
					: `Increase maximum Tachyon Engine activity level
					<br>
					Currently: ${formatInt(upg.effect)}`;
			}
		}),
		tachyonEnginePow: new TimeRebuyable({
			id: 5,
			cost: x => Math.pow(16, x) * 1e10,
			effect: x => 0.2 * x,
			cap: 5,
			isUnlocked() { return Strikes[3].isUnlocked; },

			description(upg) {
				return `Increase the effect of Tachyon Engine levels on Momentum
				<br>
				Currently: ^(+${format(upg.effect)})`;
			}
		}),
	};
}());