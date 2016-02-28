export default class RendererPlugin {

	constructor(type) {
		this.type = type;
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