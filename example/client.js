import initialize from "./js/client/initialize";
import engine from "engine/Engine"
import Renderer2D from "engine/graphics/Renderer2D"
import SpriteRenderer from "engine/graphics/plugins/SpriteRenderer";
import Script from "engine/processes/Script"
import Camera2D from "engine/graphics/Camera2D";
import Actor from "engine/core/Actor"

initialize();

var renderer = new Renderer2D(GAME_WIDTH, GAME_HEIGHT);//maybe make a game view class?
	renderer.registerPlugin(new SpriteRenderer());
var camera = new Camera2D(GAME_WIDTH, GAME_HEIGHT); //also todo make a real camera class.

//@TODO create world01.json files etc that describe actors within a world. 
//just add an actor 


var main = () => {

	var player = engine.factory.create(Actor, "Player", {
		transform2D : {
			position : [10, 0]
		}
	});

	engine.scene.addChild(player);
	engine.scene.addChild(camera);
	engine.scene.getComponent("GameLogic").player = player;
	engine.scheduler.addChild(new Script((now, deltaMs) => {
		renderer.render(engine.scene, camera);
	}));
}

engine.running.then(main);


//#DEBUG / TEST. #IMPORTANT
window.onload = function () { document.body.appendChild(renderer.canvas); }
window.engine = engine;
window.kill = function () { engine.scheduler.kill(); }
window.onbeforeonload = function () {
	engine.network.peer.destroy();
}
