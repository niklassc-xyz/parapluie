import Input from "./Input.js";
import Storage from "./Storage.js";
import Settings from "./Settings.js";
import * as collision from "./functions/collision.js";
import ProgressManager from "../appEtc/ProgressManager.js";
import Painter from "./Painter.js";


export default class Game {
	/**
	 * Initialize a new game
	 *
	 * @param {Room} initalRoom - The room that the game starts with
	 */
	constructor(initalRoom, fps=60) {
		// TODO move to room?
		this.roomWidth = 1280;
		this.roomHeight = 720;

		const canvas = document.createElement("canvas");
		document.body.insertBefore(canvas, document.body.childNodes[0]);
		this.painter = new Painter(canvas, this.roomWidth, this.roomHeight);
		window.addEventListener('resize', () => { this.painter.resizeCanvas(this.roomWidth, this.roomHeight) });
		// this.resizeTimeoutFunctionId;
		// window.addEventListener('resize', () => {
		// 	console.log(this.resizeTimeoutFunctionId);
		// 	clearTimeout(this.resizeTimeoutFunctionId);

		// 	this.resizeTimeoutFunctionId = setTimeout(() => this.painter.resizeCanvas(this.roomWidth, this.roomHeight), 10);
		// });

		// Counts steps, paused when game is paused
		this.stepCount = 0;

		this.input = new Input(this);
		this.storage = new Storage("localStorage");

		// TODO part of engine?
		this.progressManager = new ProgressManager(this.storage);

		this.initialRoom = initalRoom;
		this.room = new this.initialRoom(this);

		this.objects = [];

		setInterval(() => this.step(), 1000/fps);
	}

	step() {
		if (Settings.paused) {
			return;
		}

		// step of all global game objects
		for(var i = 0; i < this.objects.length; i++) {
			this.objects[i].step();
		}

		// step of all objects in current room
		for(var i = 0; i < this.room.objects.length; i++) {
			this.room.objects[i].step();
		}

		this.room.step(this);
		this.stepCount++;
		// input.step()

		this.draw();
	}

	draw() {
		// Background
		// this.painter.clearRect(0, 0, this.painter.canvas.width, this.painter.canvas.height);
		this.painter.clearRect(-this.painter.paddingHorz, -this.painter.paddingVert, this.roomWidth + 2*this.painter.paddingHorz, this.roomHeight + 2*this.painter.paddingVert);

		this.room.draw(this);

		// step of all global game objects
		for(var i = 0; i < this.objects.length; i++) {
			this.objects[i].draw(this);
		}

		// draw of all objects
		for(var i = 0; i < this.room.objects.length; i++) {
			// TODO why is this check necessary
			if(this.room.objects[i] !== undefined) {
				this.room.objects[i].draw(this);
			}
		}

		// GUI
		this.input.draw(this);
	}

	// TODO remove this completely, currently only used for Input clicking
	// TODO move to static method in PhysicalEntity?
		// TODO cls has to be of type PhysicalEntity as it needs to have x,y,ox,oy,width,height
	// Checks if the point (x,y) collides with an object of class cls
	// @param {number} - X-coordinate
	// @param {number} - Y-coordinate
	// @param {PhysicalEntity} - Class
	// @return {(PhysicalEntity|undefined)} of type cls or undefined
	collision_point(x, y, cls) { // return obj oder undefined
		/* Prüft, ob Punkt mit einem Objekt der Klasse cls kollidiert.
			* Nur unpräzise Prüfung (pointInRectangle).
			*/
			for(var i = 0; i < this.room.objects.length; i++) {
				var obj = this.room.objects[i];
				if(obj instanceof cls) {
					var x1 = obj.x - obj.ox
					var y1 = obj.y - obj.oy
					var x2 = x1 + obj.width
					var y2 = y1 + obj.height
					if(collision.pointInRectangle(x, y, x1, y1, x2, y2))
						return obj;
				}
			}
		return undefined;
	}

	addObject(obj) {
		obj.parent = this;
		var pos = this.objects.length;
		this.objects[pos] = obj;

		return obj;
	}

	// Simply removes the object `obj` from game.objects and thus from the
	// game loop.
	removeObject(obj) {
		for (var i = 0; i < this.objects.length; i++) {
			if(this.objects[i] === obj) {
				this.objects.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted object that is not in g.objects");
		return false;
	}

	// Receives room class, instantiates it and changes room to it
	gotoRoom(newRoom, returnRoom = undefined) {
		console.log(`Going to room ${newRoom.name} (Return room: ${returnRoom})`);

		// Set new room
		this.room = new newRoom(this, returnRoom);
		this.input.reset();

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
