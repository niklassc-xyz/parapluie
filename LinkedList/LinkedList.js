import LinkedListNode from "./LinkedListNode.js";

// TODO move to engine
// TODO iterator
// TODO return node or val? → iterator needs nodes


export default class LinkedList {
	constructor() {
		this.head = undefined;
		this.tail = undefined;
		this.size = 0;
	}

	// Adds node with value `val` at the end of the list
	add(val) {
		let newNode = new LinkedListNode(val);
		newNode.prev = this.tail;

		if (this.size == 0) {
			this.head = newNode;
		} else {
			this.tail.next = newNode;
		}

		this.tail = newNode;
		this.size++;
	}

	addFirst(val) {
		let newNode = new LinkedListNode(val);
		newNode.next = this.head;

		if (this.head != undefined) {
			this.head.prev = newNode;
		} else {
			this.tail = newNode;
		}

		this.head = newNode;
		this.size++;
	}

	addLast(val) {
		this.add(val);
	}

	get(index){
		let i = this.head;

		if(index >= this.size){
			console.log("Error in LinkedList get(" + index + "): index out of list");
			return false;
		}

		for(let j = 0; j < index; j++)
			i = i.next;

		return i.val;
	}

	getFirst() {
		return this.head.val;
	}

	getLast() {
		return this.get(this.size - 1).val;
	}

	removeFirst() {
		let tmp = this.head;
		this.head = this.head.next;
		this.size--;
		return tmp.val;
	}

	removeLast() {
		let tmp = this.tail;
		this.tail = this.tail.prev;
		this.size--;
		return tmp.val;
	}

	isEmpty() {
		return this.size == 0;
	}

	toString() {
		let str = "";
		let i = this.head;

		while(i.next != null){
			str += i.val + " ";
			i = i.next;
		}

		if(i != null)
			str += i.val;

		return str;
	}
}
