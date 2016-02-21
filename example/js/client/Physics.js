import Component from "engine/core/Component";
import {vec2} from "engine/lib/gl-matrix";

export default class Physics extends Component {
	constructor() {
		super("Physics");
		this.velocity = [0, 0];
	}

	update(deltaMs) {
		var transform = this.actor.getComponent("transform");
		var position = transform.position;

		var tmp = vec2.create();
		vec2.add(position, position, vec2.scale(tmp, this.velocity, deltaMs));
		transform.position = position;
	}

	setFromJSON(json) {
		if(!json) return;
		this.velocity = json.velocity;
	}
}