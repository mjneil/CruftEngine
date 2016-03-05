import Emitter from "./Emitter";

class Input extends Emitter {
	
	constructor() {
		this.controllers = [];
	}

	update() {
		for(let controller of this.controllers){
			controller.update();
		}
	}
}
