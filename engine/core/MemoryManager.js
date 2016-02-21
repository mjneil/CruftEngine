import Pointer from "./Pointer";

export default class MemoryManager {

	constructor() {
		this.references = {};
	}

	add(referenceable) {
		this.references[referenceable.guid] = referenceable;
		referenceable.on("destroy", () => {//does this callback keep the actor alive? I dont think so. 
			delete this.references[referenceable.id];
		})
	}

	createPointer(referenceable) {
		if(!this.references[referenceable.guid]) return null//cant make a reference to somthing that doesn't exist
		return new Pointer(referenceable, this);
	}

	get(guid) {
		return this.references[guid] || null;
	}
	
}