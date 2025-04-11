// TODO stokeLine → fill does not exist
/**
 * Draws a line on a canvas
 *
 * @param {CanvasRenderingContext2D} ctx - Rendering context to draw on
 * @param {number} x1 - Start x
 * @param {number} y1 - Start y
 * @param {number} x2 - End x
 * @param {number} y2 - End y
 */
export function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

/**
 * Draws a circle that is filled
 *
 * @param {CanvasRenderingContext2D} ctx - Rendering context to draw on
 * @param {number} x - Center x
 * @param {number} y - Center y
 * @param {number} r - Radius
 */
export function fillCircle(ctx, x, y, r) {
	drawCircle(ctx, x, y, r, false);
}

/**
 * Draws a circle that is stroked (outlined)
 *
 * @param {CanvasRenderingContext2D} ctx - Rendering context to draw on
 * @param {number} x - Center x
 * @param {number} y - Center y
 * @param {number} r - Radius
 */
export function strokeCircle(ctx, x, y, r) {
	drawCircle(ctx, x, y, r, true);
}





// ######### Private ######################################################## {

function drawCircle(ctx, x, y, r, outline) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	if(outline)
		ctx.stroke();
	else
		ctx.fill();
}

// }}}
