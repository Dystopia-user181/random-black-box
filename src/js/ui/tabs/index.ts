import AbsolveTab from "./Absolve.vue";
import AntimatterTab from "./antimatter/index.vue";
import DilationTab from "./time/index.vue";
import GlyphTab from "./glyphs/index.vue";
import InfinityTab from "./infinity/index.vue";
import StrikesTab from "./strikes/index.vue";

import { TimeDilationHandler } from "@/js/time";

import { GlyphHandler } from "@/js/glyphs";

import { InfHandler } from "@/js/infinity";

import { Absolve } from "@/js/absolve";

import { player } from "@/js/player";

export const TabTypes = ["antimatter", "strikes", "dilation", "glyphs", "infinity", "absolve"] as const;
export type TabType = typeof TabTypes[number];

interface TabStateConfig {
	id: TabType,
	name: string,
	component: Component,
	isUnlocked?: () => boolean,
	tieAbsolve?: number,
}

export class TabState {
	readonly config: TabStateConfig;
	constructor(config: TabStateConfig) {
		this.config = config;
	}

	get id() { return this.config.id; }
	get name() { return this.config.name; }
	get component() { return this.config.component; }

	get isUnlocked() {
		if (this.config.tieAbsolve !== undefined && player.absolve > this.config.tieAbsolve) return false;
		return this.config.isUnlocked?.() ?? true;
	}

	get isCurrent() {
		return player.currentTab === this.id;
	}

	setCurrent() {
		if (!this.isUnlocked || Absolve.isAbsolving || (player.absolve > 0 && !Absolve.hasFinished)) return;
		player.currentTab = this.id;
	}
}

export const Tabs = {
	antimatter: new TabState({
		id: "antimatter",
		name: "Antimatter",
		component: AntimatterTab
	}),
	strikes: new TabState({
		id: "strikes",
		name: "Strikes",
		component: StrikesTab,
		isUnlocked: () => player.monomensions.antimatter.maxUnlocks >= 5,
		tieAbsolve: 2,
	}),
	dilation: new TabState({
		id: "dilation",
		name: "Dilation",
		component: DilationTab,
		isUnlocked: () => TimeDilationHandler.isUnlocked,
		tieAbsolve: 2,
	}),
	glyphs: new TabState({
		id: "glyphs",
		name: "Glyphs",
		component: GlyphTab,
		isUnlocked: () => GlyphHandler.isUnlocked,
		tieAbsolve: 1,
	}),
	infinity: new TabState({
		id: "infinity",
		name: "Infinity",
		component: InfinityTab,
		isUnlocked: () => InfHandler.isUnlocked,
		tieAbsolve: 0,
	}),
	absolve: new TabState({
		id: "absolve",
		name: "Absolve",
		component: AbsolveTab,
		isUnlocked: () => Absolve.isUnlocked,
	})
} as Record<TabType, TabState>;

export function Tab(id: TabType | "current") {
	// No, player.currentTab isn't `any` you bimbo
	// @typescript-eslint/no-unsafe-member-access
	if (id === "current") return Tabs[player.currentTab];
	return Tabs[id];
}