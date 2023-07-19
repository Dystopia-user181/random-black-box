<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";

import { Tab } from "@/js/ui/tabs";
</script>

<template>
	<div class="c-game-ui">
		<div class="c-main-tab">
			<component :is="Tab('current').component" />
		</div>
		<Sidebar />
	</div>
</template>

<style scoped>
.c-game-ui {
	display: flex;
	width: 100%;
	text-align: center;
}

.c-main-tab {
	background-color: #202020;
	overflow: auto;
	position: relative;
	flex: 1 1 auto;
	align-self: stretch;
	justify-self: stretch;
	height: 100vh;
	padding: 30px;
}
</style>