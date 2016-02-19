import Component from "engine/core/Component";
import {vec2} from "engine/lib/gl-matrix"
import engine from "engine/Engine"

export default class PlayerController extends Component {//todo only send difs >_>

	constructor(connection) {
		super("PlayerController");

		this.keyStates = {};
		this.last = {};

		this.mouse = [0, 1];

		addEventListener("keydown", (e) => {
			this.keyStates[String.fromCharCode(e.which)] = true;
		})

		addEventListener("keyup", (e) => {
			this.keyStates[String.fromCharCode(e.which)] = false;
		})

		addEventListener("mousemove", (e) => {//temp camera logic in here. Need a refereance frame for things like. Camera.domToWorld() etc. 
			this.mouse[0] = (e.pageX - window.innerWidth/2);
			this.mouse[1] = (window.innerHeight - e.pageY - window.innerHeight/2);
		})

	}

	//add a global like NetworkManager.emit("asdasdasdasddasd"); then bundle them all up and send em. 
	//for now just send them at the end of update. 
	update(deltaMs) {

		var events = {};

		var keyStates = this.keyStates;
		var last = this.last;
		for(var key in keyStates) {
			if(keyStates[key] !== last[key]) {
				if(key == "W") {
					events["SET_MOVING_UP"] = keyStates[key];
				}
				if(key == "A") {
					events["SET_MOVING_LEFT"] = keyStates[key];
				}
				if(key == "S") {
					events["SET_MOVING_DOWN"] = keyStates[key];
				}
				if(key == "D") {
					events["SET_MOVING_RIGHT"] = keyStates[key];
				}
			}
		}

		if(Object.keys(events).length) { 
			engine.emit("PlayerController:events", events);
			this.last = JSON.parse(JSON.stringify(this.keyStates)); //stringifying is never the answer. 
		}

		engine.emit("PlayerController:mouse", this.mouse);


		
	}
}