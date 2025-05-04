export default class Overlay {
	constructor(contentInnerHtml = "<p>Overlay</p>") {
		this._divContainer = document.createElement("div");
		this._divContainer.classList.add("overlay");

		this._html = contentInnerHtml;
		this._divContent = document.createElement("div");
		this._divContent.classList.add("overlayContent");
		this._divContent.innerHTML = this._html;

		this._divContainer.appendChild(this._divContent);
	}

	getDiv() {
		// return this._div;
		return this._divContainer;
	}

	// Deletes overlay-div from document
	remove() {
		this._divContainer.remove();
	}
}
