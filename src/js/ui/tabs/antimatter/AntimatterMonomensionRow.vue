<script setup lang="ts">
import { AntimatterMonomension } from "@/js/antimatter/monomensions";

import { format, formatOrder, formatX } from "@/utils";

const { dimId } = defineProps<{
	dimId: number,
}>();

function isValidId(dimId: number): dimId is OneToEight {
	return dimId >= 1 && dimId <= 8;
}

if (!isValidId(dimId)) throw Error(`ID ${dimId} is not 1-8 in AMRow`);

const displayedMono = AntimatterMonomension(dimId);
</script>

<template>
	<div
		v-if="displayedMono.isUnlocked"
		:class="{
			'c-monomensions-row': true,
			'c-monomensions-row--current': displayedMono.isCurrent
		}"
	>
		<span class="c-monomensions-row__identifier">
			<span>{{ formatOrder(dimId) }} Anti Monomension</span>
			<span class="c-monomensions-row__multiplier-text">
				{{ formatX(displayedMono.multiplier) }}
			</span>
		</span>
		<span class="c-monomensions-row__amount">
			{{ format(displayedMono.amount) }} ({{ format(displayedMono.bought, 2, 1) }})
		</span>
		<div
			v-if="displayedMono.isCurrent"
			class="c-monomensions-row__buy"
		>
			<button
				class="c-monomensions-row__buy-button c-button-good"
				:disabled="!displayedMono.canAfford"
				@click="displayedMono.buy()"
			>
				{{ format(displayedMono.cost) }} AM
			</button>
		</div>
	</div>
</template>

<style scoped>
.c-monomensions-row {
	border-radius: 10px;
	width: 90%;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	padding: 5px 5px 5px 10px;
	margin: auto;
	height: 60px;
}

.c-monomensions-row--current {
	background-color: rgba(255, 220, 0, 0.3);
}


.c-monomensions-row__identifier {
	grid-column: 1 / 3;
}

.c-monomensions-row__amount {
	grid-column: 3 / 5;
}

.c-monomensions-row__identifier,
.c-monomensions-row__amount {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	text-align: left;
}

.c-monomensions-row__identifier span {
	margin-right: 6px;
}

.c-monomensions-row__multiplier-text {
	font-size: 0.7em;
}

.c-monomensions-row__buy {
	display: flex;
	justify-content: flex-end;
	grid-column: 5 / 8;
}

.c-monomensions-row__buy-button {
	width: 200px;
}
</style>