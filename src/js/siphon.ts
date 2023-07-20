import { Rectangle } from "./rectangle";

import { GameBoard } from "./game-board";
import { Researches } from "./researches";

import { player } from "./player";

import { format } from "@/utils";

export const Siphon = {
	object: new Rectangle(-1, -12, 2, 2),
	get efficiency() {
		return 0.01;
	},
	tick(diff: number) {
		if (!player.siphon.on || !Researches.siphon.effect) return;
		const prevEnergy = player.energy;
		player.energy *= Math.pow(0.9, diff);
		player.energy -= diff;
		player.energy = Math.max(player.energy, 0);
		if (player.energy === 0) player.siphon.on = false;
		const lostEnergy = prevEnergy - player.energy;
		player.usableEnergy += lostEnergy * Siphon.efficiency;
	},
	toggle() {
		if (player.energy === 0 || !Researches.siphon.effect) return;
		player.siphon.on = !player.siphon.on;
	},
	draw(ctx: CanvasRenderingContext2D) {
		if (!Researches.siphon.effect) return;
		// Draw body
		ctx.strokeStyle = "#777";
		ctx.fillStyle = "#aaa";
		ctx.lineWidth = 0.08;
		ctx.fillRect(this.object.x, this.object.y, this.object.w, this.object.h);
		ctx.strokeRect(this.object.x, this.object.y, this.object.w, this.object.h);
		ctx.strokeStyle = "#444";
		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.arc(this.object.x + this.object.w / 2, this.object.y + this.object.h / 2, 0.4, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();

		// Draw instructions
		ctx.textAlign = "center";
		ctx.textBaseline = "bottom";
		ctx.fillStyle = "#fff";
		ctx.font = "0.6px Iosevka Term SS08 Web";
		ctx.fillText(`Siphon: ${player.siphon.on ? "ON" : "OFF"}`, 0, this.object.y - 1);
		ctx.fillText(`(Click to toggle)`, 0, this.object.y - 0.2);
		ctx.textBaseline = "top";
		ctx.fillText(`Efficiency: ${format(this.efficiency * 100)}%`, 0, this.object.y + this.object.h + 0.2);

		if (!player.siphon.on) return;
		// Draw rays
		ctx.lineCap = "round";
		ctx.strokeStyle = "#0ff";
		const startY = this.object.y + this.object.h / 2;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		const randomSegmentation = Math.floor(Math.random() * 3) + 3;
		for (let i = 0; i < randomSegmentation; i++) {
			ctx.lineTo((Math.random() - 0.5) * 2, startY * (i + 1) / (randomSegmentation + 1));
		}
		ctx.lineTo(0, startY);
		ctx.stroke();
	}
};

GameBoard.addClickListener(Siphon.object, () => Siphon.toggle());