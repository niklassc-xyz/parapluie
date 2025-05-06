export default class Overlay {
	// Starting z, increased whenever a overlay is opened, decreased when closed
	static _zIndex = 100;

	constructor(contentInnerHtml = "<p>Overlay</p>") {
		this._divContainer = document.createElement("div");
		this._divContainer.classList.add("overlay");

		this._html = contentInnerHtml;
		this._divContent = document.createElement("div");
		this._divContent.classList.add("overlayContent");
		this._divContent.innerHTML = this._html;

		this._divContainer.appendChild(this._divContent);
	}

	// Adds overlay to DOM
	add() {
		const overlay = document.body.appendChild(this._divContainer);
		overlay.style.zIndex = Overlay._zIndex++;
	}

	// Deletes overlay-div from DOM
	remove() {
		this._divContainer.remove();
		Overlay._zIndex--;
	}
}
