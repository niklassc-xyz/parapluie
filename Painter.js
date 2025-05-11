// TODO encapsulate fill, stroke functions
// TODO roomWidth, roomHeight needed in resizeCanvas
// → maybe room or game should call resizeCanvas on roomGoto, if ratio changed

import * as graphics from './functions/graphics.js';

export default class Painter {
	constructor(canvas, scaling=true) {
		this.canvas = canvas; // TODO private
		this.ctx = this.canvas.getContext("2d");

		this.strokeStyle = "white";
		this.fillStyle = "black";

		this.paddingVert = 0;
		this.paddingHorz = 0;

		// e.g. room
		this._contentWidth;
		this._contentHeight;

		// TODO protected
		// Content plus border if screen ratio does not match content ratio
		this.viewWidth;
		this.viewHeight;
		this._scaling = scaling;
	}

	resizeCanvas(contentWidth, contentHeight) {
		this._contentWidth = contentWidth;
		this._contentHeight = contentHeight;

		// W/H the canvas will be displayed as
		this.canvas.style.width = window.innerWidth;
		this.canvas.style.height = window.innerHeight;

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		if (this._scaling) {
			this.canvas.width *= window.devicePixelRatio;
			this.canvas.height *= window.devicePixelRatio;
		}

		// Calculate room view
		// → TODO use view dimensions instead of room
		// let canvasRatio = canvas.style.width / canvas.style.height;
		let windowRatio = window.innerWidth / window.innerHeight;
		let roomRatio = this._contentWidth / this._contentHeight;

		this.paddingVert = 0; // on each side
		this.paddingHorz = 0; // on each side
		if (windowRatio > roomRatio) {
			this.viewHeight = contentHeight;
			this.viewWidth = contentHeight * (window.innerWidth / window.innerHeight);
			this.paddingHorz = (this.viewWidth - this._contentWidth) / 2;
		} else {
			this.viewWidth = this._contentWidth;
			this.viewHeight = this._contentWidth * (window.innerHeight / window.innerWidth);
			this.paddingVert = (this.viewHeight - contentHeight) / 2;
		}

		let xScalar = window.innerWidth / this.viewWidth;
		let yScalar = window.innerHeight / this.viewHeight;

		if (this._scaling) {
			xScalar *= window.devicePixelRatio;
			yScalar *= window.devicePixelRatio;
		}

		console.log("scalars", xScalar, yScalar);

		this.ctx.scale(xScalar, yScalar);
		this.ctx.translate(this.paddingHorz, this.paddingVert);
	}

	setScaling(val) {
		this._scaling = val;
		this.resizeCanvas(this._contentWidth, this._contentHeight);
	}

	getScaling() {
		return this._scaling;
	}

	setLineWidth(width) {
		this.ctx.lineWidth = width;
	}

	setFillStyle(style) {
		this.ctx.fillStyle = style;
	}

	setStrokeStyle(style) {
		this.ctx.strokeStyle = style;
	}

	setTextAlign(alignment) {
		this.ctx.textAlign = alignment;
	}

	fillText(text, x, y) {
		this.ctx.fillText(text, x, y);
	}

	strokeText(text, x, y) {
		this.ctx.strokeText(text, x, y);
	}

	measureText(text) {
		return this.ctx.measureText(text);
	}

	setFont(font) {
		this.ctx.font = font;
	}

	clearRect(x, y, width, height) {
		this.ctx.clearRect(x, y, width, height);
	}

	fillRect(x, y, width, height) {
		this.ctx.fillRect(x, y, width, height);
	}

	strokeRect(x, y, width, height) {
		this.ctx.strokeRect(x, y, width, height);
	}

	strokeLine(x1, y1, x2, y2) {
		graphics.strokeLine(this.ctx, x1, y1, x2, y2);
	}

	strokeCross(x, y, radius) {
		this.strokeLine(x - radius, y - radius, x + radius, y + radius);
		this.strokeLine(x - radius, y + radius, x + radius, y - radius);
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
