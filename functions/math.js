/**
 * Returns a random element
 *
 * @param {Array.<T>} arr - Input array to choose element from
 * @returns {T} The random element from `arr`
 */
export function chooseRandom(arr) {
	let ri = Math.floor(arr.length * Math.random());
	return arr[ri];
}

export function radToDeg(rad) {
	return rad * (180 / Math.PI);
}
export function degToRad(deg) {
	return deg * (Math.PI / 180);
}

// Returns direction from (x1|x2) to (x2|y2)
export function pointDirection(x1, y1, x2, y2) { // TODO test
	let dx = x2 - x1;
	let dy = y2 - y1;

	return radToDeg(Math.atan2(dy, dx));
}

// Mathematical modulo
export function mMod(a, b) {
	return ((a % b + b) % b);
}
