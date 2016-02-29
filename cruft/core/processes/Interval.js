import Process from "../Process"

export default class Interval extends Process {
	constructor(cb, interval) {
		super();
		this.cb = cb;
		this.interval = interval;
		this.elapsed = 0;
	}

	update(now, deltaMs) {
		this.elapsed+=deltaMs;
		if(this.elapsed >= this.interval) {
			this.elapsed -= this.interval;
			this.cb();
		}
	}
}