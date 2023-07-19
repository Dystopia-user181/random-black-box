<script setup lang="ts">
import { Absolve } from "@/js/absolve";

import { format } from "@/utils";
</script>

<template>
	<h1>
		I need to clear myself... Of all the weight.
	</h1>
	<button
		class="c-absolve-button c-button-good"
		:disabled="Absolve.hasFinished"
		@click="Absolve.isAbsolving = true;"
	>
		<template v-if="Absolve.hasFinished">
			All is well.
		</template>
		<template v-else-if="Absolve.isAbsolving">
			Absolving yourself of {{ Absolve.displayItem }}...<br>({{ format(Absolve.progress, 2, 3, false) }} / 1.000)
		</template>
		<template v-else>
			Absolve yourself of {{ Absolve.displayItem }}.
		</template>
	</button>
</template>

<style scoped>
.c-absolve-button {
	font-size: 25px;
	width: 600px;
	height: 200px;
	margin: 0 5px;
}
</style>