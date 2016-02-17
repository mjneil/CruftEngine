import Component from "engine/core/Component"

export default class SceneSync extends Component{

	constructor() {
		super("sync");
	}
	
	createFullState() {
		var actor = this.actor; //somehow convery what stuff goes on a scene but yolo I gess. 
		
		var state = {
			id : actor.id, 
			"SceneSync" : {owner : this.owner },
			actors : {}
		}

		var children = actor.actors;//put thus into the createFullStateSuper for a Sync Comp
		for(var id in children) {
			var child = children[id];
			var sync = child.getComponent("sync");
			if(sync){
				state.actors[id] = sync.createFullState();
			}
		}
		return state;
	}

	createPartialState() {
		var actor = this.actor;
		var state = {};
		for(var id in actor.actors){
			var sync = actor.actors[id].getComponent("sync");
			if(sync) state[id] = sync.createPartialState();
			
		}
		return state;
	}


	findActorByOwner(owner) {
		//for now brute it
		var actors = this.actor.actors;
		for(var id in actors){
			var sync = actors[id].getComponent("sync");
			if(sync && sync.owner === owner) return actors[id];
		}
		return null;
	}


	applyState(state) {
		if(!state) return;
	}

	setFromJSON(json) {
		console.log("TODO Scene::setFromJSON");
	}
}