import Actor2D from "./Actor2D";


//todo add scale
export default class Scene2D extends Actor2D{ 
	constructor() {
		super();
		this.actors = {};
	}

	addChild(child){
		super.addChild(child);
		this.actors[child.id] = child;
	}
}