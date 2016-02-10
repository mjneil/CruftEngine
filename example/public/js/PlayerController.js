import Component from "engine/core/Component";


//@Todo maybe not hijack global window? Maybe add to canvas or somthing :/
export default class PlayerController extends Component {
	constructor() {
		super("PlayerController");
		var keyStates = this.keyStates = {};
		var mouse = this.mouse = vec2.create();
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

		//somehow turn this into events rather than direct access :/
		pc.movingLeft = this.isKeyDown("A");
		pc.movingRight = this.isKeyDown("D");
		pc.movingUp = this.isKeyDown("W");
		pc.movingDown = this.isKeyDown("S");
	}
}