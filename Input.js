import * as f from "../functions.js";
import Button from "../objects/Button.js";
import Base from "../objects/bases/Base.js";
import PhysicalEntity from "./objects/PhysicalEntity.js";

// TODO make static?

export default class Input {
	constructor(g) {
		this.g = g;
		this.x = 0;
		this.y = 0;

		this.selected = undefined;
		this.selectedTouch = undefined; // TODO merge again?
	
		this.canvas = g.canvas;	
		this.ctx = g.ctx;

		// For circle animation
		this.circleCounterMax = 20;
		this.circleCounter = 0;

		this.canvas.addEventListener('mousedown', (e) => this.mousedown(e), false);
		this.canvas.addEventListener('mousemove', (e) => this.mousemove(e), false);
		this.canvas.addEventListener('mouseup', (e) => this.mouseup(e), false);

		this.canvas.addEventListener('touchstart', (e) => this.touchstart(e), false);
		this.canvas.addEventListener('touchmove', (e) => this.touchmove(e), false);
		this.canvas.addEventListener('touchend', (e) => this.touchend(e), false);


		// TODO change Object when renamed
		/**
		  * List of clickable objects
		  * @type {Array.<PhysicalEntity>}
		*/
		let clickable = [];
	}

	/**
	 * Register obj as clickable
	 *
	 * @param {PhysicalEntity} obj - Object that should be registered
	 */
	registerClickable(obj) {
		clickable.push(obj);
	}

	// Resets input state
	reset() {
		this.x = 0;
		this.y = 0;

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
		let rect = this.canvas.getBoundingClientRect();
		this.setX(this.xScreenToInternal(event.clientX - rect.left));
		this.setY(this.yScreenToInternal(event.clientY - rect.top));

		// console.log(event);
		// this.setX(f.xScreenToInternal(event.clientX));
		// this.setY(f.yScreenToInternal(event.clientY));
	}

	// TODO remove?
	setX(x) {
		this.x = x;
	}

	// TODO remove?
	setY(y) {
		this.y = y;
	}

	touchstart(event) {
		event.preventDefault(); // Prevent mouse events to fire as well
		this.ensureOwner();
		this.updateCooordinates(event.touches[0]);

		// Planet selection
		if (typeof this.selectedTouch === "undefined") {
			let overBubble = this.g.collision_point(this.x, this.y, Base);
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
		this.ensureOwner();
		// TODO observer pattern
		// Button clicking
		let overButton = this.g.collision_point(this.x, this.y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}


		let overBubble = this.g.collision_point(this.x, this.y, Base)
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
		this.ensureOwner();

		// Base selection
		if (typeof this.selected === "undefined") {
			let overBubble = this.g.collision_point(this.x, this.y, Base);
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
		this.ensureOwner();

		// Button clicking
		let overButton = this.g.collision_point(this.x, this.y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}

		let overBubble = this.g.collision_point(this.x, this.y, Base)
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
			if (!f.pointInCircle(this.x, this.y, selectedBubble.x, selectedBubble.y, r)) {
				let dx = this.x - selectedBubble.x;
				let dy = this.y - selectedBubble.y;
				let dist = Math.sqrt(dx**2 + dy**2);
				let ndx = dx / dist;
				let ndy = dy / dist;
				let startx = selectedBubble.x + ndx*r;
				let starty = selectedBubble.y + ndy*r;
				this.g.ctx.strokeStyle = "white";
				this.g.ctx.lineWidth = 3;
				f.drawLine(this.ctx, startx, starty, this.x, this.y);
			}

			// Highlight selected bubble
			this.g.ctx.lineWidth = 2;
			this.g.ctx.strokeStyle = "white";
			for(let i = 0; i < 5 + Math.abs(this.circleCounter - this.circleCounterMax/2); i+=3) {
				f.drawCircle(this.g.ctx,
							selectedBubble.x,
							selectedBubble.y,
							selectedBubble.width / 2 + i,
							true);
			}

			this.circleCounter = (this.circleCounter + 1) % this.circleCounterMax;
		}

	}

	draw() {
		this.selectedDrawing(this.selected);
		this.selectedDrawing(this.selectedTouch);

		// this.g.ctx.fillStyle = "red";
		// f.drawCircle(this.g.ctx, this.x, this.y, 8, false);
	}


	// Converts xD to x
	xScreenToInternal(xD) {
		// return xD / g.canvasStyleWidth * g.roomWidth;
		// return xD / window.innerWidth * this.g.roomWidth;
		return xD / window.innerWidth * this.g.viewWidth - this.g.paddingHorz;
	}

	// Converts yD to y
	yScreenToInternal(yD) {
		// return yD / g.canvasStyleHeight * g.roomHeight;
		// return yD / window.innerHeight * this.g.roomHeight;
		return yD / window.innerHeight * this.g.viewHeight - this.g.paddingVert;
	}
}
