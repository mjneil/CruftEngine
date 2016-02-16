import Component from "engine/core/Component"

export default class SceneSync {

	constructor() {
		super("sync");
	}
	
	createState() {
		var scene = this.actor;
		var actors = scene.actors;
		var state = {
			id : this.id,
			actors : {}
		}
		var stateActors = state.actors;
		//for now scan every single actor. 
		//in the future might want to explicity add them to 
		//a tracked list so we only loop over things that are being synced. (ie emit sync on addComponent(type = sync))
		//for large projects this could actually be a lot faster. 
		for(var id in actors){
			var syncComponent = actors[id].getComponent("sync");
			if(syncComponent) {
				stateActors[id] = syncComponent.createState();
			}
		}


	}

	setState(now, past, future) {
		//todo aheh. aheh. 
	}
}