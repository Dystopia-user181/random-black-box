import { LaserPlayerData } from "./laser-builder";

export interface PlayerType {
	energy: number,
	totalEnergy: number,
	usableEnergy: number,
	packets: {
		lastFire: number,
		turretDirection: number,
	},
	researches: Record<number, number>,
	siphon: {
		on: boolean,
		upgrades: Record<number, number>,
	},
	lasers: {
		isBuilding: boolean,
		list: LaserPlayerData[],
	}
	migrations: number,
	options: {
		autosave: number,
		exportCount: number,
	},
	lastTick: number,
	vitalMarker: string,
}