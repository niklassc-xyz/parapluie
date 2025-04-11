// TODO encapsulate fill, stroke functions
// TODO roomWidth, roomHeight needed in resizeCanvas
// → maybe room or game should call resizeCanvas on roomGoto, if ratio changed

import * as graphics from './functions/graphics.js';

export default class Painter {
	constructor(g, canvas) {
		this.g = g; // TODO private
		this.canvas = canvas; // TODO private
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

	strokeLine(x1, y1, x2, y2) {
		graphics.strokeLine(this.ctx, x1, y1, x2, y2);
	}

	// Circle {{{
	/**
	 * Draws a circle, outline and filling
	 *
	 * @param {number} x - Center x
	 * @param {number} y - Center y
	 * @param {number} r - Radius
	 */
	drawCircle(x, y, r) {
		graphics.drawCircle(this.ctx, x, y, r);
	}

	/**
	 * Draws a circle that is filled
	 *
	 * @param {number} x - Center x
	 * @param {number} y - Center y
	 * @param {number} r - Radius
	 */
	fillCircle(x, y, r) {
		graphics.fillCircle(this.ctx, x, y, r);
	}

	/**
	 * Draws a circle that is stroked (outlined)
	 *
	 * @param {number} x - Center x
	 * @param {number} y - Center y
	 * @param {number} r - Radius
	 */
	strokeCircle(x, y, r) {
		graphics.strokeCircle(this.ctx, x, y, r);
	}
	// }}}

	// Roundrect {{{

	/**
	* Draws a roundrect, outline and filling
	*
	* @param {number} x1 - lowest x coordinate of roundrect
	* @param {number} y1 - lowest y coordinate of roundrect
	* @param {number} x2 - highest x coordinate of roundrect
	* @param {number} y2 - highest y coordinate of roundrect
	* @param {number} radius - Radius
	*/
	drawRoundrect(x1, y1, x2, y2, radius) {
		graphics.drawRoundrect(this.ctx, x1, y1, x2, y2, radius);
	}

	/**
	* Draws a roundrect that is filled
	*
	* @param {number} x1 - lowest x coordinate of roundrect
	* @param {number} y1 - lowest y coordinate of roundrect
	* @param {number} x2 - highest x coordinate of roundrect
	* @param {number} y2 - highest y coordinate of roundrect
	* @param {number} radius - Radius
	*/
	fillRoundrect(x1, y1, x2, y2, radius) {
		graphics.fillRoundrect(this.ctx, x1, y1, x2, y2, radius);
	}

	/**
	* Draws a roundrect that is stroked (outlined)
	*
	* @param {number} x1 - lowest x coordinate of roundrect
	* @param {number} y1 - lowest y coordinate of roundrect
	* @param {number} x2 - highest x coordinate of roundrect
	* @param {number} y2 - highest y coordinate of roundrect
	* @param {number} radius - Radius
	*/
	strokeRoundrect(x1, y1, x2, y2, radius) {
		graphics.strokeRoundrect(this.ctx, x1, y1, x2, y2, radius);
	}
	// }}}


}
