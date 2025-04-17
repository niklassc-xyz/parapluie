import SpriteEntity from "../../objects/SpriteEntity.js";
import ResourceManager from "../../ResourceManager.js";
import * as collision  from "../../functions/collision.js";

// TODO extend from Entity instead of SpriteEntity
export default class Button extends SpriteEntity {
	constructor(g, text, x, y, width, height, onClick, disabled) {
		const sprite = ResourceManager.getSpriteFromPath("datafiles/sprites/lock.png");
		super(g, x, y, width, height, sprite);
		this.text = text;
		this.borderColour = "white";
		this.fontSize = 56;
		this.setFontSize(this.fontSize);
		this.disabled = (disabled === undefined) ? false : disabled;
		this.animationSpeed = 0.1 + Math.random() * 0.2

		this.g.input.registerClickable(this, undefined, onClick);

		// TODO calculate font size based on width and text
	}

	setFontSize(size) {
		this.fontSize = size;
		this.font = Math.round(this.fontSize) + "px fnt_Comforta_Regular";
	}

	draw() {
		let lw = 2;

		if (collision.pointInRectangle(this.g.input.getX(), this.g.input.getY(), this.x, this.y, this.x+this.width, this.y+this.height)) {
			lw = 8;
		}


		// TODO sinus curve
		let animationN = 32
		// let animationSpeed = 0.3
		let fill = this.g.stepCount * this.animationSpeed % animationN
		fill = Math.abs(fill - animationN / 2)
		// Normalize
		fill = fill / (animationN/2)
		// Scale
		fill = fill * 0.3

		this.g.painter.ctx.lineWidth = lw;
		this.g.painter.ctx.strokeStyle = "rgba(50, 50, 50, 0.3)";
		this.g.painter.strokeRoundrect(
			this.x,
			this.y,
			this.x + this.width + lw,
			this.y + this.height + lw,
			6
		);

		this.g.painter.ctx.strokeStyle = this.borderColour;

		this.g.painter.ctx.fillStyle = `rgba(200, 200, 255, ${fill})`;
		this.g.painter.drawRoundrect(
			this.x,
			this.y,
			this.x + this.width,
			this.y + this.height,
			6
		);

		// let locked = false; // TODO implement lock system
		if(this.disabled) {
			this.g.painter.ctx.strokeStyle = "#607d8b";
			this.g.painter.ctx.fillStyle = "#607d8b";
			this.g.painter.ctx.drawImage(this.sprite, this.x - this.ox + this.width * 0.25, this.y - this.oy + this.height * 0.14, this.width * 0.5, this.height * 0.5);
		} else {
			this.g.painter.ctx.strokeStyle = "white";
			this.g.painter.ctx.fillStyle = "white";
		}


		this.g.painter.ctx.textAlign = "center";
		this.g.painter.ctx.textBaseline = "middle";
		this.g.painter.ctx.font = this.font;
		this.g.painter.ctx.fillText(
			this.text,
			this.x + this.width / 2,
			this.y + this.height / 2
		);
	}

	destroy() {
		super.destroy();
		this.g.input.unregisterClickable(this);
	}
}
