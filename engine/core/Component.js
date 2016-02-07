export default class Component {
	constructor(type) {
		this.type = type;
		this.actor = null;
	}

	setActor(actor) {
		this.actor = actor;
	}
}