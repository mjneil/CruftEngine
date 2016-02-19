import Process from "engine/core/Process"

export default class Delay extends Process {
	constructor(cb, delay) {
		super();
		this.cb = cb;
		this.delay = delay;
		this.reference = Date.now();//@TODO change this to some uniform game clock;
	}

	update() {
		var now = Date.now();
		var dif = now - this.reference;
		if(dif > this.delay) {
			this.reference += this.delay;
			this.cb();
			this.succeed();
		}
	}
}