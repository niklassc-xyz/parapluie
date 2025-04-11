// TODO encapsulate fill, stroke functions
// TODO roomWidth, roomHeight should not be  stored here
// → maybe room or game should call resizeCanvas on roomGoto, if ratio changed

import * as graphics from './functions/graphics.js';

export default class Painter {
	constructor(g, canvas) {
		this.g = g;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.strokeStyle = "white";
		this.fillStyle = "black";

		this.paddingVert = 0;
		this.paddingHorz = 0;
		this.viewWidth;
		this.viewHeight;


		this.resizeCanvas();
	}

	resizeCanvas() {
		// W/H the canvas will be displayed as
		this.canvas.style.width = window.innerWidth;
		this.canvas.style.height = window.innerHeight;

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		if (Settings.scaling) {
			this.canvas.width *= window.devicePixelRatio;
			this.canvas.height *= window.devicePixelRatio;
		}

		// Calculate room view
		// → TODO use view dimensions instead of room
		// let canvasRatio = canvas.style.width / canvas.style.height;
		let windowRatio = window.innerWidth / window.innerHeight;
		let roomRatio = this.g.roomWidth / this.g.roomHeight;

		this.paddingVert = 0; // on each side
		this.paddingHorz = 0; // on each side
		if (windowRatio > roomRatio) {
			this.viewHeight = roomHeight;
			this.viewWidth = roomHeight * (window.innerWidth / window.innerHeight);
			this.paddingHorz = (this.viewWidth - this.g.roomWidth) / 2;
		} else {
			this.viewWidth = this.g.roomWidth;
			this.viewHeight = this.g.roomWidth * (window.innerHeight / window.innerWidth);
			this.paddingVert = (this.viewHeight - this.g.roomHeight) / 2;
		}

		let xScalar = window.innerWidth / this.viewWidth;
		let yScalar = window.innerHeight / this.viewHeight;

		if (Settings.scaling) {
			xScalar *= window.devicePixelRatio;
			yScalar *= window.devicePixelRatio;
		}

		console.log("scalars", xScalar, yScalar);

		this.ctx.scale(xScalar, yScalar);
		this.ctx.translate(this.paddingHorz, this.paddingVert);
	}

	clearRect(x, y, width, height) {
		this.ctx.clearRect(x, y, width, height);
	}

	// TODO strokeLine → no fill
	drawLine(x1, y1, x2, y2) {
		graphics.drawLine(this.ctx, x1, y1, x2, y2);
	}

	fillCircle(x, y, r) {
		graphics.drawCircle(this.ctx, x, y, r, false);
	}

	strokeCircle(x, y, r) {
		graphics.drawCircle(this.ctx, x, y, r, true);
	}
}
