import Emitter from "./core/Emitter";
import Script from "./processes/Script";
import Actor from "./core/Actor";
import Cache from "./core/Cache";
import Factory from "./core/ActorFactory";
import Network from "./net/Network";
import Scheduler from "./core/Scheduler";
import MemoryManager from "./core/MemoryManager"


export class Engine extends Emitter {
	constructor() {
		super()
		this.scene = null;
		this.camera = null;
	}
}

var initialize;
var initialized = new Promise((resolve, reject) => {
	initialize = (config) => {
		var promises = [];
		
		scheduler.addChild(new Script((now, deltaMs) => {
			engine.scene.update(now, deltaMs);
		}));

		if(config.factory) {
			let creators = config.factory;
			for(let name in creators){
				factory.register(name, creators[name]);
			}
		}

		engine.scene = instantiate(config.scene || null);

		
		Promise.all(promises).then(()=>{
			engine.scene.initialize();
			scheduler.start(config.scheduler || 17);
			resolve();
		});

	}
});


var instantiate = (type, config) => {
	var actor = factory.create(type, config);
	return actor;
}

var engine = new Engine();
var cache = new Cache();
var factory = new Factory();
var network = new Network();
var scheduler = new Scheduler();
var memory = new MemoryManager();


export default engine;//for now export raw factory. prob wont do that always. 
export {cache, factory, network, scheduler, memory,  initialize, initialized, instantiate };

//****DEBUG****//
window.engine = engine;
window.kill = function () { scheduler.kill(); }
window.onbeforeonload = function () { network.peer.destroy(); }


/*


*/