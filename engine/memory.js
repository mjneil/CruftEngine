import MemoryManager from "engine/core/MemoryManager";

var memory = new MemoryManager();

export default class Pointer {
	
	constructor(referenceable) {
		this.guid = referenceable.guid;
	}

	get() {
		return memory.get(this.guid);
	}

	isValid() {
		return memory.get(this.guid) !== null;
	}

	reset(referenceable) {
		this.guid = referenceable.guid;
	}

}

export default memory;
export {Pointer}