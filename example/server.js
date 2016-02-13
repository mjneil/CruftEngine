import {PEERJS_API_KEY} from "./js/constants"

import Scene2D from "engine/core/Scene2D"
import ProcessManager from "engine/core/ProcessManager";
import EventManager from "events";
import Actor from "engine/core/Actor"
import PlayerComponent from "./js/PlayerComponent"
import Transform2D from "engine/core/Transform2D"
import {getEventManager, getProcessManager} from "engine/core/globals"
import Connection from "engine/net/Connection";
import * as factories from "./js/serverFactories";
import uuid from "engine/lib/uuid"
import {vec2} from "engine/lib/gl-matrix"
import ScriptProcess from "engine/core/ScriptProcess"

//prefix all actor's with thing so as not to conflic with locally created uuids. 
//make a real serializer class thingy. freal m8s
//I gess the server needs to limit the ranges of people hmmmmm. 

var connections = {};

var peer = new Peer("server", {key : PEERJS_API_KEY });

var reliable = null;
var unreliable = null;

peer.on("open", (id) => {
	console.log("PEERJS KEY : " + id);
})

peer.on("connection", (conn) => {

	if(!connections[conn.peer]) connections[conn.peer] = {};

	var connection = new Connection(conn);//classify its type later :/. 

	connection.on("connection:initialize", (data) => {
		var meta = connections[connection.connection.peer];

		if(data.connectionType === "RemoteViewReliable") {
			meta.reliable = connection;
			meta.actor = addPlayerToGame(connection.connection.peer);
			addReliableListeners(connection, meta.actor);//THIS IS ALL PSUEDO TESTING STUFF,
		}else if(data.connectionType === "RemoteViewUnReliable") {
			meta.unreliable = connection;
		}

		connection.connection.send({
			event : "game:initialize", 
			scene : generateSceneState()
		})
	})
});




//this is all NOT how it should be done. 
var addReliableListeners = (connection, actor) => {
	connection.on("game:events", (data) => {
		var events = data.events;
		for(var key in events) {
			eventManager.emit(key, {
				actor : actor,
				value : events[key]
			});
		}
	})
}



var scene = new Scene2D("server-" + uuid.create().toString());//should def automate that in the future :O
var eventManager = getEventManager();
var processManager = getProcessManager();


eventManager.on("SET_MOVING_UP", function (e) {
	e.actor.components.PlayerComponent.movingUp = e.value;
})
eventManager.on("SET_MOVING_DOWN", function (e) {
	e.actor.components.PlayerComponent.movingDown = e.value;
})
eventManager.on("SET_MOVING_LEFT", function (e) {
	e.actor.components.PlayerComponent.movingLeft = e.value;
})
eventManager.on("SET_MOVING_RIGHT", function (e) {
	e.actor.components.PlayerComponent.movingRight = e.value;
})


processManager.addChild(new ScriptProcess((now, deltaMs) => {

	scene.update(deltaMs);

	var packet = {
		event : "game:update",
		timestamp : now,
		scene : generateSceneState()
	};

	for(var key in connections) {
		var meta = connections[key]
		if(meta.unreliable) {
			meta.unreliable.connection.send(packet);
		}
	}


}));


processManager.start(33);

window.kill = function () { processManager.kill(); }








var addPlayerToGame = (owner) => {
	var actor = factories.Player(owner);
	scene.addChild(actor);
	//emit the add person here
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

