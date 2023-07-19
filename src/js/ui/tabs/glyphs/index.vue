<script setup lang="ts">
import CurrentGlyphs from "./CurrentGlyphs.vue";
import GlyphSacMenu from "./GlyphSacMenu.vue";
import GlyphUnlock from "./GlyphUnlock.vue";
import ProjectedGlyph from "./ProjectedGlyph.vue";

import { GlyphHandler, GlyphUnlocks } from "@/js/glyphs";

import { player } from "@/js/player";

import { format } from "@/utils";
</script>

<template>
	You have {{ format(player.antimatter) }} antimatter
	<div>
		You have
		<span class="c-game-header__glyph-power">
			{{ format(player.glyphs.glyphPower) }}
		</span>
		(+{{ format(GlyphHandler.powerPerTick) }}/s)
		Glyph Power
	</div>
	<br>
	<div class="c-glyph-unlocks-container">
		<GlyphUnlock
			v-for="(_, i) in GlyphUnlocks"
			:key="'glyph-unlock-' + i"
			:upg-name="i"
		/>
	</div>
	<br>
	<div class="c-glyph-container--top">
		<ProjectedGlyph />
		<GlyphSacMenu />
	</div>
	<br>
	<CurrentGlyphs />
</template>

<style scoped>
.c-game-header__glyph-power {
	font-size: 25px;
	color: var(--colour-glyphs);
}

.c-glyph-container--top {
	display: flex;
	justify-content: center;
}

.c-glyph-unlocks-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 920px;
	margin: auto;
}
</style>