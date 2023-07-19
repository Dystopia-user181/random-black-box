<script setup lang="ts">
import GlyphComponent from "./GlyphComponent.vue";

import { GlyphGenerator, GlyphSacrificeHandler, GlyphUnlocks } from "@/js/glyphs";

import { player } from "@/js/player";

import { formatInt, formatPercents } from "@/utils";
</script>

<template>
	<div class="c-glyph-container--projected">
		<GlyphComponent :glyph="player.glyphs.projected">
			<template #header>
				Projected Glyph
				<br>
			</template>
			<button
				class="c-glyph-choice-button c-button-good"
				:disabled="!player.glyphs.projected"
				@click="GlyphGenerator.useNewGlyph()"
			>
				Use
			</button>
			<button
				class="c-glyph-choice-button c-button-good"
				:disabled="!player.glyphs.projected"
				@click="GlyphGenerator.discardNewGlyph()"
			>
				Discard
			</button>
		</GlyphComponent>
		<div class="c-projected-glyph-info">
			<div class="c-projected-glyph-info__progress-bar-wrapper">
				<div
					class="c-projected-glyph-info__progress-bar-progress"
					:style="{
						width: `${Math.min(player.glyphs.glyphPower, 1) * 100}%`
					}"
				/>
			</div>
			<br>
			Projected Glyph Level:
			{{ formatInt(GlyphGenerator.newLevel) }}
			<template v-if="GlyphUnlocks.noCap.effect">
				(Next at {{ formatInt(GlyphGenerator.nextAt) }} Glyph Power)
			</template>
			<br>
			Projected Glyph Rarity:
			{{ player.glyphs.projected ? formatPercents(player.glyphs.projected.rarity) : "???" }}
			<br>
			<br>
			<span class="c-glyph-h2p">
				Using a new Glyph will replace your backup Glyph with your current one and your current glyph
				with the new one. Discarding a new Glyph refunds 25% of the Glyph Power cost {{
					GlyphSacrificeHandler.isUnlocked
						? "and gives the corresponding Glyph's Sacrifice Points"
						: ""
				}}.
			</span>
			<br>
			<span v-if="GlyphUnlocks.autoSac.effect">
				Auto-discard: <input
					v-model="player.auto.discard"
					type="checkbox"
				>
			</span>
		</div>
	</div>
</template>

<style scoped>
.c-glyph-container--projected {
	display: flex;
	align-items: center;
	height: 350px;
	max-width: 700px;
	border: 2px solid white;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
}

.c-glyph-choice-button {
	padding: 3px 4px;
	margin: 2px;
	width: 90%;
	font-size: 14px;
}

.c-projected-glyph-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 40px;
	width: 100%;
}

.c-projected-glyph-info__progress-bar-wrapper {
	width: 80%;
	height: 60px;
	border: 2px solid white;
	box-shadow: 0 0 10px 1px inset var(--colour-glyphs);
	border-radius: 10px;
	overflow: hidden;
}

.c-projected-glyph-info__progress-bar-progress {
	height: 100%;
	background-color: var(--colour-glyphs);
}

.c-glyph-h2p {
	font-size: 13px;
	line-height: 20px;
}
</style>