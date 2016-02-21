export default class Pointer {
	
	constructor(referenceable, manager) {
		this.guid = referenceable.guid;
		this.manager = manager;
	}

	get() {
		return this.manager.get(this.guid);
	}

	isValid() {
		return this.manager.get(this.guid) !== null;
	}

	reset(referenceable) {
		this.guid = referenceable.guid;
	}

}