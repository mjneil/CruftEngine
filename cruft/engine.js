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
	return memory.ptr(actor);
}

var destroy = (actor, recursive = false) => {
	memory.destroy(actor, recursive);
}

var engine = new Engine();
var cache = new Cache();
var factory = new Factory();
var network = new Network();
var scheduler = new Scheduler();
var memory = new MemoryManager();


export default engine;//for now export raw factory. prob wont do that always. 
export {cache, factory, network, scheduler, memory,  initialize, initialized, instantiate, destroy };

//****DEBUG****//
window.engine = engine;
window.kill = function () { scheduler.kill(); }
window.onbeforeonload = function () { network.peer.destroy(); }
