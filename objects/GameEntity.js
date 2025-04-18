/**
 * All entities that can be part of the game loop have to extend from this so
 * that they are guaranteed to have these methods.
 */
export default class GameEntity {
	/**
	 * @param {Game} g - Game reference
	 */
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
