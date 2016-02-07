import Actor3D from "./Actor3D";

export default class Scene3D extends Actor3D {
	constructor() {
		super();
		this.actors = {};
	}

	addChild(child){
		super.addChild(child);
		this.actors[child.id] = child;
	}
}