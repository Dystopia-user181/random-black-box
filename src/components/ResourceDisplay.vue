<script setup lang="ts">
import { format } from "@/utils";
import { player } from "@/js/player";

import { Researches } from "@/js/researches";
</script>

<template>
	<div class="c-resource-display">
		Thermal Energy of box: {{ format(player.energy) }}J
		<br>
		Mass of box: {{ format(1 + player.energy / 299792458 / 299792458) }}kg
		<template v-if="Researches.siphon.canApply">
			<br>
			Usable Energy: {{ format(player.usableEnergy) }}J
		</template>
	</div>
</template>

<style scoped>
.c-resource-display {
	position: absolute;
	top: 0;
	left: 0;
	padding: 10px;
	pointer-events: none;
	z-index: 1;
	font-size: 25px;
}
</style>