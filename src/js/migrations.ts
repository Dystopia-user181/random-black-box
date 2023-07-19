/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
type migration = (player: any) => void;

export const migrations: migration[] = [
	player => {
		player.monomensions.antimatter.maxUnlocks = player.monomensions.antimatter.unlocks;
	},
	player => {
		for (let i = 1; i <= 8; i++) {
			player.monomensions.antimatter[i].amount =
				Math.max(player.monomensions.antimatter[i].amount, player.monomensions.antimatter[i].bought);
		}
	}
];