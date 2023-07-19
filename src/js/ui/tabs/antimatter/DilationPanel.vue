<script setup lang="ts">
import { TimeDilationHandler, TimeReversal } from "@/js/time";

import { player } from "@/js/player";

import { format, formatX } from "@/utils";
</script>

<template>
	<div
		v-if="TimeDilationHandler.isUnlocked"
		class="c-time-dilation-menu"
	>
		<br>
		Time is {{ formatX(TimeDilationHandler.dilationFactor) }} dilated
		<br>
		You have {{ format(player.time.tachyonMatter) }} Tachyon matter
		<br>
		<button
			class="c-time-reversal__button c-button-good"
			@click="TimeReversal.toggle()"
		>
			<template v-if="TimeReversal.isActive">
				Stop reversing time
			</template>
			<template v-else>
				Reverse time to gain Tachyon matter until any Monomension reaches 0
			</template>
		</button>
	</div>
</template>

<style scoped>
.c-time-reversal__button {
	font-size: 13px;
	width: 250px;
	height: 75px;
}
</style>