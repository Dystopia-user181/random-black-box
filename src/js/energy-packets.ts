import { Rectangle } from "@/js/rectangle";

import { GameBoard } from "@/js/game-board";

import { player } from "@/js/player";

const DEFAULT_SPEED = 30, DEFAULT_LIFETIME = 10;
class Projectile extends Rectangle {
	vx: number;
	vy: number;
	life = 0;
	constructor(x: number, y: number, dir: number) {
		super(x - 0.07, y - 0.07, 0.14, 0.14);
		this.vx = DEFAULT_SPEED * Math.cos(dir);
		this.vy = DEFAULT_SPEED * Math.sin(dir);
	}

	move(_diff: number) {
		const diff = Math.min(_diff, 0.1);
		this.x += this.vx * diff;
		this.y += this.vy * diff;
		if (this.isTouching(GameBoard.blackbox)) {
			player.energy += 1;
			player.totalEnergy += 1;
			this.life = Infinity;
		}
		this.life += diff;
	}
}

export let energyPackets = new Array<Projectile>();

export const Packets = {
	get radius() {
		return 8;
	},
	get currentX() {
		return this.radius * Math.cos(Date.now() / 4000);
	},
	get currentY() {
		return this.radius * Math.sin(Date.now() / 4000);
	},
	tick(diff: number) {
		for (const packet of energyPackets) {
			packet.move(diff);
		}
		energyPackets = energyPackets.filter(x => x.life < DEFAULT_LIFETIME);
	},
	get canFire() {
		return player.lastTick - player.packets.lastFire >= 500;
	},
	fire() {
		if (!this.canFire) return;
		energyPackets.push(new Projectile(this.currentX, this.currentY, player.packets.turretDirection));
		player.packets.lastFire = Date.now();
	},
	draw(ctx: CanvasRenderingContext2D) {
		// Draw turret path
		ctx.strokeStyle = "#fff6";
		ctx.lineWidth = 0.1;
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
		ctx.stroke();


		// Draw cannon
		ctx.strokeStyle = "#699";
		ctx.lineCap = "square";
		ctx.lineWidth = 0.4;
		ctx.beginPath();
		ctx.moveTo(this.currentX, this.currentY);
		ctx.lineTo(
			this.currentX + 0.8 * Math.cos(player.packets.turretDirection),
			this.currentY + 0.8 * Math.sin(player.packets.turretDirection)
		);
		ctx.stroke();
		ctx.lineWidth = 0.3;
		ctx.strokeStyle = "#9bb";
		ctx.stroke();

		// Draw turret base
		ctx.strokeStyle = "#699";
		ctx.fillStyle = "#dee";
		ctx.lineWidth = 0.06;
		ctx.beginPath();
		ctx.arc(this.currentX, this.currentY, 0.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();

		// Draw projectiles
		ctx.fillStyle = "#0ff";
		for (const packet of energyPackets) {
			ctx.fillRect(packet.x, packet.y, packet.w, packet.h);
		}
	}
};