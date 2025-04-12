export default class ResourceManager {
	/**
	 * Key-value store of sprites
	 */
	static #sprites = {};


	static getSpriteFromPath(path) {
		// sprite exists
		if (this.#sprites[path] !== undefined) {
			return this.#sprites[path];
		}

		// sprite don't exists → load
		let sprite = new Image();
		sprite.src = path;

		// TODO ensure sprite is loaded
		// await sprite.decode();

		this.#sprites[path] = sprite;

		return sprite
	}
}
