import Emitter from "./core/Emitter";

import Actor from "./core/Actor";
import Cache from "./net/Cache";
import {ImageLoader, TextLoader, JsonLoader } from "./net/loaders/loaders.js"
import Factory from "./core/ActorFactory";
import Network from "./net/Network";
import Scheduler from "./core/Scheduler";
import Script from "./core/processes/Script";
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

	cache.register("image", new ImageLoader() );
	cache.register("text", new TextLoader() );
	cache.register("json", new JsonLoader() );
	cache.register("default", cache.loaders.text );//I dont like making TextLoader Twice

	if(config.cache) {
		var cacheConfig = config.cache;
		for(var key in cacheConfig) {
			cache.register(key, cacheConfig[key]);
		}
	}

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
	memory.add(engine.scene);

	return Promise.all(promises).then(()=>{
		engine.scene.initialize();
		scheduler.start(config.scheduler || 17);
	});

}

var instantiate = (type, config) => {
	var actor = factory.create(type, config);
	memory.add(actor);
	return actor;
}


export default engine;
export {cache, factory, network, scheduler, memory,  initialize, instantiate };

//****DEBUG****//
window.engine = engine;
window.kill = function () { scheduler.kill(); }
window.onbeforeonload = function () { network.peer.destroy(); }
