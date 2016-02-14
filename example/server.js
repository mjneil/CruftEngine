import {PEERJS_API_KEY} from "./js/constants";
import Scene2D from "engine/core/Scene2D"
import NetworkManager from "engine/net/NetworkManager";
import ProcessManager from "engine/core/ProcessManager";
import EventEmitter from "events";

//initialize everything. 
var scene = new Scene2D(0);//sceneid= 0;
var networkManager = new NetworkManager("server", PEERJS_API_KEY);
var processManager = new ProcessManager();
var eventManager = new EventEmitter();


//TODO figure out how to handle the creation/deletion events. 
var sessionActorMap = {};

networkManager.on("connection", (session) => {
	if(sessionActorMap[session.key]) return;
	sessionActorMap[session.key] = factories.Player();//TODO
	scene.addChild(sessionActorMap[session.key]);
})

networkManager.on("close", (session) => {
	if(!sessionActorMap[session.key]) return;
	scene.removeActor(sessionActorMap[session.key]);
	delete sessionActorMap[session.key];
})

networkManager.on("game:update", (data) => {
	//todo some ID thing (aka make this work )
	var events = data.data.events;
	for(var key in events) {
		eventManager.emit(key, {
			actor : actor,
			value : events[key]
		})
	}
})

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
	networkManager.sendUnreliable({ 
		event : "game:update", 
		timestamp : now, 
		scene : generateSceneState() 
	});
}));
processManager.start(33);
window.kill = function () { processManager.kill(); }







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
