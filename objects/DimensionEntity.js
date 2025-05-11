import GameEntity from "./GameEntity.js";
import * as collision from "../functions/collision.js";

export default class DimensionEntity extends GameEntity {
	// TODO default values
	constructor(g, x, y, width=0 , height=0, z=0) {
		super(g);

		this.x = x;
		this.y = y;
		this.ox = 0; // Origin
		this.oy = 0;
		this.z = z;

		this.width = width;
		this.height = height;
	}

	// TODO obolsete (ORIGIN)
	// TODO remove or rename
	isOutsideRoomVert() {
		return (this.x > this.g.roomWidth) || (this.width + this.x < 0);
	}

	// TODO obolsete (ORIGIN)
	isOutsideRoomHorz() {
		return (this.y > this.g.roomHeight) || (this.height + this.y < 0);
	}

	// TODO obolsete (ORIGIN)
	isOutsideRoom() {
		return this.isOutsideRoomVert() || this.isOutsideRoomHorz();
	}

	// For Debugging, draws border around object
	// Set `hover` to also show when the object is hovered
	drawBorder(hover=false) {
		if (hover) {
			let x1 = this.x - this.ox
			let y1 = this.y - this.oy
			let x2 = x1 + this.width
			let y2 = y1 + this.height
			if (collision.pointInRectangle(this.g.input.getX(), this.g.input.getY(), x1, y1, x2, y2)) {
				this.g.painter.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
				this.g.painter.ctx.fillRect(this.x - this.ox, this.y - this.oy, this.width, this.height);
			}
		}

		this.g.painter.ctx.strokeStyle = "red";
		this.g.painter.ctx.lineWidth = 3;
		this.g.painter.ctx.setLineDash([6]);
		this.g.painter.ctx.strokeRect(this.x - this.ox, this.y - this.oy, this.width, this.height);
		this.g.painter.ctx.setLineDash([]);

	}
	
	// For Debugging, draws (x,y)
	drawXY() {
		this.g.painter.ctx.strokeStyle = "red";
		this.g.painter.ctx.lineWidth = 3;

		this.g.painter.ctx.beginPath();
		this.g.painter.ctx.moveTo(this.x - 10, this.y - 10);
		this.g.painter.ctx.lineTo(this.x + 10, this.y + 10);
		this.g.painter.ctx.stroke();

		this.g.painter.ctx.beginPath();
		this.g.painter.ctx.moveTo(this.x - 10, this.y + 10);
		this.g.painter.ctx.lineTo(this.x + 10, this.y - 10);
		this.g.painter.ctx.stroke();
	}
}
