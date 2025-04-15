import Button from "../parapluie/objects/util/Button.js";
import Base from "../objects/bases/Base.js";
import PhysicalEntity from "./objects/PhysicalEntity.js";
import * as collision from "./functions/collision.js";

// TODO make static?

export default class Input {
	#x; #y;
	constructor(g) {
		this.g = g;
		this.#x = 0;
		this.#y = 0;

		this.selected = undefined;
		this.selectedTouch = undefined; // TODO merge again?

		// For circle animation
		this.circleCounterMax = 20;
		this.circleCounter = 0;

		this.g.painter.canvas.addEventListener('mousedown', (e) => this.mousedown(e), false);
		this.g.painter.canvas.addEventListener('mousemove', (e) => this.mousemove(e), false);
		this.g.painter.canvas.addEventListener('mouseup', (e) => this.mouseup(e), false);

		this.g.painter.canvas.addEventListener('touchstart', (e) => this.touchstart(e), false);
		this.g.painter.canvas.addEventListener('touchmove', (e) => this.touchmove(e), false);
		this.g.painter.canvas.addEventListener('touchend', (e) => this.touchend(e), false);


		// TODO change Object when renamed
		/**
		  * List of clickable objects
		  * @type {Array.<PhysicalEntity>}
		*/
		this.clickable = [];
	}

	/**
	 * Register obj as clickable
	 *
	 * @param {PhysicalEntity} obj - Object that should be registered
	 * @param {Function} downFunc - Function that is called when mousedown/touchstart is on obj
	 * @param {Function} upFunc - Function that is called when mouseup/touchend is on obj
	 */
	registerClickable(obj) {
		this.clickable.push(obj);
	}

	unregisterClickable(obj) {
		for (var i = 0; i < this.clickable.length; i++) {
			if(this.clickable[i] === obj) {
				this.clickable.splice(i, 1);
				return true;
			}
		}

		console.warn("Could not unregister clickable");
	}

	notifyClickables(up) {
		for (let i = 0; i < this.clickable.length; i++) {
			let iObj = this.clickable[i];
			if (collision.pointInRectangle(this.#x,
			                               this.#y,
			                               iObj.x - iObj.ox,
			                               iObj.y - iObj.oy,
			                               iObj.x - iObj.ox + iObj.width,
			                               iObj.y - iObj.oy + iObj.height)) {
				if (up)
					iObj.clickUp();
				else
					iObj.clickDown();
			}
		
		}
	}

	// Resets input state
	reset() {
		this.#x = 0;
		this.#y = 0;

		this.selected = undefined;
		this.selectedTouch = undefined;
	}

	// Checks if selected bubbles are still owned, otherwise clears
	ensureOwner() {
		if (this.selected !== undefined && this.selected.team !== 1) {
			this.selected = undefined;
		}

		if (this.selectedTouch !== undefined && this.selectedTouch.team !== 1) {
			this.selectedTouch = undefined;
		}
	}

	updateCooordinates(event) {
		let rect = this.g.painter.canvas.getBoundingClientRect();
		this.#x = this.xScreenToInternal(event.clientX - rect.left);
		this.#y = this.yScreenToInternal(event.clientY - rect.top);
	}

	getX() {
		return this.#x;
	}

	getY() {
		return this.#y;
	}

	touchstart(event) {
		event.preventDefault(); // Prevent mouse events to fire as well

		this.notifyClickables(false);

		this.ensureOwner();
		this.updateCooordinates(event.touches[0]);

		// Planet selection
		if (typeof this.selectedTouch === "undefined") {
			let overBubble = this.g.collision_point(this.#x, this.#y, Base);
			if (typeof overBubble !== "undefined") {
				// Start drag method
				this.selectedTouch = overBubble;
			}
		}
	}

	touchmove(event) {
		event.preventDefault(); // Prevent mouse events to fire as well
		this.updateCooordinates(event.touches[0]);
	}

	touchend(event) {
		event.preventDefault(); // Prevent mouse events to fire as well

		this.notifyClickables(true);

		this.ensureOwner();
		// TODO observer pattern
		// Button clicking
		let overButton = this.g.collision_point(this.#x, this.#y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}


		let overBubble = this.g.collision_point(this.#x, this.#y, Base)
		if (typeof overBubble !== "undefined") {
			if (typeof this.selectedTouch !== "undefined") {
				if (overBubble === this.selectedTouch) {
					this.selectedTouch = overBubble;
				} else {
					this.selectedTouch.attack(overBubble);
					this.selectedTouch = undefined;
				}

			}
		} else {
			this.selectedTouch = undefined;
		}
	}

	mousedown(event) {
		this.updateCooordinates(event);

		this.notifyClickables(false);

		this.ensureOwner();

		// Base selection
		if (typeof this.selected === "undefined") {
			let overBubble = this.g.collision_point(this.#x, this.#y, Base);
			if (typeof overBubble !== "undefined") {
				// Start drag method
				this.selected = overBubble;
			}
		}
	}

	mousemove(event) {
		this.updateCooordinates(event)
		// this.ensureOwner(); // TODO check if necessary on move → is executed a lot
	}

	mouseup(event) {
		this.updateCooordinates(event)

		this.notifyClickables(true);

		this.ensureOwner();

		// Button clicking
		let overButton = this.g.collision_point(this.#x, this.#y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}

		let overBubble = this.g.collision_point(this.#x, this.#y, Base)
		if (typeof overBubble !== "undefined") {
			if (typeof this.selected !== "undefined") {
				if (overBubble === this.selected) {
					this.selected = overBubble;
				} else {
					this.selected.attack(overBubble);
					this.selected = undefined;
				}

			}
		} else {
			this.selected = undefined;
		}
	}

	// Draw circle indicator arround selectedBubble and arrow
	selectedDrawing(selectedBubble) {
		if(selectedBubble !== undefined) {
			// Cancel if selected bubble has been captured in the meantime
			if(selectedBubble.team !== 1) {
				selectedBubble = undefined; return;
			}

			// Draw arrow from selected to cursor
			let r = selectedBubble.width / 2;
			if (!collision.pointInCircle(this.#x, this.#y, selectedBubble.x, selectedBubble.y, r)) {
				let dx = this.#x - selectedBubble.x;
				let dy = this.#y - selectedBubble.y;
				let dist = Math.sqrt(dx**2 + dy**2);
				let ndx = dx / dist;
				let ndy = dy / dist;
				let startx = selectedBubble.x + ndx*r;
				let starty = selectedBubble.y + ndy*r;
				this.g.painter.ctx.strokeStyle = "white";
				this.g.painter.ctx.lineWidth = 3;
				this.g.painter.strokeLine(startx, starty, this.#x, this.#y);
			}

			// Highlight selected bubble
			this.g.painter.ctx.lineWidth = 2;
			this.g.painter.ctx.strokeStyle = "white";
			for(let i = 0; i < 5 + Math.abs(this.circleCounter - this.circleCounterMax/2); i+=3) {
				this.g.painter.strokeCircle(
							selectedBubble.x,
							selectedBubble.y,
							selectedBubble.width / 2 + i,
							);
			}

			this.circleCounter = (this.circleCounter + 1) % this.circleCounterMax;
		}

	}

	draw() {
		this.selectedDrawing(this.selected);
		this.selectedDrawing(this.selectedTouch);
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
