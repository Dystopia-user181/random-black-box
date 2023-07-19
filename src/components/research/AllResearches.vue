<script setup lang="ts">
import SingleResearch from "./SingleResearch.vue";

import { Researches } from "@/js/researches";
</script>

<template>
	<div class="c-research-list">
		<SingleResearch
			v-for="research in Researches"
			:key="research.id"
			:research="research"
		/>
	</div>
</template>

<style scoped>
.c-research-list {
	position: absolute;
	right: 0;
	bottom: 0;
}
</style>