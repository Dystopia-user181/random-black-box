<script setup lang="ts">
import { ResearchState } from "@/js/researches";

import { player } from "@/js/player";

const { research } = defineProps<{ research: ResearchState }>();
</script>

<template>
	<button
		v-if="research.isUnlocked && !research.canApply"
		class="c-research-button c-button-good"
		:class="{
			'disabled': !research.canAfford && player.researches[research.id] === -1
		}"
		@click="research.handlePurchase()"
	>
		{{ research.description }}
		<br><br>
		Cost: {{ research.formattedCost }}
		<br>
		<div
			class="c-research-button__progress-bar"
			:style="{
				'width': `${(1 - research.percentageCompletion) * 100}%`
			}"
		/>
	</button>
</template>

<style>
.c-research-button {
	width: 300px;
	padding: 20px 30px;
	margin: 5px;
}

.c-research-button__progress-bar {
	margin-top: 12px;
	height: 4px;
	border-radius: 2px;
}

.c-button-good .c-research-button__progress-bar {
	background-color: var(--colour-good);
}

.c-button-good .disabled .c-research-button__progress-bar {
	background-color: var(--colour-bad);
}
</style>