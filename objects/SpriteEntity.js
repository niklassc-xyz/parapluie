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
			this.g.painter.ctx.save();
			this.g.painter.ctx.translate(this.x, this.y);
			this.g.painter.ctx.rotate(f.degToRad(this.direction));//Math.PI/180 is to Radians
			this.g.painter.ctx.drawImage(this.sprite, -this.ox, -this.oy, this.width, this.height);
			this.g.painter.ctx.restore();
		} else {
			this.g.painter.ctx.drawImage(this.sprite, this.x - this.ox, this.y - this.oy, this.width, this.height);
		}
	}
}
