<script setup lang="ts">
import { LaserBuilder } from "@/js/laser-builder";
import { Packets } from "@/js/energy-packets";
import { player } from "@/js/player";

import { format } from "@/utils";
</script>

<template>
	<div class="c-packets-control">
		<template v-if="LaserBuilder.isUnlocked">
			<button
				class="c-laser-button"
				:class="LaserBuilder.canAfford || player.lasers.isBuilding ? 'c-button-good' : 'disabled'"
				@click="player.lasers.isBuilding ? LaserBuilder.stopBuild() : LaserBuilder.startBuild()"
			>
				<template v-if="player.lasers.isBuilding">
					Stop placing laser
				</template>
				<template v-else>
					Place laser.<br>Cost: {{ format(LaserBuilder.cost) }} J usable energy
				</template>
			</button>
			<br>
			<button
				class="c-laser-button c-button-unspecified"
				@click="LaserBuilder.isDeleting ? LaserBuilder.isDeleting = false : LaserBuilder.startRefund()"
			>
				<template v-if="LaserBuilder.isDeleting">
					Stop deleting lasers
				</template>
				<template v-else>
					Delete lasers
				</template>
			</button>
			<br>
		</template>
		<button
			class="c-fire-button"
			:class="Packets.canFire ? 'c-button-unspecified' : 'disabled'"
			@click="Packets.fire()"
		>
			Fire
			<template v-if="Packets.isLaserActive">
				({{ format((Packets.laserTime - player.lastTick + player.packets.lastFire) / 1000) }}s)
			</template>
		</button>
		<br>
		<button
			class="c-rotate-button c-button-unspecified"
			@click="player.packets.turretDirection -= Math.PI / 8"
		>
			↺
		</button>
		<button
			class="c-rotate-button c-button-unspecified"
			@click="player.packets.turretDirection += Math.PI / 8"
		>
			↻
		</button>
	</div>
</template>

<style scoped>
.c-packets-control {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 10px;
	z-index: 1;
}

.c-laser-button {
	width: 200px;
	height: 70px;
	font-size: 14px;
	margin: 5px;
}

.c-fire-button {
	width: 120px;
	height: 70px;
	font-size: 16px;
	margin: 5px;
}

.c-rotate-button {
	width: 55px;
	height: 55px;
	margin: 5px;
	font-size: 25px;
}
</style>