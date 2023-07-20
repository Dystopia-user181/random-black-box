<script setup lang="ts">
import { ResearchState } from "@/js/researches";

import { player } from "@/js/player";

import { format } from "@/utils";

const { research } = defineProps<{ research: ResearchState }>();
</script>

<template>
	<button
		v-if="research.isUnlocked && !research.canApply"
		class="c-research-button c-button-good"
		:class="{
			'disabled': !research.canAfford && player.researches[research.id] === -1
		}"
		@click="research.buy()"
	>
		{{ research.description }}
		<br><br>
		<template v-if="player.researches[research.id] === -1">
			Cost: {{ research.formattedCost }}
		</template>
		<template v-else>
			Time left: {{ format((1 - research.percentageCompletion) * research.timeRequirement) }}s
		</template>
		<br>
		<div
			v-if="!research.canApply"
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

.c-button-good.disabled .c-research-button__progress-bar {
	background-color: var(--colour-bad);
}
</style>