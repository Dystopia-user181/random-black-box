<script setup lang="ts">
import { Modals } from "@/js/ui/modals";
</script>

<template>
	<i
		class="fas fa-gear"
		@click="Modals.settings.show()"
	/>
	<i
		class="fas fa-circle-info"
		@click="Modals.info.show()"
	/>
</template>

<style scoped>
.fa-circle-info,
.fa-gear {
	cursor: pointer;
	position: absolute;
	font-size: 40px;
	top: 10px;
}

.fa-circle-info {
	right: 60px;
}

.fa-gear {
	right: 10px;
	transition: transform 0.6s;
}

.fa-gear:hover {
	transform: rotate(120deg);
}
</style>