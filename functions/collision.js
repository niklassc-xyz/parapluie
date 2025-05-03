// TODO to (static) class

export function pointInRectangle(px, py, x1, y1, x2, y2) {
	if (px < x1 || py < y1 || px > x2 || py > y2)
		return false;
	return true;
}
// TODO camelCase
export function rectangleInRectangle(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
	if (ax1 <= bx1) {
		if(ax2 < bx1)
			return false;
	} else {
		if (bx2 < ax1)
			return false;
	}
	if (ay1 <= by1) {
		if (ay2 >= by1)
			return true;
	} else {
		if(by2 >= ay1)
			return true;
	}
	return false;
}

// TODO implement
// Checks if point (x,y) is in circle at (cx,cy) with radius r
export function pointInCircle(x, y, cx, cy, r) {
	// console.log(x, y, cx, cy, r);

	let dx = Math.abs(x - cx);
	let dy = Math.abs(y - cy);
	// let dist = Math.sqrt(dx^2 + dy^2); // TODO should use ** instead of ^

	// console.log(dist, r);
	// console.log();

	// return dist < r;

	return dx <= r && dy <= r;
}

// TODO implement
export function circleInCircle(x1, y1, r1, x2, y2, r2) {
	let dx = Math.abs(x1 - x2);
	let dy = Math.abs(y1 - y2);
	
	// Total radius
	rt = r1 + r2;
	return dx <= rt && dy <= rt;
}

