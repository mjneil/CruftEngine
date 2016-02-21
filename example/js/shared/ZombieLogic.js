import Component from "engine/core/Component";
import {vec2} from "engine/lib/gl-matrix"
import Actor from "engine/core/Actor"
import Interval from "engine/processes/Interval";
import {randomRange} from "engine/math/random"

export default class ZombieLogic extends Component { //irl should make controllers for npcs but for now yolo. 
	constructor() {
		super("ZombieLogic");
		this.speed = .6;
		this.target = null;
	}

	destructor() {
		super.destructor();
	}

	update(deltaMs) {
		var target = this.target;
		if(!target) return;

		var transform = this.actor.getComponent("transform");
		var position = transform.position;

		var targetTransform = target.get();
		var targetPos = targetTransform.position;
		var dif = vec2.create();

		vec2.sub(dif, targetPos, position);
		vec2.scale(dif, dif, this.speed/vec2.len(dif) * deltaMs );
		vec2.add(position, position, dif);
		transform.position = position;
		transform.setDirection(dif); 

	}

	setFromJSON(json) {
		if(!json) return;
		this.target = json.target;
	}
}