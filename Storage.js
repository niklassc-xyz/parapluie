// Handles storing persistent data, can use different storage backend
// Supported backends: see switch in constructor
export default class Storage {
	constructor(backend) {
		// Set strategy for `get`, `put` and `delete`
		switch (backend) {
			// TODO remove (Deprecated)
			// case "cookie":
			// 	this.get = this.getCookie;
			// 	this.set = this.setCookie;
			// 	this.delete = this.deleteCookie;
			// 	break;
			case "localStorage":
				this.get = this.getLocalStorage;
				this.set = this.setLocalStorage;
				this.delete = this.deleteLocalStorage;
				this.clear = this.clearLocalStorage;
				break;
			default:
				console.error(`Storage failed to initialize (${backend} is not a valid storage backend)`)
				break;
		}

		this.backend = backend;
	}

	// TODO remove
	setCookie(key, val) {
		document.cookie = key + " = " + val + "; expires=Fri, 01 Jan 2100 12:00:00 UTC";
	}

	// TODO remove
	getCookie(key) {
		let regex = new RegExp('(?:(?:^|.*;\\s*)' + key + '\\s*\\=\\s*([^;]*).*$)|^.*$');
		let val = document.cookie.replace(regex, "$1");
		if (val == "") {
			return undefined;
		}

		return val;
	}

	// TODO remove
	deleteCookie(key) {
		document.cookie = key + " = ; expires=Sat, 01 Jan 2000 12:00:00 UTC";
	}

	setLocalStorage(key, val) {
		return localStorage.setItem(key, val);
	}

	getLocalStorage(key) {
		return localStorage.getItem(key);
	}

	deleteLocalStorage(key) {
		return localStorage.removeItem(key);
	}

	clearLocalStorage() {
		localStorage.clear();
	}
}
