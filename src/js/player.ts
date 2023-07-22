import { reactive, toRaw } from "vue";

import { PlayerType } from "@/js/player-type";

import { migrations } from "@/js/migrations";
import { Modals } from "@/js/ui/modals";

import { deepAssign, downloadAsFile, isArray, isObject } from "@/utils";

import { Researches } from "./researches";
import { SiphonUpgrades } from "./siphon";

// https://github.com/microsoft/TypeScript/issues/31816#issuecomment-593069149
type FileEventTarget = EventTarget & { files: FileList };
type FileEvent = Event & { target: FileEventTarget };

export const Player = {
	defaultStart(): PlayerType {
		return {
			energy: 0,
			totalEnergy: 0,
			usableEnergy: 0,
			packets: {
				lastFire: 0,
				turretDirection: 0,
			},
			researches: (() => {
				const x: Record<number, number> = {};
				for (let i = 0; i < Object.keys(Researches).length; i++) {
					x[i] = -1;
				}
				return x;
			})(),
			siphon: {
				on: false,
				upgrades: (() => {
					const x: Record<number, number> = {};
					for (let i = 0; i < Object.keys(SiphonUpgrades).length; i++) {
						x[i] = 0;
					}
					return x;
				})(),
			},
			options: {
				autosave: 1,
				exportCount: 0,
			},
			lasers: {
				isBuilding: false,
				list: [],
			},
			vitalMarker: Player.storageKey,
			lastTick: Date.now(),
			migrations: migrations.length
		};
	},
	storageKey: "igj2023-scarlet-newyear-cappedatone",
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	load(playerObj?: any) {
		Object.assign(player, Player.defaultStart());
		if (playerObj) {
			this.loadAndMigrateSave(playerObj);
		} else {
			setTimeout(() => {
				Modals.message.showText(`There's a mysterious black box in the middle of nowhere.
				<br>
				Let's shoot energy packets at it and see what happens.`);
			}, 0);
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	loadAndMigrateSave(playerObj: any) {
		deepAssign(player, playerObj);
		for (; player.migrations < migrations.length; player.migrations++) {
			migrations[player.migrations](player);
		}
	},
	loadSave() {
		try {
			const save = localStorage.getItem(this.storageKey);
			this.load(save ? JSON.parse(save) : undefined);
		} catch {
			this.load();
			Modals.message.showText(`
			The game is unable to save, possibly because you are in incognito. Please export your save
			manually before closing the game.
			`);
		}
	},
	hasNaN(obj: Record<string, unknown> | unknown[] = player) {
		if (isObject(obj)) {
			for (const i in obj) {
				const prop = obj[i];
				if (typeof prop === "number" && Number.isNaN(prop)) return true;
				if ((isObject(prop) || isArray(prop)) && this.hasNaN(prop)) return true;
			}
		} else {
			for (const prop of obj) {
				if (typeof prop === "number" && Number.isNaN(prop)) return true;
				if ((isObject(prop) || isArray(prop)) && this.hasNaN(prop)) return true;
			}
		}
		return false;
	},
	savePlayer() {
		if (player.vitalMarker !== Player.storageKey) return;
		if (this.hasNaN()) {
			// eslint-disable-next-line no-console
			console.error("Has NaN, didn't save");
			return;
		}
		localStorage.setItem(this.storageKey, JSON.stringify(toRaw(player)));
	},
	reset() {
		Player.load();
		Player.savePlayer();
	},
	exportSave() {
		const dateString = `${new Date(Date.now() - (new Date().getTimezoneOffset() * 60 * 1000))
			.toISOString().split("T")[0]} ${new Date().toLocaleTimeString(undefined, { hour12: false })}`;
		player.options.exportCount++;
		downloadAsFile(
			`Antimatter Monomensions Save #${player.options.exportCount} (${dateString})`,
			window.btoa(JSON.stringify(toRaw(player)))
		);
	},
	importSave(event: FileEvent) {
		// This happens if the file dialog is canceled instead of a file being selected
		if (event.target.files.length === 0) return;

		const reader = new FileReader();
		reader.onload = function() {
			let text = reader.result;
			if (typeof text !== "string") {
				Modals.message.showText("Invalid savefile format.");
				return;
			}
			try {
				text = window.atob(text);
			} catch {
				Modals.message.showText("Invalid savefile format.");
				return;
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const playerObj = JSON.parse(text);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (typeof playerObj !== "object" || playerObj.vitalMarker !== Player.storageKey) {
				Modals.message.showText("Invalid savefile format.");
				return;
			}
			Player.load(playerObj);
			Player.savePlayer();
		};
		reader.readAsText(event.target.files[0]);
	}
};

export const player = reactive<PlayerType>({} as PlayerType);


// @ts-ignore
window.p = player;

setTimeout(() => Player.loadSave(), 0);

window.saveInterval = setInterval(() => {
	if (player.options.autosave) Player.savePlayer();
}, 10000);