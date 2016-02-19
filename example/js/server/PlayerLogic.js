import Component from "engine/core/Component";
import {vec2} from "engine/lib/gl-matrix"
import Actor from "engine/core/Actor"
import Interval from "engine/processes/Interval";
import {randomRange} from "engine/math/random"
export default class PlayerLogic extends Component {
	constructor() {
		super("PlayerLogic");
		this.movingLeft = false;
		this.movingRight = false;
		this.movingUp = false;
		this.movingDown = false;
		this.target = [1, 0];
		this.speed = .7;
		this.fire = false;



		this.processes = new Interval((now, deltaMs)=>{
			var world = this.target;
			for(var i = 0; i < 10;i++){
				var actor = engine.factory.create(Actor, "Particle", {
					Transform2D : {
						position : world
					},
					Physics : {
						velocity : [randomRange(-.5, .5), randomRange(-.5, .5)]
					}
				});
				engine.scene.addChild( actor );
			}
			
		}, 500)


		engine.scheduler.addChild(this.processes);



	}

	destructor() {
		super.destructor();
		this.processes.succeed();
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

		var world = this.actor.getComponent("transform").getWorldPosition();
		var dif = vec2.create();

		vec2.sub(dif, this.target, position);
		transform.setDirection(dif); 


		if(this.fire) {
			this.fire = false;
		}

	}

	handleEvents(events) {
		if(events["SET_MOVING_UP"]!==undefined)   this.movingUp = events["SET_MOVING_UP"];
		if(events["SET_MOVING_DOWN"]!==undefined) this.movingDown = events["SET_MOVING_DOWN"];
		if(events["SET_MOVING_LEFT"]!==undefined) this.movingLeft = events["SET_MOVING_LEFT"];
		if(events["SET_MOVING_RIGHT"]!==undefined) this.movingRight = events["SET_MOVING_RIGHT"];
		if(events["FIRE"]) this.fire = true;
	}

	handleMouse(mouse) {
		this.target = mouse;
	}
}