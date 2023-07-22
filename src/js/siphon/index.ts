import { Rectangle } from "@/js/rectangle";

import { GameBoard } from "@/js/game-board";
import { Researches } from "@/js/researches";

import { SiphonUpgrades } from "./upgrade-list";

import { player } from "@/js/player";

import { format } from "@/utils";

export * from "./upgrade-list";
export const Siphon = {
	object: new Rectangle(-1, -12, 2, 2),
	get efficiency() {
		return SiphonUpgrades.efficiency.effect;
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
		ctx.textBaseline = "top";
		ctx.fillStyle = "#fff";
		ctx.font = "0.5px Iosevka Term SS08 Web";
		ctx.fillText(`Siphon: ${player.siphon.on ? "ON" : "OFF"}`, 0, this.object.y + this.object.h + 0.25);
		ctx.fillText(`(Click to toggle)`, 0, this.object.y + this.object.h + 1);

		// Draw upgrades
		ctx.font = "0.34px Iosevka Term SS08 Web";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		const lineHeight = 0.55;
		for (const upgrade of Object.values(SiphonUpgrades)) {
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 0.04;
			ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
			const { x, y, w, h } = upgrade.config.boundingBox;
			ctx.fillRect(x, y, w, h);
			ctx.strokeRect(x, y, w, h);
			const noOfLines = upgrade.description.split("\n").length + 3;
			const padding = (h - noOfLines * lineHeight) / 2;
			const centerX = x + w / 2;
			let i = 0;
			ctx.fillStyle = "#fff";
			for (const line of upgrade.description.split("\n")) {
				ctx.fillText(line, centerX, y + padding + (0.5 + i) * lineHeight);
				i++;
			}
			ctx.fillText(`Required Temperature:`, centerX, y + padding + (0.5 + i) * lineHeight);
			i++;
			ctx.fillText(`${format(upgrade.cost)} K`, centerX, y + padding + (0.5 + i) * lineHeight);
			i++;
			ctx.fillText(upgrade.formattedEffect, centerX, y + padding + (0.5 + i) * lineHeight);
		}
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

for (const upgrade of Object.values(SiphonUpgrades)) {
	GameBoard.addClickListener(upgrade.config.boundingBox, () => upgrade.buy());
}