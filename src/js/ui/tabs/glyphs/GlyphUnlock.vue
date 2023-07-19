<script setup lang="ts">
import { GlyphUnlocks } from "@/js/glyphs";

import { format } from "@/utils";

const { upgName } = defineProps<{
	upgName: keyof typeof GlyphUnlocks
}>();

const upgrade = GlyphUnlocks[upgName];
</script>

<template>
	<button
		v-if="upgrade.isUnlocked"
		class="c-glyph-unlock"
		:class="{
			'c-button-good': !upgrade.isBought,
			'c-glyph-unlock--bought': upgrade.isBought
		}"
		:disabled="!upgrade.isBought && !upgrade.canAfford"
		@click="upgrade.buy();"
	>
		<span v-html="upgrade.description" />
		<span v-if="!upgrade.isBought">
			<br>
			Cost: {{ format(upgrade.cost, 2, 2) }} {{ upgrade.currencyDisplay }}
		</span>
	</button>
</template>

<style scoped>
.c-glyph-unlock {
	position: relative;
	width: 220px;
	height: 110px;
	margin: 3px;
	padding: 0 15px;
	font-size: 13px;
	transition: all 0.2s;
	vertical-align: top;
	z-index: 0;
}

.c-glyph-unlock--bought {
	border: 1px solid var(--colour-glyphs);
	box-shadow: 0 0 5px 1px inset var(--colour-glyphs);
	background-color: rgba(255, 255, 255, 0.7);
	color: black;
	cursor: default;
}

.c-glyph-unlock--bought::before {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;
	border-radius: inherit;
	z-index: -1;
	opacity: 0.6;
	background: linear-gradient(45deg, transparent, var(--colour-glyphs));
}
</style>