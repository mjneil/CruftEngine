import uuid from "engine/lib/uuid";
import EventEmitter from "events";
import {Pointer} from "engine/memory";//seems misleading to allow this

export default class Referenceable extends EventEmitter {
	constructor(guid) {
		super();
		this.guid = guid || uuid.create().toString();
	}

	destroy() {
		this.emit("destroy", this);
	}

	toPointer() {
        return new Pointer(this);
    }
}