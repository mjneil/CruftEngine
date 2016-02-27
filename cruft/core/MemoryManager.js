export default class MemoryManager {

	constructor() {
		this.references = {};
	}

	add(actor) {
		this.references[actor.guid] = actor;
		actor.on("destroy", () => {
			delete this.references[actor.guid];
		})
	}

	get(guid) {
		return this.references[guid] || null;
	}

	ptr(actor) {
		return new Ptr(actor.guid, this);
	}
	
}

class Ptr {
	
	constructor(guid, manager) {
		this.guid = guid;
		this.manager = manager;
	}

	reset(actor) {
		this.guid = actor.guid;
	}

	get() {
		return this.manager.get(this.guid);
	}
	
}