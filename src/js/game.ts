import { GameUI } from "@/js/ui/game-ui";
import { LogicEvent } from "@/js/database/events";
import { Modals } from "@/js/ui/modals";
import { UIEvent } from "@/js/ui/events";

import { AMHandler } from "@/js/antimatter";

import { GlyphHandler } from "./glyphs";

import { InfHandler } from "./infinity";

import { Absolve } from "./absolve";

let lastTick = Date.now();

export function gameLoop(_diff?: number) {
	let diff: number;
	if (_diff) {
		diff = _diff;
	} else {
		diff = (Date.now() - lastTick) / 1000;
		lastTick = Date.now();
	}
	LogicEvent.dispatch("GAME_TICK_BEFORE");
	AMHandler.tick(diff);
	GlyphHandler.tick(diff);
	InfHandler.tick(diff);
	Absolve.tick(diff);
	GameUI.update();
	LogicEvent.dispatch("GAME_TICK_AFTER");
}

window.gameLoopInterval = setInterval(() => gameLoop(), 30);

function render() {
	GameUI.render();
}

window.renderInterval = setInterval(() => render(), 16);

UIEvent.on(0, "ERROR", x => {
	Modals.message.showText(x);
	clearInterval(gameLoopInterval);
	clearInterval(saveInterval);
});