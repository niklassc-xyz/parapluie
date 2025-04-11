// All objects that can be stored in room.objects have to extend from this so
// that they are guaranteed to have the methods.

export default class GameEntity {
	constructor(g) {
		this.g = g;
		this.parent = null; // Stores object that will call step, draw, destroy (usually the room)
	}
	step() {}
	draw() {}
	destroy() {
		this.parent.removeObject(this);
	}
}
