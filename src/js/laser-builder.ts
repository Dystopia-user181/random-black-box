import { GameBoard } from "./game-board";

import { Rectangle } from "./rectangle";

import { player } from "./player";

export interface LaserPlayerData {
	x: number,
	y: number,
	dir: number,
	level: number,
}

export const laserList = new Array<LaserState>();

export class LaserState {
	playerState: LaserPlayerData;
	constructor(data: LaserPlayerData) {
		this.playerState = data;
	}

	get parametricLaser(): [number, number, number, number] {
		const arg = this.playerState.dir;
		return [this.playerState.x, this.playerState.y,
			100 * Math.cos(arg), 100 * Math.sin(arg)];
	}

	get boundingBox() {
		return new Rectangle(this.playerState.x - 1, this.playerState.y - 1, 2, 2);
	}

	get isCollidingBlackBox() {
		const laser = this.parametricLaser;
		const collisionBBPt = GameBoard.blackbox.getLineIntersection(...laser);
		if (collisionBBPt === -1) return false;
		laser[2] *= collisionBBPt;
		laser[3] *= collisionBBPt;
		for (const laserObj of laserList) {
			if (laserObj === this) continue;
			if (laserObj.boundingBox.getLineIntersection(...laser) !== -1) return false;
		}
		return true;
	}

	get power() { return 20; }

	tick(diff: number) {
		if (this.isCollidingBlackBox) player.energy += this.power * diff;
	}

	draw(ctx: CanvasRenderingContext2D) {
		// Draw Base
		ctx.strokeStyle = "#777";
		ctx.fillStyle = "#aaa";
		ctx.lineWidth = 0.08;
		ctx.fillRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);
		ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);

		// Draw laser
		const laser = this.parametricLaser;
		let minT0 = 1;
		const collidingObjs = [GameBoard.blackbox, ...laserList.filter(x => x !== this).map(x => x.boundingBox)];
		for (const object of collidingObjs) {
			const t0 = object.getLineIntersection(...laser);
			if (t0 !== -1) minT0 = Math.min(minT0, t0);
		}
		laser[2] *= minT0;
		laser[3] *= minT0;
		ctx.strokeStyle = "#0ff";
		ctx.lineCap = "round";
		ctx.lineWidth = 0.11;
		ctx.beginPath();
		ctx.moveTo(laser[0], laser[1]);
		ctx.lineTo(laser[0] + laser[2], laser[1] + laser[3]);
		ctx.stroke();

		// Draw cannon
		ctx.strokeStyle = "#777";
		ctx.lineCap = "square";
		ctx.lineWidth = 0.4;
		ctx.beginPath();
		ctx.moveTo(this.playerState.x, this.playerState.y);
		ctx.lineTo(
			this.playerState.x + 0.8 * Math.cos(this.playerState.dir),
			this.playerState.y + 0.8 * Math.sin(this.playerState.dir)
		);
		ctx.stroke();
		ctx.lineWidth = 0.3;
		ctx.strokeStyle = "#aaa";
		ctx.stroke();

		// Draw turret base
		ctx.strokeStyle = "#777";
		ctx.fillStyle = "#aaa";
		ctx.lineWidth = 0.06;
		ctx.beginPath();
		ctx.arc(this.playerState.x, this.playerState.y, 0.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}
}

export function initLasers() {
	for (const laser of player.lasers.list) {
		laserList.push(new LaserState(laser));
	}
}

export const LaserBuilder = {
	get cost() {
		return 40 * Math.pow(2, Math.pow(player.lasers.list.length, 1.6));
	},
	get canAfford() {
		return player.usableEnergy >= this.cost;
	},
	virtualLaser: null as null | LaserPlayerData,
	startBuild() {
		if (!this.canAfford) return;
		player.usableEnergy -= this.cost;
		player.lasers.isBuilding = true;
	},
	stopBuild() {
		player.lasers.isBuilding = false;
		player.usableEnergy += this.cost;
	},
	refund(laser: LaserState) {
		player.lasers.list.splice(player.lasers.list.indexOf(laser.playerState));
		laserList.splice(laserList.indexOf(laser));
	},
	tick(diff: number) {
		for (const laser of laserList) laser.tick(diff);
	},
	draw(ctx: CanvasRenderingContext2D) {
		for (const laser of laserList) laser.draw(ctx);
	}
};