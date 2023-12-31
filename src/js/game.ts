import { GameUI } from "@/js/ui/game-ui";
import { LogicEvent } from "@/js/database/events";
import { Modals } from "@/js/ui/modals";
import { UIEvent } from "@/js/ui/events";

import { LaserBuilder } from "./laser-builder";
import { Packets } from "./energy-packets";
import { Siphon } from "./siphon";
import { tickResearches } from "./researches";

import { player } from "./player";


export function gameLoop(_diff?: number) {
	const diff = _diff ?? (Date.now() - player.lastTick) / 1000;
	if (!_diff) {
		player.lastTick = Date.now();
	}
	LogicEvent.dispatch("GAME_TICK_BEFORE");
	Packets.tick(diff);
	LaserBuilder.tick(diff);
	tickResearches(diff);
	Siphon.tick(diff);
	GameUI.update();
	LogicEvent.dispatch("GAME_TICK_AFTER");
}

window.gameLoopInterval = setInterval(() => gameLoop(), 16);

function render() {
	GameUI.render();
}

window.renderInterval = setInterval(() => render(), 16);

UIEvent.on(0, "ERROR", x => {
	Modals.message.showText(x);
	clearInterval(gameLoopInterval);
	clearInterval(saveInterval);
});