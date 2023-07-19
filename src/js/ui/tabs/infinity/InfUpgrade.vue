<script setup lang="ts">
import { InfUpgrades } from "@/js/infinity";

import { format } from "@/utils";

const { upgName } = defineProps<{
	upgName: keyof typeof InfUpgrades
}>();

const upgrade = InfUpgrades[upgName];
</script>

<template>
	<button
		v-if="upgrade.isUnlocked"
		class="c-inf-upgrade"
		:class="{
			'c-button-good': !upgrade.isBought,
			'c-inf-upgrade--bought': upgrade.isBought
		}"
		:disabled="!upgrade.isBought && !upgrade.canAfford"
		@click="upgrade.buy();"
	>
		<span class="c-emphasise-text">{{ upgrade.title }}</span>
		<br>
		<span v-html="upgrade.description" />
		<span v-if="!upgrade.isBought">
			<br>
			Cost: {{ format(upgrade.cost, 2, 2) }} IP
		</span>
	</button>
</template>

<style scoped>
.c-inf-upgrade {
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

.c-inf-upgrade--bought {
	border: 1px solid var(--colour-infinity);
	box-shadow: 0 0 5px 1px inset var(--colour-infinity);
	background-color: rgba(255, 255, 255, 0.7);
	color: black;
	cursor: default;
}

.c-inf-upgrade--bought::before {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;
	border-radius: inherit;
	z-index: -1;
	opacity: 0.9;
	background: linear-gradient(45deg, transparent, var(--colour-infinity));
}
</style>