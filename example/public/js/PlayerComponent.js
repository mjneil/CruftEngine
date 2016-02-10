import Component from "engine/core/Component";


export default class PlayerComponent extends Component {
	constructor() {
		super("PlayerComponent");
		this.movingLeft = false;
		this.movingRight = false;
		this.movingUp = false;
		this.movingDown = false;
		this.speed = 1;
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

	}
}