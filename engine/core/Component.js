
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

	//todo? :/
	update(deltaMs) {

	}

	toJSON () {
		return {};
	}
}