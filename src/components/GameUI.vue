<script setup lang="ts">
import GameCanvas from "./board/GameCanvas.vue";

import AllResearches from "./research/AllResearches.vue";
import PacketsControl from "./PacketsControl.vue";
import ResourceDisplay from "./ResourceDisplay.vue";
import TopButtons from "./TopButtons.vue";
</script>

<template>
	<GameCanvas />
	<TopButtons />
	<PacketsControl />
	<ResourceDisplay />
	<AllResearches />
	<div class="c-game-ui" />
</template>

<style scoped>
.c-game-ui {
	display: flex;
	width: 100%;
	text-align: center;
}

.c-main-tab {
	overflow: auto;
	position: relative;
	flex: 1 1 auto;
	align-self: stretch;
	justify-self: stretch;
	height: 100vh;
	padding: 30px;
}
</style>