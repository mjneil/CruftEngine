import Actor from "../core/Actor";

export default class Camera extends Actor {

	constructor() {
		super();
	}

	mouseToWorld(mouse) { 
		console.warn("mouseToWorld has not been implemented");
		return null;
	}

}