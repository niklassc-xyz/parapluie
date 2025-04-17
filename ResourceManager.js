export default class ResourceManager {
	constructor() {
		this._sprites = {};
		this._sounds = {};
		this._mute = true;
	}

	getSpriteFromPath(path) {
		// sprite exists
		if (this._sprites[path] !== undefined) {
			return this._sprites[path];
		}

		// sprite don't exists → load
		let sprite = new Image();
		sprite.src = path;

		// TODO ensure sprite is loaded
		// await sprite.decode();

		this._sprites[path] = sprite;

		return sprite
	}

	getMute() {
		return this._mute;
	}

	setMute(val) {
		this._mute = val;
	}

	playSoundFromPath(path) {
		if (this._mute)
			return;

		// sound exists
		if (this._sounds[path] !== undefined) {
			this._sounds[path].play();
			return;
		}

		// sound don't exists → load
		let sound = new Audio(path);
		this._sounds[path] = sound;

		sound.play();
	}
}
