import engine , {initialized, cache, instantiate} from "engine/engine";
import initialize from "./js/client/initialize";

var main = () => {
	console.info("main()");
}

initialized.then(main);



//experiment code for loading a map
cache.get("assets/world01.json").then((world) => {
	for(let actor of world){
		var boulder = instantiate(actor.type, actor);//engine.factory.create(Actor, "Boulder", actor);
		engine.scene.addChild(boulder.get());
	}
})
