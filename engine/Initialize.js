import engine from "engine/Engine";
import Cache from "engine/core/Cache";
import Scheduler from "engine/core/Scheduler";
import Scene from "engine/core/Scene";
import Network from "engine/net/Network";
import ActorFactory from "engine/core/ActorFactory";
import Script from "engine/processes/Script"
import Actor from "engine/core/Actor" 

export default (config) => {
	var promises = [];

	engine.cache = new Cache();
	engine.scheduler = new Scheduler();

	engine.scheduler.addChild(new Script((now, deltaMs) => {
		engine.scene.update(deltaMs);
	}));
	engine.factory = new ActorFactory();

	engine.scene = null;
	engine.network = null;
	engine.running = null;


	if(config.factory){
		var f = config.factory;
		promises.push(engine.cache.getAll( Object.keys( f.skeletons ) ).then((assets) => {
			for(var url in assets) {
				engine.factory.registerSkeleton(f.skeletons[url], assets[url]);
			}
		}))
		engine.factory.registerComponents(f.components);
	}

	if(config.network) {
		engine.network = new Network(config.network.name, config.network.key);
		if(config.network.session) {

			promises.push(engine.network.createSession(config.network.session));
		}
	}

	engine.running = Promise.all(promises).then(()=>{
		if(config.scene){
			var s = config.scene;
			engine.scene = engine.factory.create(Scene, s.type, s);
		}else{
			engine.scene = new Scene();
		}
	}).then(()=>{ 
		engine.scheduler.start(config.scheduler.deltaMs || 17);
	});
	
}