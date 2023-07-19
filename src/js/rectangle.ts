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
}