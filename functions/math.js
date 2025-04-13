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
