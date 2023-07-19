import { GlyphUnlockHandler } from "./unlocks";

export enum GlyphType {
	power,
	time,
	infinity,
}

export const GlyphTypes: Record<GlyphType, {
	name: string,
	colour: string,
	symbol: string,
	isUnlocked: boolean,
}> = {
	[GlyphType.power]: {
		name: "Power",
		colour: "#22aa48",
		symbol: "P",
		isUnlocked: true,
	},
	[GlyphType.time]: {
		name: "Time",
		colour: "#64dd17",
		symbol: "T",
		get isUnlocked() { return GlyphUnlockHandler.isTimeGlyphUnlocked; },
	},
	[GlyphType.infinity]: {
		name: "Infinity",
		colour: "#b67f33",
		symbol: "I",
		get isUnlocked() { return GlyphUnlockHandler.isInfGlyphUnlocked; },
	}
};