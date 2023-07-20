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
	},
	migrations: number,
	options: {
		autosave: number,
		exportCount: number,
	},
	lastTick: number,
	vitalMarker: string,
}