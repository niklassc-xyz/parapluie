import StackNode from "./StackNode";

export default class Stack {
	constructor() {
		this.top = undefined;
	}

	push(val) {
		this.top = new StackNode(val, this.top);
	}

	pop() {
		let ret = this.top.val;
		this.top = this.top.pre;
		return ret;
	}

	isEmpty() {
		return this.top === undefined;
	}
}

