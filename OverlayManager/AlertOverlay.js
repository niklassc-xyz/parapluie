import Overlay from "./Overlay.js";

export default class AlertOverlay extends Overlay {
	constructor(message) {
		const html = `
			<div style="height: 20%"></div>
			<p id="alertMessage"></p>
			<input type="button" id="alertButton" value="Close" />
		`;

		super(html);

		this._divContent.querySelector("#alertMessage").innerHTML = message;
		this._divContent.querySelector("#alertButton").onclick = () => this.remove();
	}
}
