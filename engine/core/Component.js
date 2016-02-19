import EventEmitter from "events"
var nextComponentGuid = 0;
export default class Component extends EventEmitter {
	
	constructor(type) {
		super();
		this.type = type;
		this.id = nextComponentGuid++;
		this.actor = null;
	}

	setActor(actor) {
		this.actor = actor;
	}

	setFromJSON() {
		console.warn(`${this.type}:setFromJSON has not been implemented`);
	}

	//todo? :/
	update(deltaMs) {

	}
}