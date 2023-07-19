<script setup lang="ts">
import { Strikes } from "@/js/strikes";

import { player } from "@/js/player";

import { format, formatOrder } from "@/utils";

const unlocks = $computed(() => player.monomensions.antimatter.maxUnlocks);
</script>

<template>
	You have {{ format(player.antimatter) }} antimatter
	<br>
	<br>
	<i>
		"The rate of everything is supposed to keep you from reaching 1.
		<br>
		Yet you keep consistently doing it.
		<br>
		Maybe we aren't trying hard enough."
	</i>
	<br>
	<br>
	<template v-if="unlocks < 8">
		Next at {{ formatOrder(unlocks + 1) }} Anti Monomensions unlocked
		<br>
	</template>
	<br>
	<template v-if="Strikes[1].isUnlocked">
		<h2>Strike 1</h2>
		Time is dilated based on log(AM + starting AM) - log(starting AM)
		<br>
		Unlock Time Reversal
		<br>
		<br>
	</template>
	<template v-if="Strikes[2].isUnlocked">
		<h2>Strike 2</h2>
		Each unlock weighs thirty instead of ten and tickspeed cost scales more
		<br>
		Unlock Glyphs and Auto-surge
		<br>
		<br>
	</template>
	<template v-if="Strikes[3].isUnlocked">
		<h2>Strike 3</h2>
		Monomensions cap at one real-life second of production and Sacrifice gain and effect formula is worse
		<br>
		Production is spread out over 200 real-life seconds
		("0.1 AM/s" would give you 0.05 AM at 100s and 0.1 AM at 200s)
		<br>
		Unlock Infinity and the Tachyon Engine
		<br>
		Time Reversal continues if a Monomension reaches 0
		<br>
		<br>
	</template>
	<template v-if="unlocks >= 8">
		<h2>Strike 4</h2>
		... I give up. You win.
	</template>
</template>

<style scoped>

</style>