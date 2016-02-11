import {PEERJS_API_KEY} from "./constants"

import Scene2D from "engine/core/Scene2D"
import ProcessManager from "engine/core/ProcessManager";
import EventManager from "events";
import Actor from "engine/core/Actor"
import Transform2D from "engine/core/Transform2D"

scene = new Scene2D();
processManager = new ProcessManager();
eventManager = new EventManager();


var ActorFactory = () => {
	var actor = new Actor();
		actor.addComponent(new Transform2D());
	return actor;
}

var actor = ActorFactory();
scene.addChild(actor);

//at some point make a mapping. This is just a test run. 
//idk if this is reliable so like maybe packets are being dropped might cause bugs idk. 
//might want to do tcp events for like....commands and then state stuff for the rest?
//idk :/
var lastPacket = null;
var connections = [];
(() => {
	var peer = new Peer("server", {key:PEERJS_API_KEY});

	peer.on("open", (id) => {
		console.log("PeerJS ID : " + id);
	})

	peer.on("connection", (conn) => {
		conn.on("data", (data) => {
			lastPacket = data;
		});
		connections.push(conn);
		console.log("REC'VD CONNECTION!");
	})

})()








//server game loop
var last = Date.now();
setInterval( () => {
	var now = Date.now();
	var deltaMs = now - last;
	last = now;
	if(lastPacket){
		var transform = actor.getComponent("transform");
		var position = transform.position;
		var speed = 1;
		//console.log(lastPacket.MOVING_UP)

		if(lastPacket.MOVING_UP){
			position[1] += speed * deltaMs;
		}

		if(lastPacket.MOVING_DOWN){
			position[1] -= speed * deltaMs;
		}

		if(lastPacket.MOVING_LEFT){
			position[0] -= speed * deltaMs;
		}

		if(lastPacket.MOVING_RIGHT){
			position[0] += speed * deltaMs;
		}
		transform.position = position;
	}

	scene.update(deltaMs);
	processManager.update(deltaMs);

	//send it to the game views. :/ test
	var packet = {
		timestamp : Date.now(),
		event : "update",
		scene : scene.toJSON() 
	}

	connections.forEach((conn) => {
		conn.send(scene.toJSON());
	})



}, 33);