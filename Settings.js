// Static class that handles settings

export default class Settings {
	static debug = false;
	static experimental = true;
	static scaling = true;
	static paused = false;
	static fullscreen = false; // TODO check / remove
	static mute = false;

	/**
	 * Whether jellies glow
	 * @type {Bool}
	 */
	static #jellyGlow = true;

	// Initialized fields in overlay
	static initOverlay() {
		// TODO
	}

	// Show overlay
	static show() {
		document.getElementById("settingsOverlay").classList.remove("hidden");
	}

	// Hide overlay
	static hide() {
		document.getElementById("settingsOverlay").classList.add("hidden");
	}

	static toggleDebug() {
		// TODO
		Settings.debug = !Settings.debug;
		document.getElementById("sDebug").checked = Settings.debug;
	}

	static toggleExperimental() {
		Settings.experimental = !Settings.experimental;
		document.getElementById("sExperimental").checked = Settings.experimental;
	}

	static toggleScaling() {
		Settings.scaling = !Settings.scaling;
		document.getElementById("sScaling").checked = Settings.scaling;
		f.resizeCanvas();
	}

	static pause() {
		Settings.paused = true;
		document.getElementById("pausedOverlay").classList.remove("hidden");
	}

	static unpause() {
		Settings.paused = false;
		document.getElementById("pausedOverlay").classList.add("hidden");
	}

	/**
	 * Set whether jelly glow is enabled
	 *
	 * @static
	 * @param {Boolean} val - Whether jelly glow should be on or off
	 */
	static setJellyGlow(val) {
		this.#jellyGlow = val;
	}

	/**
	 * Returns whether jelly glow is enabled
	 *
	 * @static
	 * @returns {Boolean} Whether jelly glow is enabled
	 */
	static getJellyGlow() {
		return this.#jellyGlow;
	}

	/**
	 * Toggle whether jelly glow is enabled
	 *
	 * @static
	 * @returns {Boolean} True if glow was enabled, false otherwise
	 */
	static toggleJellyGlow() {
		this.#jellyGlow = !this.#jellyGlow;
		return this.#jellyGlow;
	}

	static toggleMute() {
		this.mute = !this.mute;
		return this.mute;
	}
}
