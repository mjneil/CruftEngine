import Process from "engine/core/Process"

export default class UpdateProcess extends Process {
	constructor(cb) {
		super();
		this.cb = cb;
	}

	update(deltaMs) {
		this.cb(deltaMs)
	}
}