import Process from "engine/core/Process";

export default class Script extends Process {//could also make a more structured GameLoopProc thingy
	constructor(cb) {
		super();
		this.cb = cb;
	}

	update(now, deltaMs) {
		this.cb(now, deltaMs);
	}
}