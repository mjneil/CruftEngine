import Emitter from "./Emitter";

export default class Input extends Emitter {
	
	constructor() {
		super()
		this.controllers = [];
	}

	addController(controller) {
		this.controllers.push(controller);
	}

	update() {
		for(let controller of this.controllers) {
			controller.update();
		}
	}

	postUpdate() {
		for(let controller of this.controllers) {
			controller.postUpdate();
		}
	}
}
