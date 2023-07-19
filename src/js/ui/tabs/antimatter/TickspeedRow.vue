<script setup lang="ts">
import { AMHandler } from "@/js/antimatter";
import { TickspeedUpgrade } from "@/js/antimatter/tickspeed";

import { format, formatInt, formatX } from "@/utils";
</script>

<template>
	<div
		v-if="TickspeedUpgrade.isUnlocked"
		class="c-tickspeed-row"
	>
		<span class="c-tickspeed-row__identifier">
			<span>Tickspeed ({{
				TickspeedUpgrade.amount
			}}{{
				TickspeedUpgrade.freeAmount ? ` + ${formatInt(TickspeedUpgrade.freeAmount)}` : ""
			}})</span>
			<span class="c-tickspeed-row__multiplier-text">
				{{ formatX(TickspeedUpgrade.perUpgrade) }} / upgrade
			</span>
		</span>
		<span class="c-tickspeed-row__amount">
			Time speed: {{ formatX(AMHandler.timeSpeedupFactor) }}
		</span>
		<div class="c-tickspeed-row__buy">
			<button
				class="c-tickspeed-row__buy-button c-button-good"
				:disabled="!TickspeedUpgrade.canAfford"
				@click="TickspeedUpgrade.buy()"
			>
				<span v-if="TickspeedUpgrade.isPurchaseable">
					{{ format(TickspeedUpgrade.cost) }} AM
				</span>
				<span v-else>
					Locked
				</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
.c-tickspeed-row {
	width: 70%;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	padding: 5px;
	margin: auto;
	margin-bottom: 10px;
}

.c-tickspeed-row__identifier {
	grid-column: 1 / 3;
}

.c-tickspeed-row__amount {
	grid-column: 3 / 5;
}

.c-tickspeed-row__identifier,
.c-tickspeed-row__amount {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	text-align: left;
}

.c-tickspeed-row__identifier span {
	margin-right: 6px;
}

.c-tickspeed-row__multiplier-text {
	font-size: 0.7em;
}

.c-tickspeed-row__buy {
	display: flex;
	justify-content: flex-end;
	grid-column: 5 / 8;
}

.c-tickspeed-row__buy-button {
	width: 200px;
}
</style>