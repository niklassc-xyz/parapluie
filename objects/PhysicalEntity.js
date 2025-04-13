import GameEntity from "./GameEntity.js";
import * as f from "../../functions.js";
import * as math from "../functions/math.js";

// TOOD rename
export default class PhysicalEntity extends GameEntity {
	// TODO default values
	constructor(g, x, y, width, height) {
		super(g);

		this.x = x;
		this.y = y;
		this.ox = 0; // Origin
		this.oy = 0;
		this.hspeed = 0;
		this.vspeed = 0;
		this.direction = 0; // TODO document starting angle, deg/rad
		this.speed = 0;
		this.width = (width === undefined) ? 0 : width;
		this.height = (height === undefined) ? 0 : height;;

		// Set whether objects leaving the room should jump to the other side of
		// the room:
		// 0: off, 1: horizontal, vertical, both
		// TODO camelCase, remove prefix
		this.opt_swapScreen = 0;
	}

	/**
	 * Called when object is clicked or tapped (if object registered as clickable)
	 */
	click() {
		
	}

	setDirection(direction) {
		this.setDirectionSpeed(direction, this.speed);
	}

	setSpeed(speed) {
		this.setDirectionSpeed(this.direction, speed);
	}

	setDirectionSpeed(direction, speed) {
		this.direction = direction;
		this.speed = speed;

		// Calc horizontal and vertical speeds
		let radDeg = math.degToRad(direction);
		this.vspeed = Math.sin(radDeg) * speed;
		this.hspeed = Math.cos(radDeg) * speed;
	}

	setHspeed(hspeed) {
		this.setSpeeds(hspeed, this.vspeed);
	}

	setVspeed(vspeed) {
		this.setSpeeds(this.hspeed, vspeed);
	}

	setSpeeds(hspeed, vspeed) {
		this.hspeed = hspeed;
		this.vspeed = vspeed;

		this.direction = math.radToDeg(Math.atan2(this.vspeed, this.hspeed));

		// Calc total speed from horizontal and vertical speed
		this.speed = Math.sqrt(this.hspeed * this.hspeed + this.vspeed * this.vspeed);
	}

	step() {
		this.x += this.hspeed;
		this.y += this.vspeed;
		if(this.opt_swapScreen !== 0) {
			this.swapScreen();
		}
	}

	// TODO obolsete (ORIGIN)
	isOutsideRoom_vert() {
		return (this.x > this.g.roomWidth) || (this.width + this.x < 0);
	}

	// TODO obolsete (ORIGIN)
	isOutsideRoom_horz() {
		return (this.y > this.g.roomHeight) || (this.height + this.y < 0);
	}

	// TODO obolsete (ORIGIN)
	isOutsideRoom() {
		return this.isOutsideRoom_vert() || this.isOutsideRoom_horz();
	}

	// TODO comment
	// TODO test → canvas_width was replaced with roomWidth, also height
	swapScreen() {
		if(this.opt_swapScreen >= 2) {
			if(this.y > g.roomHeight + (this.height/2)) this.y = -(this.height/2);
			if((this.height/2) + this.y < 0) this.y = g.roomHeight + (this.height/2);
		}
		if(this.opt_swapScreen === 2) return;
		if(this.x > g.roomWidth + (this.width/2)) this.x = -(this.width/2);
		if((this.width/2) + this.x < 0) this.x = g.roomWidth + (this.width/2);
	}

	// Sets hspeed and vspeed to move towards (x,y) with speed v
	moveTowardsPoint(x, y, v) {
		let dir = math.pointDirection(this.x, this.y, x, y);

		if(v === undefined)
			this.setDirection(dir);
		else {
			this.setDirectionSpeed(dir, v);
		}
	}

	// For Debugging, draws border around object
	// Set `hover` to also show when the object is hovered
	drawBorder(hover=false) {
		if (hover) {
			let x1 = this.x - this.ox
			let y1 = this.y - this.oy
			let x2 = x1 + this.width
			let y2 = y1 + this.height
			if (f.pointInRectangle(input.x, input.y, x1, y1, x2, y2)) {
				this.g.this.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
				this.g.this.ctx.fillRect(this.x - this.ox, this.y - this.oy, this.width, this.height);
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
