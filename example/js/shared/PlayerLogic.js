import Component from "engine/core/Component";
import {vec2} from "engine/lib/gl-matrix"
import Actor from "engine/core/Actor"
import Interval from "engine/processes/Interval";
import Delay from "engine/processes/Delay"
import {randomRange} from "engine/math/random"

import engine, {scheduler, instantiate} from "engine/engine"

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
		this.particles = [];


		this.processes = new Interval((now, deltaMs)=>{
			var world = this.target;
			for(var i = 0; i < this.particles.length;i++){
				this.particles[i].getComponent("transform").position = world;
				this.particles[i].getComponent("Physics").velocity = [randomRange(-.5, .5), randomRange(-.5, .5)];
			}
		}, 2000)

		scheduler.addChild(this.processes);
	}

	initialize() {
		for(var i = 0; i < 10;i++){
			var particle = instantiate("Particle", {
				Transform2D : {
					position : this.target
				},
				Physics : {
					velocity : [randomRange(-.5, .5), randomRange(-.5, .5)]
				}
			})
			this.particles.push(particle.get());
		}

		scheduler.addChild(new Delay(()=>{
			for(var i = 0; i < 10;i++){
				engine.scene.addChild(this.particles[i]);
			}
			
		}, 1));
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