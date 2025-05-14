import PhysicalEntity from "./PhysicalEntity.js";
import * as math from "../functions/math.js";

export default class SpriteEntity extends PhysicalEntity {
	/**
	 * A PhysicalEntity that has a sprite
	 *
	 * @param {Game reference} g - Game reference
	 * @param {x coordinate} x - x-coordinate
	 * @param {y coordinate} y - y-coordinate
	 * @param {Width of the entity} width - Width of the entity
	 * @param {Height of the entity} height - Height of the entity
	 * @param {string|OffscreenCanvas} sprite - Sprite of the entity, can be either image or path
	 */
	constructor(g, x, y, width, height, sprite, z=0) {
		super(g, x, y, width, height, z);

		if (typeof sprite === "string") {
			this.sprite = this.g.resourceManager.getSpriteByPath(sprite);
		} else {
			// TODO check that sprite is an image
			this.sprite = sprite;
		}
	}

	draw() {
		super.draw();
		
		// TODO use painter
		// Draw sprite
		if (this.direction !== 0) {
			// Rotate before drawing
			this.g.painter.ctx.save();
			this.g.painter.ctx.translate(this.x, this.y);
			this.g.painter.ctx.rotate(math.degToRad(this.direction));//Math.PI/180 is to Radians
			this.g.painter.ctx.drawImage(this.sprite, -this.ox, -this.oy, this.width, this.height);
			this.g.painter.ctx.restore();
		} else {
			this.g.painter.ctx.drawImage(this.sprite, this.x - this.ox, this.y - this.oy, this.width, this.height);
		}
	}
}
