import uuid from "../util/uuid"
export default class SubRenderer {

	constructor(type) {
		this.type = type;
		this.guid = uuid();
		this.initialized = false;
	}

	initialize() {
		this.initialized = true;
	}

	preRender() {

	}

	render() {

	}

	postRender() {

	}
}