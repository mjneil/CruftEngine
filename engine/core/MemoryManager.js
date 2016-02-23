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

	get(guid) {
		return this.references[guid] || null;
	}
	
}