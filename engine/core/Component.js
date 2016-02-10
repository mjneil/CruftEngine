
var nextComponentGuid = 0;
export default class Component {
	constructor(type) {
		this.type = type;
		this.actor = null;
		this.guid = nextComponentGuid++;
	}

	setActor(actor) {
		this.actor = actor;
	}
}