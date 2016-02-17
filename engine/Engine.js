import Cache from "engine/core/Cache";
import Scheduler from "engine/core/Scheduler";
import Scene from "engine/core/Scene";
import Network from "engine/net/Network";
import EventEmitter from "events";
import Transform2D from "engine/components/Transform2D";
import ActorFactory from "engine/core/ActorFactory";

export default class Engine extends EventEmitter {
	constructor(config) {
		super()

		var promises = [];

		this.cache = new Cache();

		this.factory = new ActorFactory();
		this.factory.setEngine(this);

		if(config.factory){
			var components = config.factory.components;
			var skeletons = config.factory.skeletons;

			if(components) {
				for(var component in components){
					this.factory.registerComponent(component, components[component]);
				}
			}

			if(skeletons) {
				promises.push(this.factory.loadSkeletons(skeletons));
			}
			
		}

		this.scheduler = null
		if(config.scheduler) {
			this.scheduler = new Scheduler()
			this.scheduler.start(config.scheduler.deltaMs || 17);
		}

		this.network = null;
		if(config.network) {
			this.network = new Network(config.network.name, config.network.key);
			if(config.network.session) {
				promises.push(this.network.createSession(config.network.session));
			}
		}

		this.scene = null;
		if(config.scene) { //for now default to 2D
			this.scene = new Scene(config.scene.id);
			this.scene.addComponent(new Transform2D());
		}

		this.ready = Promise.all(promises);

		
	}



}
