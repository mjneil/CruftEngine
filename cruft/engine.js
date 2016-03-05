
import Emitter from "./core/Emitter";
import setIntervalMs from "./util/setIntervalMs";
import Actor from "./core/Actor";
import Cache from "./net/Cache";
import * as loaders from "./net/loaders/loaders.js"
import Factory from "./core/ActorFactory";
import Network from "./net/Network";
import Scheduler from "./core/Scheduler";
import Script from "./core/processes/Script";
import MemoryManager from "./core/MemoryManager"


export class Engine extends Emitter {

	constructor() {
		super()
		this.views = {};
		this.scene = null;
		this.interval = null;
	}

	setScene(scene) {
		if(this.scene) this.scene.destroy(true);
		this.scene = scene;
		scene.initialize();
	}

	addView(name, view) {
		this.views[name] = view;
	}

	start(delay) {
		if(this.interval) return;

		this.interval = setIntervalMs((now, deltaMs)=>{
			
			if(engine.scene){
				engine.scene.update(now, deltaMs);
			}

			scheduler.update(now, deltaMs);

			//update views
			for(let name in this.views){
				this.views[name].update(now, deltaMs);
			}

			
		}, delay)
	}

	kill() {
		clearInterval(this.interval);
		this.interval = null;
	}


}


var engine = new Engine();

var cache = new Cache();

	cache.register(loaders);
	cache.register({ default : cache.loaders.text });

var factory = new Factory();
var network = new Network();
var scheduler = new Scheduler();
var memory = new MemoryManager();



var instantiate = (type, config) => {
	var actor = factory.create(type, config);
	memory.add(actor);
	return actor;
}


export default engine;
export {cache, factory, network, scheduler, memory, instantiate };

//****DEBUG****//
window.engine = engine;
window.kill = function () { scheduler.kill(); }
window.onbeforeonload = function () { network.peer.destroy(); }
