<script setup lang="ts">
import { Strikes } from "@/js/strikes";
import { SurgeHandler } from "@/js/antimatter/surge";

import { player } from "@/js/player";

import { format, formatOrder, formatX } from "@/utils";
</script>

<template>
	<div
		v-if="SurgeHandler.isUnlocked"
		class="c-surge-row"
	>
		<span class="c-emphasise-text">SURGE</span>
		<br>
		Select Monomension
		<div class="c-surge-row__choice">
			<button
				v-for="i in player.monomensions.antimatter.unlocks"
				:key="'select-mono-' + i"
				:class="{
					'c-surge-row__choose-button': true,
					'c-button-good': SurgeHandler.selectedMono === i,
					'c-button-unspecified': SurgeHandler.selectedMono !== i
				}"
				:disabled="SurgeHandler.selectedMono !== i && !SurgeHandler.canSwitch"
				@click="SurgeHandler.selectedMono = i;"
			>
				{{ formatOrder(i) }}
			</button>
		</div>
		<template v-if="Strikes[2].isUnlocked">
			Auto-surge: <input
				v-model="player.auto.surge"
				type="checkbox"
			>
			<br>
		</template>
		<br>
		<span v-if="SurgeHandler.effectiveBoostAmount > 0">
			Currently: {{ formatX(SurgeHandler.effect) }} to the
			{{ formatOrder(SurgeHandler.selectedMono) }} Anti Monomension
		</span>
		<br>
		<button
			class="c-surge-row__activate-button c-button-good"
			:disabled="!SurgeHandler.canSurge"
			@click="SurgeHandler.doSurge()"
		>
			<template v-if="SurgeHandler.isAlwaysActive">
				Surge is always active
			</template>
			<template v-else-if="SurgeHandler.canSurge">
				Activate surge
			</template>
			<template v-else>
				Surging... ({{ format(SurgeHandler.boostAmount * SurgeHandler.timePerSurge) }}s)
			</template>
		</button>
	</div>
</template>

<style scoped>
.c-surge-row {
	width: 80%;
	max-width: 600px;
	padding: 10px 30px;
	margin: auto;
	margin-top: 20px;
	border-radius: 6px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	background-color: rgba(255, 255, 255, 0.1);
}

.c-surge-row__choice {
	display: flex;
	width: 100%;
	justify-content: stretch;
}

.c-surge-row__choose-button {
	height: 60px;
	width: 100%;
	margin: 3px;
}

.c-surge-row__activate-button {
	width: 300px;
}
</style>