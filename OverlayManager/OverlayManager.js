export default class OverlayManager {
	constructor() {
		this._overlays = [];

		// Starting z-index of overlays
		this._baseZ = 100;

		// TODO organize style better
		const style = `
			.overlay {
				z-index: 999;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(40, 40, 130, 0.3);
				backdrop-filter: blur(20px);

				color: rgba(210, 230, 255, 0.8);
				font-size: 1.2em;
				user-select: none;
			}
			.overlayContent {
				height: 100%;
				width: fit-content;
				margin: 0 auto;

				overflow-x: hidden;
				overflow-y: auto;
				scrollbar-color: #5566ee transparent;
				scrollbar-width: thin;

				place-items: center;
			}

			.gridTwoCol {
				overlay: auto;
				display: grid;
				grid-template-columns: repeat(2, 50%);
			}

			.gridThreeCol {
				overflow-y: auto;
				display: grid;
				grid-template-columns: repeat(3, 33%);
			}

			.gridThreeCol > *, .gridTwoCol > * {
				padding: .5em 2em;
				display: grid;
			}

			.overlayContent input {
				background: transparent;

				background: #236;
				color: rgba(210, 230, 255, 0.8);
				font-size: 1.4em;

				border-radius: 5px;
				padding: 4px;
				animation: pulse 1s infinite;
				animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			}
			.overlayContent input:nth-child(1) { animation-delay: .1s; }
			.overlayContent input:nth-child(2) { animation-delay: .3s; }
			.overlayContent input:nth-child(3) { animation-delay: .5s; }
			.overlayContent input:nth-child(4) { animation-delay: .7s; }
			.overlayContent input:nth-child(5) { animation-delay: .9s; }
			.overlayContent input:nth-child(6) { animation-delay: 1.1s; }
			.overlayContent input:nth-child(7) { animation-delay: 1.3s; }
			.overlayContent input:nth-child(8) { animation-delay: 1.5s; }
			.overlayContent input:nth-child(9) { animation-delay: 1.7s; }
			.overlayContent input:nth-child(10) { animation-delay: 1.9s; }


			.overlayContent input[type="button"] {
				background: transparent;
				color: rgba(210, 230, 255, 0.8);
				font-size: 1.2em;

				padding: 0.5em 1em;
				margin: 0.5em 0.5em;
				min-height: 4em;

				border: 4px solid rgba(210, 230, 255, 0.8);
				border-radius: 9999px;
				cursor: pointer;
				transition: all 0.2s ease-in-out;
			}

			.overlayContent input[type="button"]:hover {
				background: rgba(210, 230, 255, 0.8);
				color: #236;
			}

			.overlayContent input[type="checkbox"] {
				width: 1.3em;
				height: 1.3em;

				accent-color: #236;
			}
		`
		const styleElement = document.createElement("style");
		styleElement.textContent = style;
		document.head.appendChild(styleElement);
	}

	/**
	 * Open overlay, append to document.body and store in OverlayManager
	 *
	 * @param {Overlay} overlay - Overlay object to open
	 * @returns {Overlay} Opened overlay
	 */
	openOverlay(overlay) {
		// TODO ID
		const overlayDiv = overlay.getDiv();
		document.body.appendChild(overlayDiv);

		const index = this._overlays.push(overlay);
		overlayDiv.style.zIndex = this._baseZ + index;

		return overlay;
	}

	closeOverlay(overlay) {
		console.log(this._overlays);

		overlay.remove();

		for (let i = 0; i < this._overlays.length; i++) {
			if (this._overlays[i] === overlay) {
				this._overlays.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to close overlay that was not open.");
		return false;
	}
}
