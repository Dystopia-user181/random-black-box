<script setup lang="ts">
import { TimeUpgrades } from "@/js/time/upgrades";

import { format } from "@/utils";

const { upgName } = defineProps<{
	upgName: keyof typeof TimeUpgrades
}>();

const upgrade = TimeUpgrades[upgName];
</script>

<template>
	<button
		v-if="upgrade.isUnlocked"
		class="c-time-upgrade"
		:class="{
			'c-button-good': !upgrade.isBought,
			'c-time-upgrade--selected': upgrade.canApply,
			'c-time-upgrade--bought': upgrade.isBought
		}"
		:disabled="!upgrade.isBought && !upgrade.canAfford"
		@click="upgrade.buy(); upgrade.select();"
	>
		<span v-html="upgrade.description" />
		<span v-if="!upgrade.isBought">
			<br>
			Cost: {{ format(upgrade.cost, 2, 2) }} Tachyon Matter
		</span>
		<span v-if="upgrade.canApply">
			<br>
			(Selected)
		</span>
	</button>
</template>

<style scoped>
.c-time-upgrade {
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

.c-time-upgrade--bought {
	border: 1px solid var(--colour-dilation);
	box-shadow: 0 0 5px 1px inset var(--colour-dilation);
	background-color: transparent;
	color: black;
}

.c-time-upgrade--bought::before {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;
	border-radius: inherit;
	z-index: -1;
	opacity: 0.7;
	background: linear-gradient(45deg, white, var(--colour-dilation));
}

.c-time-upgrade--selected {
	border: 2px solid rgba(0, 0, 0, 0.5);
	background-color: #00bcd4;
	cursor: default;
	box-shadow: none;
}

.c-time-upgrade--selected::before {
	opacity: 0.4;
}
</style>