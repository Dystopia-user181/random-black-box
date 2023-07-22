export class Rectangle {
	x: number;
	y: number;
	w: number;
	h: number;
	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
	}

	isTouching(object: Rectangle) {
		return this.x + this.w > object.x && this.x < object.x + object.w &&
			this.y + this.h > object.y && this.y < object.y + object.h;
	}

	getLineIntersection(x00: number, y00: number, x01: number, y01: number) {
		const lines = [
			[this.x, this.y, this.w, 0],
			[this.x, this.y, 0, this.h],
			[this.x + this.w, this.y, 0, this.h],
			[this.x, this.y + this.h, this.w, 0]
		];
		let mint0 = 100;
		for (const [x10, y10, x11, y11] of lines) {
			const d = x11 * y01 - x01 * y11;
			if (d === 0) continue;
			const t1 = (1 / d) * ((x00 - x10) * y01 - (y00 - y10) * x01);
			const t0 = (-1 / d) * ((y00 - y10) * x11 - (x00 - x10) * y11);
			if (t1 >= 0 && t1 <= 1 && t0 >= 0 && t0 <= 1) {
				mint0 = Math.min(mint0, t0);
			}
		}
		if (mint0 <= 1) return mint0;
		return -1;
	}
}