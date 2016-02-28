import uuid from "../lib/uuid";

export default class Component  {
	
	constructor(type, guid) {
		this.guid = guid || uuid();
		this.type = type;
		this.actor = null;
	}

	setActor(actor) {
		this.actor = actor;
	}

	setFromJSON() {
		console.warn(`${this.type}:setFromJSON has not been implemented`);
	}

	update(now, deltaMs) {

	}

	initialize() {
		
	}
}