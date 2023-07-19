<script setup lang="ts">
import GlyphComponent from "./GlyphComponent.vue";

import { GlyphGenerator } from "@/js/glyphs";

import { player } from "@/js/player";
</script>

<template>
	<div class="c-glyph-container--current">
		<GlyphComponent
			class="c-glyph--current"
			:glyph="player.glyphs.current"
		>
			<template #header>
				Current Glyph
				<br>
			</template>
		</GlyphComponent>
		<button
			class="c-button-good c-swap-glyphs-button"
			:disabled="!GlyphGenerator.canSwitchGlyph"
			@click="GlyphGenerator.switchGlyph()"
		>
			&lt;-- Swap --&gt;
		</button>
		<GlyphComponent
			class="c-glyph--backup"
			:glyph="player.glyphs.previous"
		>
			<template #header>
				Backup Glyph
				<br>
			</template>
		</GlyphComponent>
	</div>
</template>

<style scoped>
.c-glyph-container--current {
	display: flex;
	align-items: center;
	max-width: 600px;
	margin: auto;
}

.c-glyph--current {
	border: 2px solid #83c1ed;
	background-color: rgba(11, 109, 179, 0.3);
	border-radius: 10px;
	justify-self: flex-start;
}

.c-glyph--backup {
	border: 2px solid white;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	justify-self: flex-end;
}

.c-swap-glyphs-button {
	justify-self: center;
	margin: auto;
}
</style>