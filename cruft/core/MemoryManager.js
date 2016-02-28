export default class MemoryManager {

	constructor() {
		this.references = {};
	}

	add(actor) {
		this.references[actor.guid] = actor;
	}

	destroy(actor, recursive = false) {
		if(!actor) return;
		delete this.references[actor.guid]
		actor.destroy();
		for(var id in actor.children) {
			destroy(actor.children[id], recursive);
		}
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

	destroy(recursive = false) {
		this.manager.destroy(this.get(), recursive);
	}
}