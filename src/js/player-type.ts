import { AntimatterMonoData } from "@/js/antimatter/player-types";

import { InfinityMonoData } from "@/js/infinity/player-types";

import { GlyphData, GlyphType } from "@/js/glyphs";

import { TabType } from "@/js/ui/tabs";

type Dimset<T> = { 1: T, 2: T, 3: T, 4: T, 5: T, 6: T, 7: T, 8: T };

export interface PlayerType {
	antimatter: number,
	monomensions: {
		antimatter: Dimset<AntimatterMonoData> & {
			unlocks: OneToEight,
			maxUnlocks: OneToEight,
			timeElapsed: number,
			tickspeed: number,
			sacrifice: number,
			surge: {
				monoId: OneToEight,
				boost: number
			},
		},
		infinity: Dimset<InfinityMonoData>
	},
	time: {
		reversing: boolean,
		tachyonMatter: number,
		upgrades: number,
		chosenUpgrade: number,
		rebuyables: [number, number, number, number, number, number],
		rebuyablesEnabled: [boolean, boolean, boolean, boolean, boolean, boolean],
		tachyonEngine: {
			on: boolean,
			level: number,
			momentum: number,
		},
	},
	auto: {
		surge: boolean,
		discard: boolean,
	},
	glyphs: {
		glyphPower: number,
		unlocks: number,
		sacrifice: Record<GlyphType, number>,
		current: GlyphData | null,
		previous: GlyphData | null,
		projected: GlyphData | null,
	},
	infinity: {
		ipProgress: number,
		bestIP: number,
		ip: number,
		infPow: number,
		upgrades: 0,
	},
	options: {
		autosave: number,
		exportCount: number,
	},
	absolve: number,
	vitalMarker: string,
	migrations: number,
	currentTab: TabType,
}