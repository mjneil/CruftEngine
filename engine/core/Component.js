import Referenceable from "./Referenceable";

export default class Component extends Referenceable {
	
	constructor(type,guid) {
		super(guid);
		this.type = type;
		this.actor = null;
	}

	setActor(actor) {
		this.actor = actor;
	}

	setFromJSON() {
		console.warn(`${this.type}:setFromJSON has not been implemented`);
	}

	update(deltaMs) {

	}

	initialize() {
		
	}
}