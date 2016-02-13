import Component from "engine/core/Component"
import {vec2} from "engine/lib/gl-matrix";


//todo make this not shit. 
export default class CameraFollow extends Component {

	constructor() {
		super();
		this.target = null;
	}

	setTarget(target) {
		this.target = target;
	}

	update(deltaMs) {
		var target = this.target;
		if(!target) return;

		var camera = this.actor;
		var transform = camera.getComponent("transform");
		var position = transform.position; 


		var dif = vec2.create();
		vec2.sub(dif, target.getComponent("transform").position, position);
		var len = vec2.len(dif);
		vec2.scale(dif, dif, .01);
		vec2.add(dif, position, dif);
		transform.position = dif;
	}
}