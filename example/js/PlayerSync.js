import Component from "engine/core/Component"

//define some standard sync interface :^)

//todo at some point this needs to all go binary
//Like all Float64Array(0), index 
//for debugging going to just JSON

export default class PlayerSync {

	constructor() {
		super("sync");
		this.owner = null;
	}

	owned() {
		//this.actor.engine.network.peerId assumes if you are using
		//sync shit you are using da netwarks
		return this.owner === this.actor.engine.network.peerId;
	}

	createState() {
		var actor = this.actor;
		var transform = actor.getComponent("transform");
		var position = [], scale = [];
		vec2.copy(position, transform._position);
		vec2.copy(scale, transform._scale);
		var rotation = transform._rotation;

		return { position, rotation, scale };
	}

	updateStuffInrealTimeK(now, past, future) {

	}

	setFromJSON(json) {
		if(!json) return;
		if(json.owner) this.owner = json.owner;
	}


}