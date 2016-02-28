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

var engine = new Engine();
var cache = new Cache();
var factory = new Factory();
var network = new Network();
var scheduler = new Scheduler();
var memory = new MemoryManager();


var initialize = (config) => {

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

	if(config.network){
		promises.push(network.initialize(config.network.name, config.network.options));
		if(config.network.peer){
			promises.push(network.createSession(config.network.peer))
		}
	}

	engine.scene = instantiate(config.scene || null);

	return Promise.all(promises).then(()=>{
		engine.scene.initialize();
		scheduler.start(config.scheduler || 17);
	});

}

var instantiate = (type, config) => {
	var actor = factory.create(type, config);
	return actor;
}


export default engine;
export {cache, factory, network, scheduler, memory,  initialize, instantiate };

//****DEBUG****//
window.engine = engine;
window.kill = function () { scheduler.kill(); }
window.onbeforeonload = function () { network.peer.destroy(); }
