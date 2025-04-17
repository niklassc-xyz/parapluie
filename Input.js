import PhysicalEntity from "./objects/PhysicalEntity.js";
import * as collision from "./functions/collision.js";

// TODO make static?

export default class Input {
	#x; #y;
	constructor(g) {
		this.g = g;
		this.#x = 0;
		this.#y = 0;

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
	 * Register obj as clickable. ⚠ Entities need to unregister on destruction!
	 *
	 * @param {DimensionEntity} obj - Object that should be registered
	 * @param {Function} downFunc - Function that is called when mousedown/touchstart is on obj
	 * @param {Function} upFunc - Function that is called when mouseup/touchend is on obj
	 */
	registerClickable(ent, clickDownFn = ()=>{}, clickUpFn = ()=>{}) {
		this.clickable.push({
			entity: ent,
			clickDown: clickDownFn,
			clickUp: clickUpFn,
		});
	}

	unregisterClickable(entity) {
		for (var i = 0; i < this.clickable.length; i++) {
			if(this.clickable[i].entity === entity) {
				this.clickable.splice(i, 1);
				return true;
			}
		}

		console.warn("Tried unregistering non-registered clickable");
		return false;
	}

	notifyClickables(up) {
		for (let i = 0; i < this.clickable.length; i++) {
			let iEnt = this.clickable[i].entity;
			if (collision.pointInRectangle(this.#x,
			                               this.#y,
			                               iEnt.x - iEnt.ox,
			                               iEnt.y - iEnt.oy,
			                               iEnt.x - iEnt.ox + iEnt.width,
			                               iEnt.y - iEnt.oy + iEnt.height)) {
				if (up)
					// console.log("BUTTON UP");
					this.clickable[i].clickUp();
					// iEnt.clickUp();
				else
					// console.log("BUTTON DOWN");
					this.clickable[i].clickDown();
					// iEnt.clickDown();
			}
		
		}
	}

	// Resets input state
	// reset() {
	// 	this.#x = 0;
	// 	this.#y = 0;
	// }


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
		this.updateCooordinates(event.touches[0]);
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
