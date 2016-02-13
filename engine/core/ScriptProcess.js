import Process from "./Process"
export default class ScriptProcess extends Process{//could also make a more structured GameLoopProc thingy
	constructor(cb) {
		super();
		this.cb = cb;
	}

	update(now, deltaMs) {
		this.cb(now, deltaMs);
	}
}