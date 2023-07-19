<script setup lang="ts">
import TachyonEngines from "./TachyonEngines.vue";
import TimeRebuyable from "./TimeRebuyable.vue";
import TimeUpgrade from "./TimeUpgrade.vue";

import { TimeDilationHandler, TimeRebuyables, TimeReversal, TimeUpgrades } from "@/js/time";

import { player } from "@/js/player";

import { format, formatX } from "@/utils";
</script>

<template>
	You have {{ format(player.antimatter) }} antimatter
	<br>
	Time is {{ formatX(TimeDilationHandler.dilationFactor) }} dilated
	<div>
		You have
		<span class="c-game-header__tachyon-particles">
			{{ format(player.time.tachyonMatter) }}
		</span>
		<template v-if="TimeReversal.tpPerSec > 0">
			(+{{ format(TimeReversal.tpPerSec) }}/s)
		</template>
		<template v-else-if="TimeReversal.tpPerSec < 0">
			(-{{ format(-TimeReversal.tpPerSec) }}/s)
		</template>
		Tachyon Matter
	</div>
	<br>
	<button
		class="c-time-reversal__button c-button-good"
		@click="TimeReversal.toggle()"
	>
		<template v-if="TimeReversal.isActive">
			Stop reversing time
		</template>
		<template v-else>
			Reverse time to gain Tachyon Matter until any Monomension reaches 0
		</template>
	</button>
	<br>
	<TachyonEngines />
	<br>
	<div class="c-time-upgrades-container">
		<TimeUpgrade
			v-for="(_, i) in TimeUpgrades"
			:key="'time-upgrade-' + i"
			:upg-name="i"
		/>
	</div>
	<br>
	<br>
	<div
		v-if="player.time.upgrades > 0"
		class="c-time-upgrades-container"
	>
		<TimeRebuyable
			v-for="(_, i) in TimeRebuyables"
			:key="'time-rebuyable-' + i"
			:upg-name="i"
		/>
	</div>
</template>

<style scoped>
.c-game-header__tachyon-particles {
	font-size: 25px;
	color: var(--colour-dilation);
}

.c-time-reversal__button {
	font-size: 13px;
	width: 250px;
	height: 75px;
}

.c-time-upgrades-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 920px;
	margin: auto;
}
</style>