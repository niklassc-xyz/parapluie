import Input from "./Input.js";
import Startpage from "../rooms/Startpage.js";
import Storage from "./Storage.js";
import Settings from "./Settings.js";
import * as f from "../functions.js";
import * as globals from "../globals.js";
import SimBubble from "../objects/SimBubble/SimBubble.js";
import ProgressManager from "../appEtc/ProgressManager.js";


export default class Game {
	constructor() {
		// TODO remove
		globals.spr_Raumschiff[1] = document.getElementById("qualleRed");
		globals.spr_Raumschiff[2] = document.getElementById("qualleBlue");
		globals.spr_Raumschiff[3] = document.getElementById("qualleGreen");
		globals.spr_Raumschiff[4] = document.getElementById("qualleYellow");


		// TODO move to room?
		this.roomWidth = 1280;
		this.roomHeight = 720;

		this.paddingVert = 0;
		this.paddingHorz = 0;

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.resizeCanvas();

		// Counts steps, paused when game is paused
		this.stepCount = 0;

		this.input = new Input(this);

		this.storage = new Storage("localStorage");
		this.progressManager = new ProgressManager(this.storage);
		this.room = new Startpage(this);

		setInterval(() => this.step(), 1000/60); // 60 FPS

		// setTimeout(() => this.resizeCanvas(), 100);
	}

	resizeCanvas() {
		// W/H the canvas will be displayed as
		this.canvas.style.width = window.innerWidth;
		this.canvas.style.height = window.innerHeight;

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		if (Settings.scaling) {
			this.canvas.width *= window.devicePixelRatio;
			this.canvas.height *= window.devicePixelRatio;
		}

		// Calculate room view
		// → TODO use view dimensions instead of room
		// let canvasRatio = canvas.style.width / canvas.style.height;
		let windowRatio = window.innerWidth / window.innerHeight;
		let roomRatio = this.roomWidth / this.roomHeight;

		this.paddingVert = 0; // on each side
		this.paddingHorz = 0; // on each side
		if (windowRatio > roomRatio) {
			this.viewHeight = this.roomHeight;
			this.viewWidth = this.roomHeight * (window.innerWidth / window.innerHeight);
			this.paddingHorz = (this.viewWidth - this.roomWidth) / 2;
		} else {
			this.viewWidth = this.roomWidth;
			this.viewHeight = this.roomWidth * (window.innerHeight / window.innerWidth);
			this.paddingVert = (this.viewHeight - this.roomHeight) / 2;
		}

		let xScalar = window.innerWidth / this.viewWidth;
		let yScalar = window.innerHeight / this.viewHeight;

		if (Settings.scaling) {
			xScalar *= window.devicePixelRatio;
			yScalar *= window.devicePixelRatio;
		}

		console.log("scalars", xScalar, yScalar);

		this.ctx.scale(xScalar, yScalar);
		this.ctx.translate(this.paddingHorz, this.paddingVert);
	}

	step() {
		if (Settings.paused) {
			return;
		}

		// step of all objects
		for(var i = 0; i < this.room.objects.length; i++){
			this.room.objects[i].step();
		}

		this.room.step(this);
		this.stepCount++;
		// input.step()

		this.draw();
	}

	draw() {
		// Background
		// ctx.fillStyle = "#000000";
		// ctx.fillRect(0, 0, canvas_width, canvas_height);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.clearRect(-this.paddingHorz, -this.paddingVert, this.roomWidth + 2*this.paddingHorz, this.roomHeight + 2*this.paddingVert);

		// // Debug
		// this.ctx.lineWidth = "4";
		// this.ctx.strokeStyle = "red";
		// this.ctx.strokeRect(0, 0, this.roomWidth, this.roomHeight);

		this.room.draw(this);

		// draw of all objects
		for(var i = 0; i < this.room.objects.length; i++){
			if(this.room.objects[i] !== undefined){
				this.room.objects[i].draw(this);
			}
		}

		// GUI
		this.input.draw(this);
	}

	// TODO move to static method in PhysicalEntity?
		// TODO cls has to be of type PhysicalEntity as it needs to have x,y,ox,oy,width,height
	// Checks if the point (x,y) collides with an object of class cls
	// @param {number} - X-coordinate
	// @param {number} - Y-coordinate
	// @param {PhysicalEntity} - Class
	// @return {(PhysicalEntity|undefined)} of type cls or undefined
	collision_point(x, y, cls) { // return obj oder undefined
		/* Prüft, ob Punkt mit einem Objekt der Klasse cls kollidiert.
			* Nur unpräzise Prüfung (point_in_rectangle).
			*/
			for(var i = 0; i < this.room.objects.length; i++) {
				var obj = this.room.objects[i];
				if(obj instanceof cls){
					var x1 = obj.x - obj.ox
					var y1 = obj.y - obj.oy
					var x2 = x1 + obj.width
					var y2 = y1 + obj.height
					if(f.point_in_rectangle(x, y, x1, y1, x2, y2)) return obj;
				}
			}
		return undefined;
	}

	// Receives room class, instantiates it and changes room to it
	gotoRoom(newRoom){
		console.log("Going to room", newRoom.name)


		// Set new room
		// this.room = new newRoom(this.room.constructor.name);
		// this.room = new newRoom(this, newRoom);
		this.room = new newRoom(this);
		this.input.reset();

		// TODO do this better
		// if (!(room instanceof LevelRoom) && !(newRoom.prototype instanceof LevelRoom)) {
			// 	console.log(SimBubble.all)
			// 	room.objects.push.apply(room.objects, SimBubble.all);
			// }
		this.room.objects.push.apply(this.room.objects, SimBubble.all);
		// this.room.objects.push.apply(this.room.objects, SimJelly.all);

		document.body.style.background = `url(${newRoom.background})`;
		document.body.style.backgroundSize = "cover";
	}

	showEndgame(won) {
		let levelTime = (this.stepCount / 60).toFixed(1);

		document.getElementById("egWon").innerHTML = won ? "won 🥳" : "lost 🤬"
		document.getElementById("egTime").innerHTML = `${levelTime} seconds`
		document.getElementById("endgameOverlay").classList.remove("hidden")
	}

	hideEndgame() {
		document.getElementById("endgameOverlay").classList.add("hidden")
	}
}
