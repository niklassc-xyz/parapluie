// Abstract Class

export default class Room {

	constructor(g, returnRoom=undefined) {
		if (this.constructor == Room) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		// TODO
		this.background = "datafiles/backgrounds/background2-g1.png";
		this.g = g;

		if (returnRoom === undefined) {
			this.returnRoom = this.g.initialRoom;		
		} else {
			this.returnRoom = returnRoom;
		}

		this.roomEntered = this.g.stepCount;

		this.entities = [];
	}

	// TODO implement, return to previous room
	return() {
		this.g.gotoRoom(this.returnRoom);
	}

	step() {
		// do nothing
	}

	draw() {
		// do nothing

		if (this.g.getDebug()) {
			this.g.painter.setLineWidth(1);
			this.g.painter.setStrokeStyle("red");
			this.g.painter.strokeRect(0, 0, this.g.roomWidth, this.g.roomHeight);
		}
	}

	// Call destroy() on all entities in room
	destroyEntities() {
		while (this.entities.length > 0) {
			this.entities[0].destroy();
		}
	}

	addObject(obj) {
		obj.parent = this;
		this.entities.push(obj);
		obj.onAdd();

		return obj;
	}

	// TODO rename to removeEntity
	// Simply removes the object `obj` from room.entities and thus from the
	// game loop.
	removeObject(obj) {
		for (var i = 0; i < this.entities.length; i++) {
			if(this.entities[i] === obj) {
				this.entities.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted object that is not in g.room.entities");
		return false;
	}
}
