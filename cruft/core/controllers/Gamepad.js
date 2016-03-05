import vec2 from "../../math/vec2"
export default class Gamepad {
	
	constructor(index) {
		this.capture = {};
		this.state = {};
		this.index = index;
		this.gamepad = navigator.getGamepads()[this.index];

		this.axes = {
			"horizontal" : 0,
			"vertical" : 1
		}
	}

	update() {
		this.gamepad = navigator.getGamepads()[this.index];
	}


	postUpdate() {
		//this.capture = {};
	}

	getAxis(name) {
		return this.gamepad.axes[this.axes[name]];
	}

	
	getButtonDown(name) {
		console.error("Method hasnt's been implemented");
	}

	getButton(name) {
	
	}


}
