export interface PlayerType {
	energy: number,
	packets: {
		lastFire: number,
		turretDirection: number,
	},
	migrations: number,
	options: {
		autosave: number,
		exportCount: number,
	},
	vitalMarker: string,
}