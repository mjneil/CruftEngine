import EventEmitter from "events";

import cache from "./cache";
import factory from "./factory";
import network from "./network";
import scheduler from "./scheduler";
import memory from "./memory"

import Script from "engine/processes/Script";
import Actor from "engine/core/Actor";

export class Engine extends EventEmitter {

	constructor() {
		super()
		this.scene = null;
		this.camera = null;
	}
}

var engine = new Engine();

var initialize;
var initialized = new Promise((resolve, reject) => {
	initialize = (config) => {
		var promises = [];
		
		scheduler.addChild(new Script((now, deltaMs) => {
			engine.scene.update(deltaMs);
		}));

		if(config.factory){
			var f = config.factory;
			promises.push(cache.getAll( Object.keys( f.skeletons ) ).then((assets) => {
				for(var url in assets) {
					factory.registerSkeleton(f.skeletons[url], assets[url]);
				}
			}))
			factory.registerComponents(f.components);
		}

		if(config.network) {
			network.initialize(config.network.name, config.network.key);
			if(config.network.session) {
				promises.push(network.createSession(config.network.session));
			}
		}

		Promise.all(promises).then(()=>{
			if(config.scene){
				var s = config.scene;
				engine.scene = instantiate(s.type, s).get();//factory.create(Scene, s.type, s);
			}else{
				engine.scene = instantiate().get();
			}
		}).then(()=>{ 
			scheduler.start(config.scheduler.deltaMs || 17);
		}).then(()=>{
			resolve();
		})
	}
});


var instantiate = (type, config) => {
	var actor = factory.create(Actor, type, config);
	memory.add(actor);
	for(var key in actor.components){
		memory.add(actor.components[key]);
	}
	return memory.createPointer(actor);
}

var instantiateBase = (base, type, config) => {
	var actor = factory.create(base, type, config);
	memory.add(actor);
	for(var key in actor.components){
		memory.add(actor.components[key]);
	}
	return memory.createPointer(actor);
}

export default engine;//for now export raw factory. prob wont do that always. 
export {cache, factory, network, scheduler, initialize, initialized, instantiate , instantiateBase };

//****DEBUG****//
window.engine = engine;
window.kill = function () { scheduler.kill(); }
window.onbeforeonload = function () { network.peer.destroy(); }