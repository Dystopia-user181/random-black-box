import { EventHub } from "@/js/eventhub";

export interface GameEvents {
	// Ticks
	GAME_TICK_BEFORE: () => void,
	GAME_TICK_AFTER: () => void,
}

export const GameEventList = ["GAME_TICK_BEFORE", "GAME_TICK_AFTER"] as const;

export type GameEvent = keyof GameEvents;

export const LogicEvent = new EventHub<GameEvents>("GameEvents");