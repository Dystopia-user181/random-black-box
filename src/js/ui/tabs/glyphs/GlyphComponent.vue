<script setup lang="ts">
import { GlyphData, GlyphEffectHandler, GlyphTypes } from "@/js/glyphs";

import { formatInt, formatPercents } from "@/utils";

const { glyph } = defineProps<{
	glyph: GlyphData | null
}>();

const effectString = $computed(() => GlyphEffectHandler.getEffectDescriptions(glyph).replaceAll("\n", "<br>"));
</script>

<template>
	<div class="c-glyph-container">
		<slot name="header" />
		<template v-if="glyph">
			<div
				class="c-glyph-display"
				:style="{ 'color': GlyphTypes[glyph.type].colour }"
			>
				<div class="c-glyph-display--level">
					Lvl {{ formatInt(glyph.level) }}
				</div>
				<div class="c-glyph-display--rarity">
					{{ formatPercents(glyph.rarity) }}
				</div>
				{{ GlyphTypes[glyph.type].symbol }}
			</div>
			{{ GlyphTypes[glyph.type].name }} Glyph
		</template>
		<div
			v-else
			class="c-glyph-display--empty"
		/>
		<div
			class="c-glyph-effect-display"
			v-html="effectString"
		/>
		<slot />
	</div>
</template>

<style scoped>
.c-glyph-container {
	width: 200px;
	flex: 0 0 auto;
	padding: 20px 10px;
}

.c-glyph-display {
	position: relative;
	display: flex;
	margin: 0 auto;
	width: 60px;
	height: 60px;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	text-shadow: 0 0 7px;
	background-color: black;
	border: 2px solid;
	font-weight: bold;
}

.c-glyph-display--level {
	position: absolute;
	font-size: 12px;
	line-height: 12px;
	top: 3px;
	right: 3px;
	text-shadow: none;
	font-weight: 600;
}

.c-glyph-display--rarity {
	position: absolute;
	font-size: 12px;
	line-height: 12px;
	bottom: 3px;
	right: 3px;
	text-shadow: none;
	font-weight: 600;
}

.c-glyph-display--empty {
	margin: 0 auto 20px;
	width: 60px;
	height: 60px;
	background-color: rgba(255, 255, 255, 0.3);
}

.c-glyph-effect-display {
	font-size: 12px;
	line-height: 18px;
	width: 100%;
	height: 158px;
	margin-bottom: 10px;
	background-color: rgba(255, 255, 255, 0.2);
	padding: 5px;
	overflow-y: auto;
}
</style>