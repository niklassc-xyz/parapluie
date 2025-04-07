import PhysicalEntity from "./PhysicalEntity.js";
import * as f from "../../functions.js";

export default class SpriteEntity extends PhysicalEntity {
	constructor(g, x, y, width, height, sprite) {
		super(g, x, y, width, height);

		this.sprite = sprite;
	}

	draw() {
		super.draw();
		
		// Draw sprite
		if(this.direction !== 0) {
			// Rotate before drawing
			this.g.ctx.save();
			this.g.ctx.translate(this.x, this.y);
			this.g.ctx.rotate(f.degtorad(this.direction));//Math.PI/180 is to Radians
			this.g.ctx.drawImage(this.sprite, -this.ox, -this.oy, this.width, this.height);
			this.g.ctx.restore();
		} else {
			this.g.ctx.drawImage(this.sprite, this.x - this.ox, this.y - this.oy, this.width, this.height);
		}
	}
}
