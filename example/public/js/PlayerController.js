import Component from "engine/core/Component";


//@Todo maybe not hijack global window? Maybe add to canvas or somthing :/
export default class PlayerController extends Component {
	constructor() {
		super("PlayerController");

		this.state = {};//TMP

		var keyStates = this.keyStates = {};
		var mouse = this.mouse = vec2.create(); //move this to the camera at some point :/
		//todo isLeftMouseDown()
		//to isRightMouseDown();
		addEventListener("keydown", (e) => {
			keyStates[String.fromCharCode(e.which)] = true;
		})

		addEventListener("keyup", (e) => {
			keyStates[String.fromCharCode(e.which)] = false;
		})

		addEventListener("mousemove", function (e) {
			mouse[0] = e.pageX;
			mouse[1] = e.pageY;
		})
	}

	isKeyDown(key) {
		return this.keyStates[key] === true;
	}

	update(deltaMs) {

		var pc = this.actor.getComponent("PlayerComponent");
		var mouse = this.mouse;
		//somehow turn this into events rather than direct access :/
		//this is all very bad. 
		this.state = {
			MOVING_UP : this.isKeyDown("W"),
			MOVING_DOWN : this.isKeyDown("S"),
			MOVING_LEFT : this.isKeyDown("A"),
			MOVING_RIGHT  : this.isKeyDown("D")
		}
		/*

		//get directional vector
		var dif = vec2.create();
		var playerPos = this.actor.getComponent("transform").getWorldPosition();
		var mousePos =  [mouse[0]- GAME_WIDTH/2, GAME_HEIGHT - mouse[1] - GAME_HEIGHT/2]//for now just pretend cam is always 0,0
		vec2.sub(dif, mousePos, playerPos);
		pc.direction = dif; */
	}
}