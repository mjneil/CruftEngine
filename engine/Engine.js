import Cache from "engine/core/Cache";
import Scheduler from "engine/core/Scheduler";
import Scene from "engine/core/Scene";
import Network from "engine/net/Network";
import EventEmitter from "events";
import Transform2D from "engine/components/Transform2D";

export default class Engine extends EventEmitter {
	constructor(config) {
		super()
		this.cache = new Cache();
		this.scheduler = new Scheduler();
		this.network = null;
		if(config.network) this.network = new Network(config.network.name, config.network.key);
		this.scene = null;
		if(config.scene) { //for now default to 2D
			this.scene = new Scene(config.scene.id);
			this.scene.addComponent(new Transform2D());
		}
	}
}
