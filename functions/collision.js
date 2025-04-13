import * as math from "./math.js";

// Returns direction from (x1|x2) to (x2|y2)
export function pointDirection(x1, y1, x2, y2) { // TODO test
	let dx = x2 - x1;
	let dy = y2 - y1;

	return math.radToDeg(Math.atan2(dy, dx));
}
