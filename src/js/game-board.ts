import { Rectangle } from "@/js/rectangle";

import { WindowProperties } from "@/components/mixins";

export const GameBoard = {
	blackbox: new Rectangle(-0.5, -0.5, 1, 1),
	clickListeners: [] as { target: Rectangle, callback: (x: number, y: number) => void }[],
	addClickListener(target: Rectangle, callback: (x: number, y: number) => void) {
		this.clickListeners.push({ target, callback });
	},
	mountOnCanvas(canvasEl: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		canvasEl.addEventListener("click", e => {
			const m = ctx.getTransform().inverse();
			const v = [e.clientX, e.clientY];
			const vTrans = [v[0] * m.a + v[1] * m.c + m.e, v[0] * m.b + v[1] * m.d + m.f];
			const cursorRect = new Rectangle(vTrans[0], vTrans[1], 0, 0);
			for (const listener of this.clickListeners) {
				if (listener.target.isTouching(cursorRect)) {
					listener.callback(vTrans[0], vTrans[1]);
				}
			}
		});
		canvasEl.addEventListener("mousemove", e => {
			const m = ctx.getTransform().inverse();
			const v = [e.clientX, e.clientY];
			const vTrans = [v[0] * m.a + v[1] * m.c + m.e, v[0] * m.b + v[1] * m.d + m.f];
			WindowProperties.canvasMouseX.value = vTrans[0];
			WindowProperties.canvasMouseY.value = vTrans[1];
		});
	}
};