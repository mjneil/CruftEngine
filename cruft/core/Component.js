export default class Component  {
	
	constructor(type, guid) {
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

	update(now, deltaMs) {

	}

	initialize() {
		
	}
}