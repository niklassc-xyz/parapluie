import Input from "./Input.js";
import Storage from "./Storage.js";
import Painter from "./Painter.js";
import ResourceManager from "./ResourceManager.js";


export default class Game {
	/**
	 * Initialize a new game
	 *
	 * @param {Room} initalRoom - The room that the game starts with
	 */
	constructor(initalRoom, fps=60, storageBackend="localStorage") {
		// TODO move to room?
		this.roomWidth = 1280;
		this.roomHeight = 720;

		this._debug = false;
		this._scaling = true;
		this._paused = false;

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
		this.resourceManager = new ResourceManager();
		this.storage = new Storage(storageBackend);

		this.entities = [];

		this.initialRoom = initalRoom;
		this.fps = fps;
	}

	// Enters the inital room and starts the game loop
	start() {
		this.room = new this.initialRoom(this);
		setInterval(() => this.step(), 1000/this.fps);
	}

	step() {
		if (this._paused)
			return;

		// step of all global game entities
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].step();
		}

		// step of all entities in current room
		for(var i = 0; i < this.room.entities.length; i++) {
			this.room.entities[i].step();
		}

		this.room.step(this);
		this.stepCount++;
		// this.input.step()

		this.draw();
	}

	draw() {
		// Background
		// this.painter.clearRect(0, 0, this.painter.canvas.width, this.painter.canvas.height);
		this.painter.clearRect(-this.painter.paddingHorz, -this.painter.paddingVert, this.roomWidth + 2*this.painter.paddingHorz, this.roomHeight + 2*this.painter.paddingVert);

		this.room.draw(this);

		// step of all global game entities
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].draw(this);
		}

		// draw of all entities
		for(var i = 0; i < this.room.entities.length; i++) {
			// TODO why is this check necessary
			if(this.room.entities[i] !== undefined) {
				this.room.entities[i].draw(this);
			}
		}

		this.input.draw();
	}

	addObject(obj) {
		obj.parent = this;
		var pos = this.entities.length;
		this.entities[pos] = obj;

		return obj;
	}

	// Simply removes the object `obj` from game.entities and thus from the
	// game loop.
	removeObject(obj) {
		for (var i = 0; i < this.entities.length; i++) {
			if(this.entities[i] === obj) {
				this.entities.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted object that is not in g.entities");
		return false;
	}

	// Receives room class, instantiates it and changes room to it
	gotoRoom(newRoom, returnRoom=undefined) {
		console.log(`Going to room ${newRoom.name}`);

		this.room.destroyEntities();

		this.input.reset();

		// Set new room
		this.room = new newRoom(this, returnRoom);

		document.body.style.background = `url(${newRoom.background})`;
		document.body.style.backgroundSize = "cover";
	}

	pause() {
		this._paused = true;
	}

	unpause() {
		this._paused = false;
	}

	setDebug(val) {
		this._debug = val;
	}

	getDebug(val) {
		return this._debug;
	}

	setScaling(val) {
		this._scaling = val;
	}

	getScaling(val) {
		return this._scaling;
	}
}
