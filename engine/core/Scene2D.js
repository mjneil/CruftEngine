import Actor from "./Actor";
import Transform2D from "./Transform2D";

//todo add scale
export default class Scene2D extends Actor{ 
	constructor() {
		super();
		this.actors = {};
		this.addComponent(new Transform2D());
	}

	addChild(child){
		super.addChild(child);
		this.actors[child.id] = child;
	}
}