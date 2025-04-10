import Settings from "./Settings.js";

// Abstract Class

export default class Room {
	static background = "datafiles/backgrounds/background2-g1.png";

	constructor(g, returnRoom = undefined) {
		if (this.constructor == Room) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		this.g = g;

		if (typeof(initialRoom) === undefined) {
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
			this.g.ctx.font = "16px fnt_Comforta_Bold";
			this.g.ctx.textAlign = "left";
			this.g.ctx.fillStyle = "white";
			this.g.ctx.fillText("window.innner " + window.innerWidth + ", " + window.innerHeight, 16, 16 + 32*0);;
			this.g.ctx.fillText("this.g.canvas. " + this.g.canvas.width + ", " + this.g.canvas.height, 16, 16 + 32*1);
			this.g.ctx.fillText("this.g.canvas_ " + this.g.canvas_width + ", " + this.g.canvas_height, 16, 16 + 32*2);
			this.g.ctx.fillText(`window.devicePixelRatio: ${window.devicePixelRatio}`, 16, 16 + 32*3);
			this.g.ctx.fillText(`scaling: ${Settings.scaling}`, 16, 16 + 32*4);
			this.g.ctx.fillText(`scaled window-inner: ${window.innerWidth * window.devicePixelRatio}, ${window.innerHeight * window.devicePixelRatio}`, 16, 16 + 32*5)
		}
	}

	addObject(obj) {
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
