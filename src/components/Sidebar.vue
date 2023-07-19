<script setup lang="ts">
import { Modals } from "@/js/ui/modals";
import { Tabs } from "@/js/ui/tabs";

import { Absolve } from "@/js/absolve";

import { player } from "@/js/player";
</script>

<template>
	<div class="c-sidebar">
		<h2 class="c-sidebar__header">
			<i
				class="fas fa-gear"
				@click="Modals.settings.show()"
			/>
			<i
				class="fas fa-circle-info"
				@click="Modals.info.show()"
			/>
		</h2>
		<button
			v-for="tab in Tabs"
			:key="'tab-' + tab.id"
			:class="{
				'c-sidebar__tab-button': true,
				'c-sidebar__tab-button--enabled': tab.isUnlocked,
				'c-sidebar__tab-button--current': tab.isCurrent ||
					(player.absolve === tab.config.tieAbsolve && Absolve.isAbsolving)
			}"
			:style="player.absolve === tab.config.tieAbsolve && Absolve.isAbsolving ? {
				filter: `brightness(${1 + Absolve.progress * 10})`
			} : {}"
			@click="tab.setCurrent()"
		>
			<span v-if="tab.isUnlocked">{{ tab.name }}</span>
			<span
				v-else
				class="fas fa-lock"
			/>
		</button>
	</div>
</template>

<style scoped>
.c-sidebar {
	width: 160px;
	max-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: stretch;
	background: linear-gradient(to bottom, #351616, #501020);
	border-left: 1px solid var(--colour-antimatter);
	flex: 0 0 auto;
}

.c-sidebar__header {
	text-align: right;
	font-size: 23px;
	width: 100%;
	margin: 0;
	padding: 10px;
	border-bottom: 1px solid var(--colour-antimatter);
}

.c-sidebar__header .fas {
	cursor: pointer;
	margin: 0 5px;
}

.c-sidebar__header .fa-gear {
	transition: transform 0.6s;
}

.c-sidebar__header .fa-gear:hover {
	transform: rotate(120deg);
}

.c-sidebar__tab-button {
	opacity: 0.7;
	background-color: transparent;
	border-radius: 0;
	cursor: default;
	border: none;
	border-bottom: 1px solid var(--colour-antimatter);
	width: 100%;
}

.c-sidebar__tab-button--enabled {
	opacity: 1;
	cursor: pointer;
}

.c-sidebar__tab-button--enabled:hover,
.c-sidebar__tab-button--current {
	background-color: var(--colour-antimatter);
	color: black;
}
</style>