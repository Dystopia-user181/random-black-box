import { reactive } from "vue";

import { AMHandler } from "@/js/antimatter";

import { player } from "@/js/player";

const list = ["Infinity", "Glyphs", "Dilation", "the 2nd to 8th Anti Monomensions", "Blame"] as const;

export const Absolve = reactive({
	get isUnlocked() {
		if (player.absolve > 0) return true;
		return player.antimatter >= AMHandler.cap && player.monomensions.antimatter.unlocks >= 8;
	},
	isAbsolving: false,
	progress: 0,
	list,
	hasRemoved(x: typeof list[number]) {
		return list.indexOf(x) < player.absolve;
	},
	get hasFinished() {
		return player.absolve >= list.length;
	},
	get displayItem() {
		return list[player.absolve] || "...";
	},
	tick(diff: number) {
		if (!this.isAbsolving || this.hasFinished) return;
		this.progress += diff / 10;
		if (this.progress >= 1) {
			this.isAbsolving = false;
			player.absolve++;
			this.progress = 0;
			if (this.hasFinished) {
				player.monomensions.antimatter.unlocks = 1;
				AMHandler._resetResources();
			}
		}
	}
});