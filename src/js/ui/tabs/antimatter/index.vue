<script setup lang="ts">
import AntimatterMonomensionRow from "./AntimatterMonomensionRow.vue";
import DilationPanel from "./DilationPanel.vue";
import SacrificeMenu from "./SacrificeMenu.vue";
import SurgeMenu from "./SurgeMenu.vue";
import TickspeedRow from "./TickspeedRow.vue";

import { Strikes } from "@/js/strikes";

import { AMHandler } from "@/js/antimatter";

import { Absolve } from "@/js/absolve";

import { player } from "@/js/player";

import { format, formatOrder, formatX } from "@/utils";

let descendConfirmTimes = $ref(0);
const tryDescendConfirm = (function() {
	let timeout: NodeJS.Timeout;
	return function() {
		descendConfirmTimes++;
		clearTimeout(timeout);
		if (descendConfirmTimes >= 5) {
			descendConfirmTimes = 0;
			AMHandler.descend();
			return;
		}
		timeout = setTimeout(() => descendConfirmTimes = 0, 2000);
	};
}());

let ascendConfirmTimes = $ref(0);
const tryAscendConfirm = (function() {
	let timeout: NodeJS.Timeout;
	return function() {
		ascendConfirmTimes++;
		clearTimeout(timeout);
		if (ascendConfirmTimes >= 5) {
			ascendConfirmTimes = 0;
			AMHandler.ascend();
			return;
		}
		timeout = setTimeout(() => ascendConfirmTimes = 0, 2000);
	};
}());
</script>

<template>
	<h1
		v-if="player.antimatter >= 2"
	>
		Antimatter <b>DI</b>mensions
		<br>
		<br>
		Congratulations for beating the game!
		<br>
		<br>
		Game made for NYIGJ 2023
	</h1>
	<div>
		You have
		<span class="c-game-header__antimatter">
			{{ format(player.antimatter) }} / {{ format(Math.min(AMHandler.cap, AMHandler.postInfCap)) }}
		</span>
		(+{{ format(AMHandler.antimatterPerSec) }}/s) antimatter
	</div>
	<template v-if="!Absolve.hasFinished">
		Weight of unlocks: {{ formatX(1 / AMHandler.slowdownFactor) }} to Monomension multipliers
	</template>
	<template v-if="player.antimatter >= AMHandler.postInfCap">
		<br>
		Reach 1.00 IP to progress to 1.00 Antimatter
	</template>
	<DilationPanel />
	<template v-if="Strikes[3].isUnlocked && !Absolve.hasFinished">
		Time elapsed: {{ format(player.monomensions.antimatter.timeElapsed) }} / {{ format(1) }}
		<br>
		<button
			v-if="AMHandler.timeLeft <= 0"
			class="c-button-good"
			@click="AMHandler.resetRun()"
		>
			Reset run
		</button>
	</template>
	<br>
	<br>
	<TickspeedRow />
	<AntimatterMonomensionRow
		v-for="i in 8"
		:key="i"
		:dim-id="i"
	/>
	<br>
	<button
		v-if="Strikes[3].isUnlocked && !AMHandler.minDescensionReached && !Absolve.hasFinished"
		class="c-dimboost-button c-button-good"
		@click="tryDescendConfirm()"
	>
		<template v-if="descendConfirmTimes <= 0">
			Reset to the {{ formatOrder(player.monomensions.antimatter.unlocks - 1) }} Unlock,
			and while not in the current Unlock {{ formatX(10, 2, 0) }} time speed
		</template>
		<template v-else>
			Click {{ 5 - descendConfirmTimes }} more times to confirm
		</template>
	</button>
	<button
		v-if="Strikes[3].isUnlocked && !AMHandler.maxAscensionReached && !Absolve.hasFinished"
		class="c-dimboost-button c-button-good"
		@click="tryAscendConfirm()"
	>
		<template v-if="ascendConfirmTimes <= 0">
			Reset to the {{ formatOrder(player.monomensions.antimatter.unlocks + 1) }} Unlock,
			and while not in the current Unlock {{ formatX(10, 2, 0) }} time speed
		</template>
		<template v-else>
			Click {{ 5 - ascendConfirmTimes }} more times to confirm
		</template>
	</button>
	<button
		v-if="player.antimatter >= AMHandler.cap && player.monomensions.antimatter.unlocks < 8 &&
			player.monomensions.antimatter.unlocks >= player.monomensions.antimatter.maxUnlocks && !Absolve.hasFinished"
		class="c-dimboost-button c-button-good"
		@click="AMHandler.ascend()"
	>
		Reset your Antimatter and carry the Weight of an Unlock, but unlock Something New
	</button>
	<SacrificeMenu />
	<SurgeMenu />
</template>

<style scoped>
.c-game-header__antimatter {
	font-size: 25px;
	color: var(--colour-antimatter);
}

.c-dimboost-button {
	font-size: 14px;
	vertical-align: middle;
	width: 300px;
	height: 80px;
	margin: 0 5px;
}
</style>