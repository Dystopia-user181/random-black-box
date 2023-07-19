import { TimeRebuyables, TimeUpgrades } from ".";

import { GlyphEffect, GlyphEffectHandler } from "@/js/glyphs";

import { InfHandler, InfUpgrades } from "@/js/infinity";

import { player } from "@/js/player";

export const TachyonEngine = {
	get isUnlocked() { return TimeRebuyables.tachyonEngine.amount > 0; },
	get isOn() { return this.isUnlocked && player.time.tachyonEngine.on; },
	set isOn(v) { player.time.tachyonEngine.on = v; },
	get level() { return player.time.tachyonEngine.level; },
	set level(v) { player.time.tachyonEngine.level = v; },
	get isMinLevel() { return player.time.tachyonEngine.level <= 0; },
	get isMaxLevel() { return player.time.tachyonEngine.level >= TimeRebuyables.tachyonEngine.effect; },
	get consumption() {
		return (this.level <= 0 || !this.isOn) ? 0
			: Math.pow(10, this.level + (this.level >= 1 ? 1 : -1)) * this.level;
	},
	get production() {
		let base = Math.pow(this.level, 2.5 + TimeRebuyables.tachyonEnginePow.effect) / 10;
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.momentumGain, 1);
		base *= TimeUpgrades.momentumGain.effectOrDefault(1);
		return base;
	},
	get lossFactor() {
		let base = 0.1;
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.momentumDecay, 1);
		base *= TimeUpgrades.momentumGain.effectOrDefault(1);
		return base;
	},
	get glyphPowBoostAt() {
		return 5.55e5;
	},
	get glyphPowBoost() {
		return this.momentum < this.glyphPowBoostAt ? 1
			: Math.pow(this.momentum / 1e3, 0.2);
	},

	get momentum() { return player.time.tachyonEngine.momentum; },
	set momentum(v) { player.time.tachyonEngine.momentum = v; },
	get momentumToProgress() { return 0.02 * InfUpgrades.infPowBoostMomentum.effectOrDefault(1); },
	tick(diff: number) {
		if (player.time.tachyonMatter < 0) {
			player.time.tachyonMatter = 0;
			this.isOn = false;
		}
		const p = this.production;
		const a = this.lossFactor;
		if (!this.isOn || p <= 0) {
			InfHandler.progressToNext += (this.momentum / a) * (1 - Math.exp(-a * diff)) * this.momentumToProgress;
			this.momentum /= Math.exp(a * diff);
			if (this.momentum < 1e-3) this.momentum = 0;
			return;
		}
		// m'(t) = p - am(t)
		// m(t) = p/a(1 - e^-at)
		// const t = -Math.log(1 - this.momentum * a / p) / a;
		// this.momentum = p * (1 - Math.exp(-a * (t + diff))) / a;
		this.momentum = p * (1 - (1 - this.momentum * a / p) * Math.exp(-a * diff)) / a;
		// M(t) = pt/a + (p/a^2)e^-at + C
		// const M1 = p * Math.exp(-a * t) / a / a;
		// const M2 = p * diff / a + p * Math.exp(-a * (t + diff)) / a / a;
		const M1 = (p / a - this.momentum) / a;
		const M2 = p * diff / a + M1 * Math.exp(-a * diff);
		InfHandler.progressToNext += (M2 - M1) * this.momentumToProgress;
	},
};