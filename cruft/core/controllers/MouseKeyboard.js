import vec2 from "../../math/vec2"
export default class MouseKeyboard {
	
	constructor() {
		this.capture = {};
		this.state = {};

		this.mousePosition = new vec2(0, 0);

		this.axes = {
			horizontal : { negative : "A", positive : "D"},
			vertical : { negative : "S", positive : "W"}
		};

		this.buttons = {}

		addEventListener("mousemove", (e) => {
			this.mousePosition.x = e.pageX;
			this.mousePosition.y = e.pageY;
		})

		addEventListener("keydown", (e) => {
			this.state[e.which] = true;
			this.capture[e.which] = true;
		})

		addEventListener("keyup", (e) => {
			this.state[e.which] = false;
		})

		addEventListener("mousedown", (e) => {
			this.state[1000+e.which] = true;
			this.capture[1000+e.which] = true;
		})

		addEventListener("mouseup", (e) => {
			this.state[1000+e.which] = false;
		})
	}

	update() {
		
	}


	postUpdate() {
		this.capture = {};
	}

	getAxis(name) {
		var axis = this.axes[name];
		if(!axis) return null;
		var isPositive = this.getButton(axis.positive);
		var isNegative = this.getButton(axis.negative);

		if( !(isNegative || isPositive) ||  (isNegative && isPositive)) return 0;
		if(isNegative) return -1;
		if(isPositive) return 1;
	}

	
	getButtonDown(name) {
		var vb = this.buttons[name];
		if(vb){
			return !!this.capture[vb];
		}else{
			return !!this.capture[name.charCodeAt(0)];
		}
	}

	getButton(name) {
		var vb = this.buttons[name]
		if(vb){
			return this.state[vb];
		}else{
			return !!this.state[name.charCodeAt(0)];
		}
	}

	getMouseButton(which) {
		return !!this.state[1000+which];
	}

	getMouseButtonDown() {
		return !!this.capture[1000+which];
	}

}
