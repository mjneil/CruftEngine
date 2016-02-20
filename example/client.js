import initialize from "./js/client/initialize";
import engine from "engine/Engine"

import Camera2D from "engine/graphics/Camera2D";
import Actor from "engine/core/Actor"
import Script from "engine/processes/Script";

initialize();

//think about map loading in terms of syncing id's of every asset. Like what if a rock needs to be of the sync.


var main = () => {

	engine.camera = new Camera2D(window.innerWidth, window.innerHeight); //also todo make a real camera class.

	var player = engine.factory.create(Actor, "Player");
	engine.camera.target = player;

	engine.scene.addChild(player);
	engine.scene.addChild(engine.camera);
	engine.scene.getComponent("GameLogic").player = player;

	engine.scheduler.addChild(new Script(()=>{//tmp here for now
		engine.camera.render();
	}))
}

engine.running.then(main);


//#DEBUG / TEST. #IMPORTANT
window.engine = engine;
window.kill = function () { engine.scheduler.kill(); }
window.onbeforeonload = function () {
	engine.network.peer.destroy();
}

//experiment code for loading a map
engine.cache.get("assets/world01.json").then((world) => {
	for(let actor of world){
		var boulder = engine.factory.create(Actor, "Boulder", actor);
		engine.scene.addChild(boulder);
	}
})
