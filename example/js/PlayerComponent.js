import Component from "engine/core/Component";
import {vec2} from "engine/lib/gl-matrix"

export default class PlayerComponent extends Component {
	constructor() {
		super("PlayerComponent");
		this.movingLeft = false;
		this.movingRight = false;
		this.movingUp = false;
		this.movingDown = false;
		this.direction = [0, 0];
		this.speed = .7;
	}

	update(deltaMs) {

		var actor = this.actor;
		var transform = actor.getComponent("transform");
		var position = transform.position;
		var speed = this.speed;

		if(this.movingLeft) {
			position[0] -= speed * deltaMs
		}

		if(this.movingRight) {
			position[0] += speed * deltaMs
		}

		if(this.movingUp) {
			position[1] += speed * deltaMs
		}

		if(this.movingDown) {
			position[1] -= speed * deltaMs
		}

		transform.position = position;
		transform.setDirection(this.direction);

	}
}