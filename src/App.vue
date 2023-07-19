<script setup lang="ts">
import GameUI from "./components/GameUI.vue";
import PopupModal from "@/js/ui/modals/PopupModal.vue";

import { Modals } from "@/js/ui/modals";
</script>

<template>
	<div class="c-container">
		<GameUI />
		<PopupModal
			v-if="Modals.current.value"
			:modal="Modals.current.value"
		/>
	</div>
</template>

<style scoped>
.c-container {
	min-height: 100vh;
	display: flex;
	align-items: center;
	overflow: hidden;
	position: relative;
}
</style>