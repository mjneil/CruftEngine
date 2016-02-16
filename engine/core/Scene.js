import Actor from "./Actor";

//todo add scale
export default class Scene extends Actor { 
	
	constructor(id) {
		super(id);
		this.actors = {};
	}

	addActor(actor) {
		this.actors[actor.id] = actor;
	}

	findActorById(id) {
		var actor = this.actors[id];
		if(!actor) return null;
		return actor;
	}
}