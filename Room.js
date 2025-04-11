import Settings from "./Settings.js";

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

		this.objects = [];
	}

	// TODO implement, return to previous room
	return() {
		this.g.gotoRoom(this.returnRoom);
	}

	step() {
		//do nothing
	}

	draw() {
		if (Settings.debug) {
			this.g.painter.ctx.font = "16px fnt_Comforta_Bold";
			this.g.painter.ctx.textAlign = "left";
			this.g.painter.ctx.fillStyle = "white";
			this.g.painter.ctx.fillText("window.innner " + window.innerWidth + ", " + window.innerHeight, 16, 16 + 32*0);;
			this.g.painter.ctx.fillText("this.g.canvas. " + this.g.painter.canvas.width + ", " + this.g.painter.canvas.height, 16, 16 + 32*1);
			this.g.painter.ctx.fillText(`window.devicePixelRatio: ${window.devicePixelRatio}`, 16, 16 + 32*3);
			this.g.painter.ctx.fillText(`scaling: ${Settings.scaling}`, 16, 16 + 32*4);
			this.g.painter.ctx.fillText(`scaled window-inner: ${window.innerWidth * window.devicePixelRatio}, ${window.innerHeight * window.devicePixelRatio}`, 16, 16 + 32*5)
		}
	}

	addObject(obj) {
		obj.parent = this;
		var pos = this.objects.length;
		this.objects[pos] = obj;

		return obj;
	}

	// Simply removes the object `obj` from room.objects and thus from the
	// game loop.
	removeObject(obj) {
		for (var i = 0; i < this.objects.length; i++) {
			if(this.objects[i] === obj) {
				this.objects.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted object that is not in g.room.objects");
		return false;
	}
}
