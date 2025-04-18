import * as collision from "./functions/collision.js";

// TODO make static?

export default class Input {
	_x; _y;
	constructor(g) {
		this.g = g;
		this._x = 0;
		this._y = 0;

		this.g.painter.canvas.addEventListener('mousedown', (e) => this.mousedown(e), false);
		this.g.painter.canvas.addEventListener('mousemove', (e) => this.mousemove(e), false);
		this.g.painter.canvas.addEventListener('mouseup', (e) => this.mouseup(e), false);

		this.g.painter.canvas.addEventListener('touchstart', (e) => this.touchstart(e), false);
		this.g.painter.canvas.addEventListener('touchmove', (e) => this.touchmove(e), false);
		this.g.painter.canvas.addEventListener('touchend', (e) => this.touchend(e), false);


		/**
		  * List of clickable objects
		  * @type {Array.<DimensionEntity>}
		*/
		this._clickables = [];
	}

	/**
	 * Register obj as clickable. ⚠ Entities need to unregister on destruction!
	 *
	 * @param {DimensionEntity} obj - Object that should be registered
	 * @param {Function} downFunc - Function that is called when mousedown/touchstart is on obj
	 * @param {Function} upFunc - Function that is called when mouseup/touchend is on obj
	 */
	registerClickable(entity) {
		this._clickables.push(entity);
	}

	draw() {
		// Draw position of input
		if (this.g.getDebug()) {
			this.g.painter.ctx.strokeStyle = "red";
			this.g.painter.ctx.lineWidth = 3;
			const l = 8;
			this.g.painter.strokeLine(this._x - l, this._y - l, this._x + l, this._y + l);
			this.g.painter.strokeLine(this._x - l, this._y + l, this._x + l, this._y - l);
		}
	}

	unregisterClickable(entity) {
		for (var i = 0; i < this._clickables.length; i++) {
			if(this._clickables[i] === entity) {
				this._clickables.splice(i, 1);
				return true;
			}
		}

		console.warn("Tried unregistering non-registered clickable");
		return false;
	}

	notifyClickables(up) {
		for (let i = 0; i < this._clickables.length; i++) {
			let iEnt = this._clickables[i];
			if (collision.pointInRectangle(this._x,
			                               this._y,
			                               iEnt.x - iEnt.ox,
			                               iEnt.y - iEnt.oy,
			                               iEnt.x - iEnt.ox + iEnt.width,
			                               iEnt.y - iEnt.oy + iEnt.height)) {
				if (up) {
					if (typeof iEnt.clickUp === "function")
						iEnt.clickUp();
				} else {
					if (typeof iEnt.clickDown === "function")
						iEnt.clickDown();
				}
				return;
			}
		
		}
	}

	// Resets input state
	reset() {
		this._x = 0;
		this._y = 0;
	}


	updateCooordinates(event) {
		let rect = this.g.painter.canvas.getBoundingClientRect();
		this._x = this.xScreenToInternal(event.clientX - rect.left);
		this._y = this.yScreenToInternal(event.clientY - rect.top);
	}

	getX() {
		return this._x;
	}

	getY() {
		return this._y;
	}

	touchstart(event) {
		event.preventDefault(); // Prevent mouse events to fire as well

		this.updateCooordinates(event.touches[0]);
		this.notifyClickables(false);
	}

	touchmove(event) {
		event.preventDefault(); // Prevent mouse events to fire as well
		this.updateCooordinates(event.touches[0]);
	}

	touchend(event) {
		event.preventDefault(); // Prevent mouse events to fire as well

		this.notifyClickables(true);
	}

	mousedown(event) {
		this.updateCooordinates(event);
		this.notifyClickables(false);
	}

	mousemove(event) {
		this.updateCooordinates(event)
	}

	mouseup(event) {
		this.updateCooordinates(event)
		this.notifyClickables(true);
	}

	// Converts xD to x
	xScreenToInternal(xD) {
		return xD / window.innerWidth * this.g.painter.viewWidth - this.g.painter.paddingHorz;
	}

	// Converts yD to y
	yScreenToInternal(yD) {
		return yD / window.innerHeight * this.g.painter.viewHeight - this.g.painter.paddingVert;
	}
}
