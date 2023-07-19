<script setup lang="ts">
import { Packets } from "@/js/energy-packets";
import { player } from "@/js/player";
</script>

<template>
	<div class="c-packets-control">
		<button
			class="c-fire-button"
			:class="Packets.canFire ? 'c-button-unspecified' : 'disabled'"
			@click="Packets.fire()"
		>
			Fire
		</button>
		<br>
		<button
			class="c-rotate-button c-button-unspecified"
			@click="player.packets.turretDirection += Math.PI / 8"
		>
			↻
		</button>
		<button
			class="c-rotate-button c-button-unspecified"
			@click="player.packets.turretDirection -= Math.PI / 8"
		>
			↺
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

.c-fire-button {
	width: 120px;
	height: 50px;
	font-size: 20px;
	margin: 5px;
}

.c-rotate-button {
	width: 55px;
	height: 55px;
	margin: 5px;
	font-size: 25px;
}
</style>