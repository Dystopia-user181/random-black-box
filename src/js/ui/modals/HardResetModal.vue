<script setup lang="ts">
import ModalWrapperConfirm from "./ModalWrapperConfirm.vue";

import { Player } from "@/js/player";

import { Modals } from ".";
</script>

<template>
	<modal-wrapper-confirm
		@confirm="
			Player.reset();
			Modals.hide();
		"
	>
		<template #header>
			Hard reset
		</template>
		Are you sure you want to perform a hard reset?
		<br>
		Doing so will not give you any benefits, and your save data will be irretrievable.
		<br>
		Make a backup export first if you aren't sure.
	</modal-wrapper-confirm>
</template>