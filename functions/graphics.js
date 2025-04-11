// stroke* Outline version
// fill*   Filled version
// draw*   Both
// render* Internal

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
export function strokeLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

// Circle {{{
/**
 * Draws a circle, outline and filling
 *
 * @param {CanvasRenderingContext2D} ctx - Rendering context to draw on
 * @param {number} x - Center x
 * @param {number} y - Center y
 * @param {number} r - Radius
 */
export function drawCircle(ctx, x, y, r) {
	renderCircle(ctx, x, y, r, true, true);
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
	renderCircle(ctx, x, y, r, true, false);
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
	renderCircle(ctx, x, y, r, false, true);
}
// }}}

// Roundrect {{{

/**
 * Draws a roundrect, outline and filling
 *
 * @param {CanvasRenderingContext2D} ctx - Rendering context to draw on
 * @param {number} x1 - lowest x coordinate of roundrect
 * @param {number} y1 - lowest y coordinate of roundrect
 * @param {number} x2 - highest x coordinate of roundrect
 * @param {number} y2 - highest y coordinate of roundrect
 * @param {number} radius - Radius
 */
export function drawRoundrect(ctx, x1, y1, x2, y2, radius) {
	renderRoundrect(ctx, x1, y1, x2, y2, radius, true, true);
}

/**
 * Draws a roundrect, that is filled
 *
 * @param {CanvasRenderingContext2D} ctx - Rendering context to draw on
 * @param {number} x1 - lowest x coordinate of roundrect
 * @param {number} y1 - lowest y coordinate of roundrect
 * @param {number} x2 - highest x coordinate of roundrect
 * @param {number} y2 - highest y coordinate of roundrect
 * @param {number} radius - Radius
 */
export function fillRoundrect(ctx, x1, y1, x2, y2, radius) {
	renderRoundrect(ctx, x1, y1, x2, y2, radius, true, false);
}

/**
 * Draws a roundrect, that is stroked (outlined)
 *
 * @param {CanvasRenderingContext2D} ctx - Rendering context to draw on
 * @param {number} x1 - lowest x coordinate of roundrect
 * @param {number} y1 - lowest y coordinate of roundrect
 * @param {number} x2 - highest x coordinate of roundrect
 * @param {number} y2 - highest y coordinate of roundrect
 * @param {number} radius - Radius
 */
export function strokeRoundrect(ctx, x1, y1, x2, y2, radius) {
	renderRoundrect(ctx, x1, y1, x2, y2, radius, false, true);
}

// }}}


// ######### Private ######################################################## {

function renderCircle(ctx, x, y, r, fill, stroke) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	if (fill)
		ctx.fill();
	if (stroke)
		ctx.stroke();
}

/**
 * Draws a roundrect
 *
 * @param {CanvasRenderingContext2D} ctx - Rendering context to draw on
 * @param {number} x1 - lowest x coordinate of roundrect
 * @param {number} y1 - lowest y coordinate of roundrect
 * @param {number} x2 - highest x coordinate of roundrect
 * @param {number} y2 - highest y coordinate of roundrect
 * @param {number} radius - Radius
 * @param {boolean} fill - Whether to fill the roundrect
 * @param {boolean} stroke - Whether to outline the roundrect
 */
function renderRoundrect(ctx, x1, y1, x2, y2, radius=5, fill=true, stroke=true) {
	// TODO implement setting individual corner radius
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	} else {
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}

	ctx.beginPath();
	ctx.moveTo(x1 + radius.tl, y1);
	ctx.lineTo(x2 - radius.tr, y1);
	ctx.quadraticCurveTo(x2, y1, x2, y1 + radius.tr);
	ctx.lineTo(x2, y2 - radius.br);
	ctx.quadraticCurveTo(x2, y2, x2 - radius.br, y2);
	ctx.lineTo(x1 + radius.bl, y2);
	ctx.quadraticCurveTo(x1, y2, x1, y2 - radius.bl);
	ctx.lineTo(x1, y1 + radius.tl);
	ctx.quadraticCurveTo(x1, y1, x1 + radius.tl, y1);
	ctx.closePath();
	if (fill)
		ctx.fill();
	if (stroke)
		ctx.stroke();
}

// }}}
