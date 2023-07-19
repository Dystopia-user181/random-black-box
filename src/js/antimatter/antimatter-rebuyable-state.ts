import { RebuyableState } from "@/utils";

import { player } from "@/js/player";

export abstract class AntimatterRebuyableState<C> extends RebuyableState<C> {
	get currencyAmount() { return player.antimatter; }
	set currencyAmount(v: number) { player.antimatter = v; }
}