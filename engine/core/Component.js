
var nextComponentGuid = 0;
export default class Component {
	constructor(type) {
		this.type = type;
		this.actor = null;
		this.id = nextComponentGuid++;
	}

	setActor(actor) {
		this.actor = actor;
	}

	setFromJSON() {
		console.log("WARNING: THIS WAS NOT IMPLEMENTED. PROB SHOULD HAVE DONE THAT IF ITS BEING CALLED")
	}

	//todo? :/
	update(deltaMs) {

	}
}