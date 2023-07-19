<script setup lang="ts">
import ModalWrapper from "./ModalWrapper.vue";

import { player, Player } from "@/js/player";

import { Modals } from ".";


// https://github.com/microsoft/TypeScript/issues/31816#issuecomment-593069149
type FileEventTarget = EventTarget & { files: FileList };
type FileEvent = Event & { target: FileEventTarget };
function hasFile(event: Event | FileEvent): event is FileEvent {
	return event.target !== null && ("files" in event.target);
}

function importSave() {
	const input = document.createElement("input");
	input.type = "file";

	input.addEventListener("change", (e: Event | FileEvent) => {
		if (hasFile(e)) Player.importSave(e);
	});

	input.click();
}

function getOptionsText(option: keyof typeof player.options) {
	return player.options[option] ? "ON" : "OFF";
}

function toggleOption(option: keyof typeof player.options) {
	player.options[option] = Number(!player.options[option]);
}
</script>

<template>
	<modal-wrapper class="c-modal__settings">
		<template #header>
			Settings
		</template>
		<button
			class="c-settings-button"
			@click="Player.savePlayer()"
		>
			Save
		</button>
		<button
			class="c-settings-button"
			@click="toggleOption('autosave')"
		>
			Autosave: {{ getOptionsText("autosave") }}
		</button>
		<br>
		<button
			class="c-settings-button"
			@click="Player.exportSave()"
		>
			Export Save
		</button>
		<button
			class="c-settings-button"
			@click="importSave"
		>
			Import Save
		</button>
		<button
			class="c-settings-button"
			@click="Modals.hardReset.show()"
		>
			HARD RESET
		</button>
	</modal-wrapper>
</template>

<style scoped>
.c-modal__settings {
	width: 620px;
	height: 400px;
}

.c-settings-button {
	width: 200px;
	height: 100px;
	font-size: 18px;
	margin: 3px;
	vertical-align: middle;
}

.c-settings-button:hover {
	box-shadow: 0 0 10px 1px white;
}
</style>