<script setup lang="ts">
import { ref } from "vue";

import { onMount } from "@/components/mixins";

import { ViewMoveHandler } from "@/utils/view-move-handler";

import { GameBoard } from "@/js/game-board";
import { LaserBuilder } from "@/js/laser-builder";
import { Packets } from "@/js/energy-packets";
import { Siphon } from "@/js/siphon";

const canvas = ref<null | HTMLCanvasElement>(null);
let ctx: null | CanvasRenderingContext2D = null;

const view = {
	offsetX: 0,
	offsetY: 0,
	zoom: 20,

	maxOffsetX: 50 as const,
	maxOffsetY: 50 as const,
	maxZoom: 40 as const,
	minZoom: 10 as const,
	isBlockingMove: false,
};
const viewHandler = new ViewMoveHandler(view);
const rootElement = document.querySelector("html") as HTMLHtmlElement;
onMount({
	onMount() {
		if (!canvas.value) throw "Error encountered";
		ctx = canvas.value.getContext("2d");
		viewHandler.mount(canvas.value);
		GameBoard.mountOnCanvas(canvas.value, ctx ?? new CanvasRenderingContext2D());
	},
	render() {
		if (!ctx || !canvas.value) return;
		canvas.value.width = innerWidth;
		canvas.value.height = innerHeight;
		ctx.resetTransform();
		ctx.translate(innerWidth / 2, innerHeight / 2);
		ctx.scale(view.zoom, view.zoom);
		ctx.translate(-view.offsetX, -view.offsetY);
		ctx.fillStyle = "black";
		ctx.fillRect(GameBoard.blackbox.x, GameBoard.blackbox.y, GameBoard.blackbox.w, GameBoard.blackbox.h);
		Packets.draw(ctx);
		LaserBuilder.draw(ctx);
		Siphon.draw(ctx);
		rootElement.style.backgroundPositionX = `${(-view.offsetX + innerWidth / 2)}px`;
		rootElement.style.backgroundPositionY = `${(-view.offsetY + innerHeight / 2)}px`;
		rootElement.style.backgroundSize = `${(view.zoom + 200) / 2.2}%`;
	}
});
</script>

<template>
	<canvas
		ref="canvas"
		class="c-game-canvas"
	/>
</template>

<style scoped>
.c-game-canvas {
	position: absolute;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	z-index: 0;
}
</style>