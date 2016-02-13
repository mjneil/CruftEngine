import Component from "engine/core/Component";
import {vec2} from "engine/lib/gl-matrix"
import * as CONSTANTS from "./constants"

//@Todo maybe not hijack global window? Maybe add to canvas or somthing :/
//should prob clarify networkedPlayerController hmm this headache is kill me

export default class PlayerController extends Component {

	constructor(connection) { //for now pass owner into constructor but that will prob need to change at some point. 
		super("PlayerController");

		this.connection = connection;//TODO remove this from here. Turn this into NetworkManager.etc. 

		this.keyStates = {};

		addEventListener("keydown", (e) => {
			this.keyStates[String.fromCharCode(e.which)] = true;
		})

		addEventListener("keyup", (e) => {
			this.keyStates[String.fromCharCode(e.which)] = false;
		})

	}

	//add a global like NetworkManager.emit("asdasdasdasddasd"); then bundle them all up and send em. 
	//for now just send them at the end of update. 
	update(deltaMs) {

		var events = {};

		var keyStates = this.keyStates;

		for(var key in keyStates) {
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

		//make events have nothing to do with letters. w
		if(Object.keys(events).length) {
			this.connection.connection.send({
				event : "game:events",
				events : events
			})
			this.keyStates = {};
		}


		
	}
}