import { GlyphEffectHandler, GlyphEffects, GlyphType, GlyphTypes, GlyphUnlocks } from ".";

import { player } from "@/js/player";

import { arr, enumAsArray } from "@/utils";

export interface GlyphData {
	type: GlyphType,
	level: number,
	effects: number,
	rarity: number,
}

export const GlyphGenerator = {
	get canGenerate() {
		return player.glyphs.glyphPower >= 1;
	},
	get newLevel() {
		return Math.floor(Math.pow(player.glyphs.glyphPower, 1 / 2.8));
	},
	get nextAt() {
		return Math.pow(this.newLevel + 1, 2.8);
	},
	newRarity(type: GlyphType) {
		if (GlyphUnlocks.always100.effect) return 1;
		const rng = Math.random();
		return Math.min(
			Math.pow(rng, 0.3) * (0.35 + GlyphSacrificeHandler.rarityBoost(type)) + Math.pow(rng, 10) * 0.2,
			1
		);
	},
	randomEffects(type: GlyphType) {
		const rng = Math.random();
		// eslint-disable-next-line no-nested-ternary
		const rareEffectNumber = GlyphUnlocks.threeEffects.effect ? 3 : 1;
		const effectsNumber = Math.min(rng < 0.3 ? rareEffectNumber : 2, GlyphEffects[type].length);
		const effectsArray = Array.from(Array(GlyphEffects[type].length), (_, i) => 1 << i);
		let effects = 0;
		for (let i = 0; i < effectsNumber; i++) {
			const randomIdx = Math.floor(Math.random() * effectsArray.length);
			effects |= effectsArray[randomIdx];
			effectsArray.splice(randomIdx, 1);
		}
		return effects;
	},

	makeNewGlyph(force = false) {
		if (player.glyphs.projected) player.glyphs.projected.level = this.newLevel;
		if (GlyphUnlocks.always100.effect && player.glyphs.projected) player.glyphs.projected.rarity = 1;
		if (player.glyphs.projected && !force) return;
		const type = arr(enumAsArray(GlyphType).filter(x => GlyphTypes[x].isUnlocked)).random;
		player.glyphs.projected = {
			type,
			level: this.newLevel,
			effects: this.randomEffects(type),
			rarity: this.newRarity(type),
		};
	},
	useNewGlyph() {
		player.glyphs.previous = player.glyphs.current;
		player.glyphs.current = player.glyphs.projected;
		player.glyphs.projected = null;
		player.glyphs.glyphPower = 0;
	},
	discardNewGlyph() {
		if (!player.glyphs.projected) return;
		GlyphSacrificeHandler.doSac();
		player.glyphs.projected = null;
		player.glyphs.glyphPower /= 4;
	},
	get canSwitchGlyph() {
		return player.glyphs.previous !== null && player.glyphs.current !== null;
	},
	switchGlyph() {
		if (!this.canSwitchGlyph) return;
		[player.glyphs.previous, player.glyphs.current] = [player.glyphs.current, player.glyphs.previous];
	}
};

export const GlyphSacrificeHandler = {
	get isUnlocked() {
		return GlyphUnlocks.glyphSac.effect;
	},
	sacrificeAmount(glyph: GlyphData | null) {
		if (!glyph) return 0;
		return Math.sqrt(GlyphEffectHandler.effectiveLevel(glyph)) * 2 + 0.5;
	},
	doSac(glyph = player.glyphs.projected) {
		if (!this.isUnlocked || !glyph) return;
		player.glyphs.sacrifice[glyph.type] += this.sacrificeAmount(glyph);
	},
	rarityBoost(type: GlyphType) {
		const x = player.glyphs.sacrifice[type];
		return (1 - Math.exp(1 - Math.log(x ** 0.9 / 100 + Math.E) ** 3)) * 0.55;
	},
	levelBoost(type: GlyphType) {
		if (!GlyphUnlocks.glyphSacEffect.effect) return 1;
		const x = player.glyphs.sacrifice[type];
		return 1 + Math.log10(x + 1) / 15;
	},
};