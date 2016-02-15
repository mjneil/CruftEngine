import {PEERJS_API_KEY} from "./js/constants";
import Scene from "engine/core/Scene"
import Engine from "engine/Engine";
import Script from "engine/processes/Script";
import ActorFactory from "./js/ActorFactory";
import * as http from "engine/net/http";

var engine = new Engine({ 
	network : { 
		name : "gameserver", 
		key : PEERJS_API_KEY 
	},
	scene : {
		id : 0
	}
});


var factory = new ActorFactory(engine);
engine.cache.get("assets/entities/server/player.json").then((skeleton) => {//todo move this into the factory class. 
	factory.skeletons["player"] = skeleton;
	
	/* //this is how it works. everything is optional. (except the type. ) 
	var actor = factory.create("player", {
		id : 12, 
		Transform2D: { position : [10, 10] }
	});*/

	main();
})



var main = () => {

	engine.network.on("connection", (session) => {
		console.log("NEW SESSION : ", session);
	})

	engine.network.on("close", (session) => {
		console.log("LOST SESSION : ", session);
	})

	//in fiture might just batch this. 
	engine.network.on("PlayerController:events", (data) => {
		var session = data.session;
		var packet = data.packet;
		var actor = scene.findActorById(session.peerId);
		var events = packet.data;
		if(!actor || !events) return;
		engine.emit("PlayerController:events". { actor , events });
	})

	//I dont like that this is here. Should just inherently work. 
	//but at the same time I dont want every single player to be listening
	//for every other player's events. 
	//this is very temp. 
	engine.on("PlayerController:events", (e) => { 
		e.actor.getComponent("PlayerComponent").handleEvents(e.events);
	})

	engine.scheduler.addChild(new Script((now, deltaMs) => {
		engine.scene.update(deltaMs);
	}));

	engine.scheduler.start(33);
	window.kill = function () { engine.scheduler.kill(); }
}
















/*


var destroyPlayer = (actor) => {
	if(scene.actors[actor.id]){
		scene.removeActor(actor);
	}
}

var addPlayerToGame = (owner) => {
	var actor = factories.Player(owner);
	scene.addChild(actor);

	var packet = {
		event : "game:add_player",
		timestamp : Date.now(),
		id : actor.id,
		owner : actor.owner
	};

	for(var key in connections) {
		var meta = connections[key]
		if(meta.reliable) {
			meta.reliable.connection.send(packet);
		}
	}

	return actor;
}


//need one to send everything
//and one to only send things dat are important 2 send. 
//super fake serialze
var generateSceneState = () => {
	var json = {
		id : scene.id,
		actors : {}
	};
	var actors = json.actors;

	//donnt recurse.
	for(var key in scene.actors) {
		var actor = scene.actors[key];
		var transform = actor.getComponent("transform");
		var position = [0, 0]; //for now just copy position
		vec2.copy(position, transform._position);

		//super fake 
		actors[key] = {
			id : actor.id,
			owner : actor.owner,
			parent : (actor.parent)? actor.parent.id:null ,    
			position : position 
		}

	}

	//console.log(json);

	return json;
}

*/
