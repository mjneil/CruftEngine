import {PEERJS_API_KEY} from "./js/constants";
import Scene from "engine/core/Scene"
import Engine from "engine/Engine";
import Script from "engine/processes/Script";
import Sprite from "engine/components/Sprite";
import * as http from "engine/net/http";
import Transform2D from "engine/components/Transform2D";
import PlayerSync from "./js/PlayerSync";
import SceneSync from "./js/SceneSync";
import PlayerComponent from "./js/PlayerComponent";

var engine = new Engine({ 
	network : { 
		name : "game", 
		key : PEERJS_API_KEY 
	},
	scene : {
		id : 0
	},
	scheduler : {
		deltaMs : 33
	},
	factory : {
		skeletons : {
			"assets/entities/server/player.json" : "Player"  ,
		},
		components : {
			"Transform2D" : Transform2D,
			"PlayerSync" : PlayerSync,
			"SceneSync" : SceneSync,
			"PlayerComponent" : PlayerComponent
		}
	}
});


engine.scene.addComponent(new SceneSync());




var main = () => {

	engine.network.on("connection", (session) => {
		var actor = engine.factory.create("Player", {
			PlayerSync : { owner : session.key }
		});
		engine.scene.addChild(actor);
		session.emitReliable("scene:sync:initialize", engine.scene.getComponent("sync").createFullState());
		engine.network.emitReliable("engine:factory:create", actor.getComponent("sync").createFullState());
	})

	engine.network.on("close", (session) => {
		var actor = engine.scene.getComponent("sync").findActorByOwner(session.key);
		engine.scene.removeActor(actor); //todo make a destroy method to clean up remove listeners and whatnot 
		engine.network.emitReliable("destroy", {id : actor.id}); //todo think about event ordering for TCP/UDP + 100ms delay. 
	})

	//in fiture might just batch this. 
	engine.network.on("PlayerController:events", (data) => {
		var session = data.session;
		var packet = data.packet;
		var actor =  engine.scene.getComponent("sync").findActorByOwner(session.key);//what if person is of owning multiple actors. 
		var events = packet.data;
		if(!actor || !events) return;//todo somehow make actors auto listen. 
		actor.getComponent("PlayerComponent").handleEvents(events);
	})

	engine.scheduler.addChild(new Script((now, deltaMs) => {
		engine.scene.update(deltaMs);
		engine.network.emitUnreliable("sync:update", engine.scene.getComponent("sync").createPartialState() );
	}));


}


engine.ready.then(main)


window.engine = engine;
window.kill = function () { engine.scheduler.kill(); }







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
