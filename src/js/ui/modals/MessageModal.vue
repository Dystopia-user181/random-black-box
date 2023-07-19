<script setup lang="ts">
import ModalWrapper from "./ModalWrapper.vue";

import { Modals } from ".";

function hide() {
	if (!Modals.isOpen) return;
	if (Modals.current.value?.hide) Modals.current.value.hide();
	else Modals.hide();
}
</script>

<template>
	<modal-wrapper>
		<template #header>
			Info
		</template>
		<br>
		<span
			class="c-message-modal__text"
			v-html="Modals.message.text.value"
		/>
		<br><br>
		<button
			class="c-button-good"
			@click="hide"
		>
			Okay
		</button>
	</modal-wrapper>
</template>

<style scoped>
.c-message-modal__text {
	font-size: 1.2em;
}
</style>