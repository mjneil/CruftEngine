import Process from "../Process"

export default class Delay extends Process {
	constructor(cb, delay) {
		super();
		this.cb = cb;
		this.delay = delay;
		this.elapsed = 0;
	}

	update(now, deltaMs) {
		this.elapsed += deltaMs;
		if(this.elapsed > this.delay) {
			this.cb();
			this.succeed();
		}
	}
}