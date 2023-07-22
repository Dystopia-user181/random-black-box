import { Rectangle } from "@/js/rectangle";

import { GameBoard } from "@/js/game-board";
import { Researches } from "./researches";

import { player } from "@/js/player";

import { format } from "@/utils";

function getEnergyGain() {
	if (!Researches.fireBetter.canApply) return 1;
	return 2;
}
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
			player.energy += getEnergyGain();
			player.totalEnergy += getEnergyGain();
			this.life = Infinity;
		}
		this.life += diff;
	}
}

export let energyPackets = new Array<Projectile>();

export const Packets = {
	get radius() {
		if (Researches.fireRadius.effect) return 5;
		return 8;
	},
	get currentX() {
		return this.radius * Math.cos(Date.now() / 6000);
	},
	get currentY() {
		return this.radius * Math.sin(Date.now() / 6000);
	},
	get isLaser() {
		return Researches.fireLaser.effect;
	},
	get laserTime() {
		return 15000;
	},
	get canFire() {
		if (this.isLaser) return player.lastTick - player.packets.lastFire >= this.laserTime;
		return player.lastTick - player.packets.lastFire >= 500;
	},
	get isLaserActive() {
		return this.isLaser && player.lastTick - player.packets.lastFire < this.laserTime;
	},
	get laserGain() {
		return 20;
	},
	get parametricLaser(): [number, number, number, number] {
		const arg = player.packets.turretDirection;
		return [this.currentX, this.currentY,
			this.radius * 2 * Math.cos(arg), this.radius * 2 * Math.sin(arg)];
	},
	tick(diff: number) {
		for (const packet of energyPackets) {
			packet.move(diff);
		}
		energyPackets = energyPackets.filter(x => x.life < DEFAULT_LIFETIME);
		if (this.isLaserActive) {
			const laser = this.parametricLaser;
			if (GameBoard.blackbox.getLineIntersection(...laser) !== -1) {
				player.energy += this.laserGain * diff;
			}
		}
	},
	fire() {
		if (!this.canFire) return;
		player.packets.lastFire = Date.now();
		if (this.isLaser) return;
		energyPackets.push(new Projectile(this.currentX, this.currentY, player.packets.turretDirection));
		if (Researches.fireMore.canApply) setTimeout(
			() => energyPackets.push(new Projectile(this.currentX, this.currentY, player.packets.turretDirection)),
			100
		);
		if (Researches.fireEvenMore.canApply) setTimeout(
			() => energyPackets.push(new Projectile(this.currentX, this.currentY, player.packets.turretDirection)),
			200
		);
	},
	draw(ctx: CanvasRenderingContext2D) {
		// Draw turret path
		ctx.strokeStyle = "#fff6";
		ctx.lineWidth = 0.1;
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
		ctx.stroke();

		// Laser vision
		if (Researches.fireVision.canApply) {
			// Draw cannon
			ctx.strokeStyle = "#f225";
			ctx.lineCap = "round";
			ctx.lineWidth = 0.1;
			ctx.beginPath();
			ctx.moveTo(this.currentX, this.currentY);
			ctx.lineTo(
				this.currentX + 2 * this.radius * Math.cos(player.packets.turretDirection),
				this.currentY + 2 * this.radius * Math.sin(player.packets.turretDirection)
			);
			ctx.stroke();
		}

		// If firing laser isntead of packets
		if (Researches.fireLaser.canApply) {
			// Draw text
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			ctx.fillStyle = "#fff";
			ctx.font = "0.5px Iosevka Term SS08 Web";
			ctx.fillText(`Laser Power: ${format(this.laserGain)} W`, this.currentX, this.currentY + 0.75);
			// Draw laser path
			if (this.isLaserActive) {
				const laser = this.parametricLaser;
				const t0 = GameBoard.blackbox.getLineIntersection(...laser);
				if (t0 !== -1) {
					laser[2] *= t0;
					laser[3] *= t0;
				}
				ctx.strokeStyle = "#0ff";
				ctx.lineCap = "round";
				ctx.lineWidth = 0.11;
				ctx.beginPath();
				ctx.moveTo(laser[0], laser[1]);
				ctx.lineTo(laser[0] + laser[2], laser[1] + laser[3]);
				ctx.stroke();
			}
		}
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