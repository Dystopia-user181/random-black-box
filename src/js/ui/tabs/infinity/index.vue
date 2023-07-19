<script setup lang="ts">
import InfinityMonomensionRow from "./InfinityMonomensionRow.vue";
import InfUpgrade from "./InfUpgrade.vue";
import TachyonEngines from "../time/TachyonEngines.vue";

import { TimeDilationHandler } from "@/js/time";

import { InfHandler, InfinityMonomension, InfUpgrades } from "@/js/infinity";

import { player } from "@/js/player";

import { format, formatX } from "@/utils";
</script>

<template>
	You have {{ format(player.antimatter) }} antimatter
	<br>
	Time is {{ formatX(TimeDilationHandler.dilationFactor) }} dilated
	<div>
		You have
		<span class="c-game-header__infinity-points">
			{{ format(player.infinity.ip, 2, 2) }} / 1.00
		</span>
		Infinity Points
	</div>
	<TachyonEngines />
	<br>
	<div class="c-inf-upgrades-container">
		<InfUpgrade
			v-for="(_, i) in InfUpgrades"
			:key="'inf-upgrade-' + i"
			:upg-name="i"
		/>
	</div>
	<br>
	<div>
		You have
		<span class="c-game-header__infinity-points">
			{{ format(player.infinity.infPow) }}
		</span>
		(+{{ format(InfinityMonomension(1).effect) }}/s)
		Infinity Power, boosting Anti Monomensions by {{ formatX(InfHandler.infPowEffect) }}
		(x<sup>{{ format(InfHandler.infPowPower, 2, 2) }}</sup>)
		<br>
	</div>
	<InfinityMonomensionRow
		v-for="i in 8"
		:key="i"
		:dim-id="i"
	/>
</template>

<style scoped>
.c-game-header__infinity-points {
	font-size: 25px;
	color: var(--colour-infinity);
}

.c-inf-upgrades-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 920px;
	margin: auto;
}
</style>