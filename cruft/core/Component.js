import uuid from "./../util/uuid";
import Emitter from "./Emitter";

export default class Component extends Emitter {
	
	constructor(guid) {
		super();
		this.guid = guid || uuid();
		this.actor = null;
	}

	initialize() {
		
	}

	update(now, deltaMs) {

	}

	destroy() {
		this.emit("destroy", this);
	}

	
}