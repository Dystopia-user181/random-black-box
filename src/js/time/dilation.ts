import { Strikes } from "@/js/strikes";

import { AMHandler } from "@/js/antimatter";

import { TimeRebuyables } from ".";

import { GlyphEffect, GlyphEffectHandler } from "@/js/glyphs";

import { Absolve } from "@/js/absolve";

import { player } from "@/js/player";

export const TimeDilationHandler = {
	get isUnlocked() {
		return Strikes[1].isUnlocked && !Absolve.hasRemoved("Dilation");
	},
	get dilationFactor() {
		if (!this.isUnlocked) return 1;
		let start = AMHandler.baseAM;
		start *= Math.pow(10, GlyphEffectHandler.effectOrDefault(GlyphEffect.dilNerf, 0));
		let base = Math.log10(Math.max(player.antimatter, 0) + start) - Math.log10(start);
		base *= TimeRebuyables.dilNerf.effectOrDefault(1);
		return Math.pow(Math.max(base, 0) * 2 + 1, 2);
	}
};