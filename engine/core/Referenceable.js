import uuid from "engine/lib/uuid";
import EventEmitter from "events";

export default class Referenceable extends EventEmitter {
	constructor(guid) {
		super();
		this.guid = guid || uuid.create().toString();
	}

	destroy() {
		this.emit("destroy", this);
	}
}