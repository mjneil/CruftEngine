import {PEERJS_API_KEY} from "./constants";

import Scene2D from "engine/core/Scene2D"
import ProcessManager from "engine/core/ProcessManager";
import EventManager from "events";
import Cache from "engine/core/Cache"
import Actor from "engine/core/Actor"
import Transform2D from "engine/core/Transform2D"
import Renderer2D from "engine/graphics/Renderer2D"
import Sprite from "engine/graphics/Sprite"
import PlayerController from "./js//PlayerController";
scene = new Scene2D();
processManager = new ProcessManager();
eventManager = new EventManager();
cache = new Cache();

camera = new Actor();
camera.addComponent(new Transform2D());
camera.getComponent("transform").scale = [GAME_WIDTH, GAME_HEIGHT]
var renderer = new Renderer2D(GAME_WIDTH, GAME_HEIGHT);

window.onload = function () {
	document.body.appendChild(renderer.canvas);
}

//make a simple actor and add him 2 scene

var ActorFactory = () => {
	var actor = new Actor();
		actor.addComponent(new Transform2D());
	var sprite = new Sprite("assets/images/player.png");
		sprite.width = 200;
		sprite.height = 200;
		actor.addComponent(sprite);
		actor.addComponent(new PlayerController());
	return actor;
}

var actor = ActorFactory();
scene.addChild(actor);


var peer = new Peer({key:PEERJS_API_KEY});

peer.on("open", (id) => {
	console.log("PeerJS ID : " + id);
})
 
var conn = peer.connect("server");

var currentPacket = null; //reallly basic interp stuff. super#lagcity
conn.on('open',  () => {
	conn.on("data", (e) => {
		currentPacket = e;
	})
})



var last = Date.now();
var lastPacket = null;
var lastPacketTime = null;
setInterval( () => {
	var now = Date.now();
	var deltaMs = now - last;
	last = now;
	scene.update(deltaMs);
	processManager.update(deltaMs);
	renderer.render(scene, camera);

	conn.send(actor.getComponent("PlayerController").state);

	if(currentPacket) {

		//for now just fake it till u make it :^) :^) :^)
		var positionPacket = currentPacket.children[0].components.transform.position;
		var transform = actor.getComponent("transform");
			transform.position = positionPacket;
	}

}, 17)


//begin test enviroment





/*
//rethink the event system .-.
eventManager = new EventEmitter();
processManager = new ProcessManager();
scene = new Scene2D();
cache = new Cache();

camera = new Actor();//for now camera is just an actor? make a real class that does da mat 4 u
camera.addComponent(new Transform2D());
camera.getComponent("transform").scale = [GAME_WIDTH, GAME_HEIGHT]


//test events. Should fire when actor moves (look at procManager example below)
var actor = PlayerFactory();
scene.addChild(actor);
var renderer = new Renderer2D(GAME_WIDTH, GAME_HEIGHT);



window.onload = function () {
	document.body.appendChild(renderer.canvas);
}




//game loop thingy (not using req anim frame because reasons)
var last = Date.now();
setInterval( () => {
	var now = Date.now();
	var deltaMs = now - last;
	last = now;
	scene.update(deltaMs);
	processManager.update(deltaMs);
	renderer.render(scene, camera);
}, 17)*/