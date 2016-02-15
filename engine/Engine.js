
import Scheduler from "engine/core/Scheduler";
import Network from "engine/net/Network";
import EventEmitter from "events"


export default class Engine extends EventEmitter {
	constructor(config) {
		super()
		this.scheduler = new Scheduler();
		this.network = null;
		if(config.network) this.network = new Network(config.network.name, config.network.key);
	}
}