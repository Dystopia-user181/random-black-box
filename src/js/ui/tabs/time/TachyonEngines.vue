<script setup lang="ts">
import { TachyonEngine } from "@/js/time/engines";
import { TimeRebuyables } from "@/js/time";

import { InfHandler } from "@/js/infinity";

import { format, formatPercents, formatX } from "@/utils";
</script>

<template>
	<div
		v-if="TachyonEngine.isUnlocked"
		class="c-tachyon-engine-row"
	>
		<span class="c-emphasise-text">Tachyon Engine</span>
		<br>
		<br>
		<div
			class="c-progress-bar"
			:style="{
				'--bar-fill-colour': 'var(--colour-infinity)',
				'--bar-fill': `${InfHandler.progressToNext / InfHandler.progressRequired * 100}%`
			}"
		/>
		Progress to next IP: {{ formatPercents(InfHandler.progressToNext / InfHandler.progressRequired) }}
		(+{{
			formatPercents(TachyonEngine.momentum * TachyonEngine.momentumToProgress / InfHandler.progressRequired)
		}}/s)
		<br>
		<br>
		<div
			class="c-progress-bar"
			:style="{
				'--bar-fill-colour': 'var(--colour-dilation)',
				'--bar-fill': `${TachyonEngine.momentum * TachyonEngine.lossFactor / TachyonEngine.production * 100}%`
			}"
		/>
		Momentum: {{ format(TachyonEngine.momentum) }}
		(+{{ format(TachyonEngine.isOn ? TachyonEngine.production : 0) }}/s,
		-{{ formatPercents(TachyonEngine.lossFactor) }} of total/s)
		<br>
		<template v-if="TachyonEngine.momentum < TachyonEngine.glyphPowBoostAt">
			New effect at {{ format(TachyonEngine.glyphPowBoostAt) }} momentum
		</template>
		<template v-else>
			{{ formatX(TachyonEngine.glyphPowBoost) }} to Glyph Power Gain
		</template>
		<br>
		<button
			class="c-button-good"
			@click="TachyonEngine.isOn = !TachyonEngine.isOn;"
		>
			Switch {{ TachyonEngine.isOn ? "OFF" : "ON" }}
		</button>
		<br>
		<div :style="TachyonEngine.isOn ? {} : { opacity: 0.7 }">
			Engine Activity: {{ TachyonEngine.isOn ? `Level ${TachyonEngine.level}` : "OFF" }}, consuming
			{{ format(TachyonEngine.consumption) }} Tachyon Matter/s
			<br>
			<button
				class="c-button-good"
				:disabled="TachyonEngine.isMinLevel"
				@click="TachyonEngine.level = 0;"
			>
				0
			</button>
			<button
				class="c-button-good"
				:disabled="TachyonEngine.isMinLevel"
				@click="TachyonEngine.level--;"
			>
				-
			</button>
			<button
				class="c-button-good"
				:disabled="TachyonEngine.isMaxLevel"
				@click="TachyonEngine.level++;"
			>
				+
			</button>
			<button
				class="c-button-good"
				:disabled="TachyonEngine.isMaxLevel"
				@click="TachyonEngine.level = TimeRebuyables.tachyonEngine.effect;"
			>
				{{ TimeRebuyables.tachyonEngine.effect }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.c-button-good {
	padding: 8px 16px;
	margin: 3px;
}

.c-tachyon-engine-row {
	width: 80%;
	max-width: 600px;
	padding: 10px 30px;
	margin: auto;
	margin-top: 20px;
	border-radius: 6px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	background-color: rgba(255, 255, 255, 0.1);
}

.c-progress-bar {
	position: relative;
	width: 50%;
	margin: auto;
	background-color: rgba(255, 255, 255, 0.3);
	height: 10px;
	border-radius: 5px;
	overflow: hidden;
}

.c-progress-bar::before {
	content: "";
	position: absolute;
	height: 100%;
	left: 0;
	top: 0;
	border-radius: 5px;
	width: var(--bar-fill);
	background-color: var(--bar-fill-colour);
}
</style>