import {PEERJS_API_KEY} from "./js/constants";
import Scene from "engine/core/Scene"
import Engine from "engine/Engine";
import Script from "engine/processes/Script";
import ActorFactory from "./js/ActorFactory";
import * as http from "engine/net/http";
import Transform2D from "engine/components/Transform2D";
import PlayerSync from "engine/components/PlayerSync";

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
	factory.registerClass("Sprite", Sprite);
	factory.registerClass("Transform2D", Transform2D)	
	factory.registerClass("PlayerSync", PlayerSync);

	factory.loadSkeletons({
		"assets/entities/server/player.json" : "Player"
	}).then(() => {
		main();
	})

var main = () => {

	engine.network.on("connection", (session) => {
		var actor = factory.create("Player", {
			PlayerSync : { 
				owner : session.peerId
			}
		});
		engine.scene.addChild(actor);
	})

	engine.network.on("close", (session) => {
		var actor = engine.scene.findActorById(session.peerId);
		engine.scene.removeActor(actor);
		//problem is if this is running in the past this event might get there after you see stuff
		//somehow all events need to get procd in the past. 
		engine.network.emitReliable("actor:destroy", {id : actor.id});
		console.log("LOST SESSION : ", session);
	})

	//in fiture might just batch this. 
	engine.network.on("PlayerController:events", (data) => {
		var session = data.session;
		var packet = data.packet;
		var actor = scene.findActorById(session.peerId); //what if person is of owning multiple actors. 
		var events = packet.data;
		if(!actor || !events) return;//todo somehow make actors auto listen. 
		actor.getComponent("PlayerComponent").handleEvents(events);
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
