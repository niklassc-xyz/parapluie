// Abstract Class

export default class Room {
	static background = "datafiles/backgrounds/background2-g1.png";

	constructor(g, returnRoom = undefined) {
		if (this.constructor == Room) {
			throw new Error("Abstract classes can't be instantiated.");
		}

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
		//do nothing
	}

	draw() {
		if (this.g.getDebug()) {
			this.g.painter.ctx.font = "16px fnt_Comforta_Bold";
			this.g.painter.ctx.textAlign = "left";
			this.g.painter.ctx.fillStyle = "white";
			this.g.painter.ctx.fillText("window.innner " + window.innerWidth + ", " + window.innerHeight, 16, 16 + 32*0);;
			this.g.painter.ctx.fillText("this.g.canvas. " + this.g.painter.canvas.width + ", " + this.g.painter.canvas.height, 16, 16 + 32*1);
			this.g.painter.ctx.fillText(`window.devicePixelRatio: ${window.devicePixelRatio}`, 16, 16 + 32*3);
			this.g.painter.ctx.fillText(`scaling: ${this.g.scaling}`, 16, 16 + 32*4);
			this.g.painter.ctx.fillText(`scaled window-inner: ${window.innerWidth * window.devicePixelRatio}, ${window.innerHeight * window.devicePixelRatio}`, 16, 16 + 32*5)
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
		var pos = this.entities.length;
		this.entities[pos] = obj;

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
