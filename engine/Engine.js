import EventEmitter from "events";

class Engine extends EventEmitter {

	constructor() {
		super()
		this.cache = null;
		this.scheduler = null;
		this.factory = null
		this.scene = null;
		this.camera = null;
		this.network = null;
		this.running = null;
	}
}

export default new Engine();//I dont like that I have to do this.