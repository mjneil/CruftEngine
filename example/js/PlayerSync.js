import Component from "engine/core/Component"
import {vec2} from "engine/lib/gl-matrix";

//define some standard sync interface :^)

//todo at some point this needs to all go binary
//Like all Float64Array(0), index 
//for debugging going to just JSON

export default class PlayerSync extends Component {

	constructor() {
		super("sync");
		this.owner = null;
	}

	owned() {
		//this.actor.engine.network.peerId assumes if you are using
		//sync shit you are using da netwarks
		return this.owner === this.actor.engine.network.peerId;
	}

	createFullState() {

		var actor = this.actor;
		var transform = actor.getComponent("transform");

		var position = [], scale = [];
		var rotation = transform._rotation;
		vec2.copy(position, transform._position);
		vec2.copy(scale, transform._scale);
		

		var state = {
			type : "Player",
			id : actor.id,
			parentId : (actor.parent)? actor.parent.id:null,
			"Transform2D" : { position, rotation, scale },
			"PlayerSync" : {owner : this.owner },
		}
		return state;
	}

	createPartialState () {
		var actor = this.actor;
		var transform = actor.getComponent("transform");
		var position = [], scale = [];
		vec2.copy(position, transform._position);
		vec2.copy(scale, transform._scale);
		var rotation = transform._rotation;

		return { position, rotation, scale };
	}

	applyPartialState(now, past, future) {
		//just set it to da futuuuuurrrreeee.
		var actor = this.actor;
		var transform = actor.getComponent("transform");

		transform.position = future.position; //todo dont do it the slow way. 
		transform.rotation = future.rotation;
		transform.scale = future.scale;
	}

	setFromJSON(json) {
		if(!json) return;
		if(json.owner) this.owner = json.owner;
	}


}