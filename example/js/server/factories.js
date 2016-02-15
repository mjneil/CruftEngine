import Scene from "engine/core/Scene"
import Transform2D from "engine/components/Transform2D";
import uuid from "engine/lib/uuid";


var game = g;

var initialize = (g) => {
	game = g;
}

var Player = (owner) => {
	var actor = new NetActor("server-" + uuid.create().toString(), owner);
		actor.addComponent(new Transform2D());
		actor.addComponent(new PlayerComponent());
	return actor;
}

var createScene = () => {
	var scene = new Scene(0);

	var transform = new Transform2D();
	scene.addComponent(transform);
	scene.setEmitter(game);
	return scene;
}


export {Player, createScene, initialize} 