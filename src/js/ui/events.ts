import { EventHub } from "@/js/eventhub";

import { GameEventList, GameEvents } from "@/js/database/events";

export interface UIEvents extends GameEvents {
	UPDATE: () => void,
	RENDER: () => void,
	ERROR: (message: string) => void,

	ESCAPE_PRESSED: () => void,
	ENTER_PRESSED: () => void
}

export const UIEventList = [...GameEventList,
	"UPDATE", "RENDER", "ERROR", "ESCAPE_PRESSED", "ENTER_PRESSED"] as const;

export type UIEventType = typeof UIEventList[number];

export const UIEvent = new EventHub<UIEvents>("UIEvents");