<script setup lang="ts">
import { AMHandler } from "@/js/antimatter";
import { SacrificeHandler } from "@/js/antimatter/sacrifice";

import { Absolve } from "@/js/absolve";

import { Modals } from "@/js/ui/modals";

import { player } from "@/js/player";

import { format, formatOrder, formatX } from "@/utils";
</script>

<template>
	<div
		v-if="player.monomensions.antimatter.unlocks >= 3 && !Absolve.hasFinished"
		class="c-sacrifice-menu"
	>
		You have {{ format(player.monomensions.antimatter.sacrifice) }} Sacrifice Points, boosting the
		{{ formatOrder(player.monomensions.antimatter.unlocks) }} Anti Monomension by
		{{ formatX(SacrificeHandler.effect) }} (x<sup>{{ format(SacrificeHandler.sacPow, 2, 2) }}</sup>)
		<br>
		Rough sacrifice formula: (AM - {{ format(AMHandler.baseAM) }}) *
		({{ formatOrder(player.monomensions.antimatter.unlocks) }} mono)<sup>2</sup>
		<br>
		<button
			class="c-sacrifice-menu__button c-button-good"
			:disabled="!SacrificeHandler.canSac"
			@click="Modals.sacrifice.show()"
		>
			<template v-if="SacrificeHandler.canSac">
				Reset your Antimatter and Anti Monomensions for {{ format(SacrificeHandler.sacAmount) }}
				Sacrifice Points
			</template>
			<template v-else>
				Reach {{ format(AMHandler.baseAM) }} AM and buy the
				{{ formatOrder(player.monomensions.antimatter.unlocks) }} Anti Monomension to sacrifice
			</template>
		</button>
		<template v-if="SacrificeHandler.sacAmount > SacrificeHandler.softcapThreshold">
			<br>
			Beyond 1e10, Sacrifice Point gain is (softcapped) to sqrt(1e10(2x - 1e10))
			<br>
			<i>
				"Capped at 1, but no one tell what does 1 mean. It can even be 1 thousand.
				Also no one tell you what does cap mean, a hardcap or a softcap." - 3^3=7
			</i>
		</template>
	</div>
</template>

<style scoped>
.c-sacrifice-menu {
	margin-top: 7px;
}

.c-sacrifice-menu__button {
	font-size: 13px;
	width: 250px;
	height: 75px;
}
</style>