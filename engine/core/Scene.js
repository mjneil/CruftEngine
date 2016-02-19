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

	destroyActor(actor) { //todo make a better destroy method DEF talk to m'neil about this
		delete this.actors[actor.id];

		if(actor.parent){//hmmmm. is this the place for that.
			actor.parent.removeChild(actor);
		}

		actor.destructor();
	}
}