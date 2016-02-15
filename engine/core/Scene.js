import Actor from "./Actor";

//todo add scale
export default class Scene extends Actor { 
	constructor(id) {
		super(id);
		this.actors = {};
	}

	addChild(child){
		super.addChild(child);
		this.actors[child.id] = child;
	}

	removeActor(actor) {
		if(actor.parent) actor.parent.removeChild(actor);
		delete this.actors[actor.id];
	}
}