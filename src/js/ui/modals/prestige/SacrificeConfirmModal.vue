<script setup lang="ts">
import ModalWrapperConfirm from "../ModalWrapperConfirm.vue";

import { SacrificeHandler } from "@/js/antimatter/sacrifice";

import { Modals } from "..";
</script>

<template>
	<ModalWrapperConfirm
		@confirm="
			SacrificeHandler.doSac();
			Modals.hide();
		"
	>
		<template #header>
			Sacrifice Confirmation
		</template>
		Sacrifice will reset all progress in this tab, but give you Sacrifice Points.
		<br>
		Are you sure you want to sacrifice?
	</ModalWrapperConfirm>
</template>