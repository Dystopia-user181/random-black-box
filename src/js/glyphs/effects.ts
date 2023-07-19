import { GlyphHandler, GlyphSacrificeHandler, GlyphType } from ".";

import { InfUpgrades } from "@/js/infinity";

import { player } from "@/js/player";

import { format, formatPercents, formatX } from "@/utils";

export enum GlyphEffect {
	// Antimatter
	amMult,
	tickMult,
	amPow,
	dilNerf,

	// Time
	tachMult,
	timeBuyableCost,
	tachMultBySac,

	// Infinity
	ipReqDiv,
	imMult,
	momentumGain,
	momentumDecay,
}

export const GlyphEffects: Record<GlyphType, {
	id: GlyphEffect,
	description: (x: number) => string,
	effect: (x: number) => number,
}[]> = {
	[GlyphType.power]: [{
		id: GlyphEffect.amMult,
		description: (x: number) => `All Anti Monomension multipliers ${format(x)}`,
		effect: (x: number) => Math.pow(3 + x * 1.5, 2),
	},
	{
		id: GlyphEffect.tickMult,
		description: (x: number) => `Tickspeed effectiveness +${formatPercents(x)}`,
		effect: (x: number) => Math.log10(x + 1) / 5 + 0.03,
	},
	{
		id: GlyphEffect.amPow,
		description: (x: number) => `All Anti Mono multipliers ^${format(1 / x)} if < 1, ^${format(x)} if > 1`,
		effect: (x: number) => 1.02 * Math.pow(x + 1, 0.2),
	},
	{
		id: GlyphEffect.dilNerf,
		description: (x: number) => `Dilation effect starts ${format(x)} OoM later`,
		effect: (x: number) => 8 + 4 * x,
	}],

	[GlyphType.time]: [{
		id: GlyphEffect.tachMult,
		description: (x: number) => `Tachyon Matter gain ${formatX(x)}`,
		effect: (x: number) => x + 3,
	},
	{
		id: GlyphEffect.timeBuyableCost,
		description: (x: number) => `Repeatable Time upgrade costs /${format(x)}`,
		effect: (x: number) => (x * x) / 5 + x * 1.3 + 4,
	},
	{
		id: GlyphEffect.tachMultBySac,
		description: (x: number) => `Tachyon Matter gain by ×ln(sac pts + 1)${formatX(x)}`,
		effect: (x: number) => (x + Math.sqrt(x * 0.7) + 1)
	}],

	[GlyphType.infinity]: [{
		id: GlyphEffect.ipReqDiv,
		description: (x: number) => `IP req ${formatX(2, 0, 0)} --> ${formatX(x * 2)} per level`,
		effect: (x: number) => (0.35 / Math.sqrt(x * x / 5000 + x / 20 + 1) + 0.55)
	},
	{
		id: GlyphEffect.imMult,
		description: (x: number) => `All Inf Monomension multipliers ${formatX(x)}`,
		effect: (x: number) => Math.pow(3.4 + x * 1.2, 2),
	},
	{
		id: GlyphEffect.momentumGain,
		description: (x: number) => `Momentum gain ${formatX(x)}`,
		effect: (x: number) => Math.pow(2 + x * 1.2, 2) + 1,
	},
	{
		id: GlyphEffect.momentumDecay,
		description: (x: number) => `Momentum decay ${formatX(x)}`,
		effect: (x: number) => 1 / (Math.pow(3 + x * 1.2, 2.2) + 1),
	}],
};

export const GlyphEffectHandler = {
	effectiveLevel(glyph = player.glyphs.current) {
		if (!glyph) return 0;
		return glyph.level * (glyph.rarity + 0.5) *
			GlyphSacrificeHandler.levelBoost(glyph.type) *
			InfUpgrades.ipBoostGlyphLevel.effectOrDefault(1);
	},
	getEffects(glyph = player.glyphs.current): Partial<Record<GlyphEffect, number>> {
		if (!glyph || !GlyphHandler.isUnlocked) return {};
		const effectiveLevel = this.effectiveLevel(glyph);
		const effects: Partial<Record<GlyphEffect, number>> = {};
		const type = glyph.type;
		for (let i = 0; i < GlyphEffects[type].length; i++) {
			const effectData = GlyphEffects[type][i];
			if (glyph.effects & (1 << i)) effects[effectData.id] = effectData.effect(effectiveLevel);
		}
		return effects;
	},
	getEffectDescriptions(glyph = player.glyphs.current): string {
		let effectString = "";
		if (glyph) {
			const effectiveLevel = this.effectiveLevel(glyph);
			const type = glyph.type;
			for (let i = 0; i < GlyphEffects[type].length; i++) {
				const effectData = GlyphEffects[type][i];
				const effect = effectData.effect(effectiveLevel);
				if (glyph.effects & (1 << i))
					effectString += `- ${effectData.description(effect).replaceAll("\n", "")}\n`;
			}
		}
		return effectString.trim() || "No effects";
	},
	effectOrDefault(effect: GlyphEffect, def: number, glyph = player.glyphs.current) {
		return this.getEffects(glyph)[effect] ?? def;
	}
};