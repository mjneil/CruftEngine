import {PEERJS_API_KEY} from "./js/constants";
import Scene from "engine/core/Scene"
import Renderer2D from "engine/graphics/Renderer2D"
import Engine from "engine/Engine"
import Sprite from "engine/components/Sprite";
import Transform2D from "engine/components/Transform2D";
import PlayerSync from "./js/PlayerSync";
import SceneSync from "./js/SceneSync";
import SpriteRenderer from "engine/graphics/plugins/SpriteRenderer";
import Script from "engine/processes/Script"
import Camera2D from "engine/graphics/Camera2D";
import PlayerController from "./js/PlayerController";


var engine = new Engine({ 
	network : { 
		key : PEERJS_API_KEY,
		session : "game" //optionally do it on intialization IF U want UP 2 UUUUUUU
	},
	scene : {
		id : 0
	},
	scheduler : {
		deltaMs : 17
	},
	factory : {
		components : {
			"Sprite" : Sprite,
			"Transform2D" : Transform2D,
			"PlayerSync" : PlayerSync,
			"PlayerController" : PlayerController,
		},
		skeletons : {
			"assets/entities/client/player.json" : "Player"
		}
	}
});





engine.scene.addComponent(new SceneSync());
var renderer = new Renderer2D(GAME_WIDTH, GAME_HEIGHT);//todo fix aspect ratio stuff. //make sure I'm updating worldTransforms on add/remove. NOT DOING IT RIGHT NOW
	renderer.registerPlugin(new SpriteRenderer());
var camera = new Camera2D(GAME_WIDTH, GAME_HEIGHT);//TODO this camera class is @$$. get rid of it. 
engine.scene.addChild(camera);

window.onload = function () { document.body.appendChild(renderer.canvas); }


var main = () => {

	engine.scheduler.addChild(new Script((now, deltaMs) => {
		engine.scene.update(deltaMs);
		renderer.render(engine.scene, camera);
	}));

}





engine.network.on("scene:sync:initialize", (e) => { //move this into a thingy that isnt here. 
	var packet = e.packet;
	var data = packet.data;

	for(var id in data.actors){
		var config = data.actors[id]
		engine.factory.create(config.type, config);
	}

	for(var id in data.actors){
		var actor = engine.scene.actors[id];
		var config = data.actors[id]
		if(config.parentId === engine.scene.id){
			engine.scene.addChild(actor);
		}else{
			if(config.parentId) engine.scene.actors[config.parentId].addChild(actor);
		}
	}

	for(var id in engine.scene.actors){
		var actor = engine.scene.actors[id];
		var sync = actor.getComponent("sync");
		if(sync.owner === engine.network.peerId) {
			actor.addComponent(new PlayerController());
		}
	}

	console.log("HELLO, MR.SQUNCH")

})

engine.network.on("sync:update", (e) => {
	var packet = e.packet;
	var data = packet.data;

	//temp just do this for now :/
	for(var id in data) {
		var config = data[id];
		var actor = engine.scene.actors[id];
		if(actor ){
			var sync = actor.getComponent("sync");
			if(sync) {
				sync.applyPartialState(null, null, config);
			}
		}
	}
})

engine.network.on("engine:factory:create", (e) => {
	var packet = e.packet;
	var config = packet.data;

	engine.factory.create(config.type, config);

	var actor = engine.scene.actors[config.id];
	if(config.parentId === engine.scene.id){
		engine.scene.addChild(actor);
	}else{
		if(config.parentId) engine.scene.actors[config.parentId].addChild(actor);
	}

})

engine.network.on("destroy", (e) => {
	var actor = engine.scene.actors[e.packet.data.id];
	console.log(e)
	if(actor) {
		engine.scene.removeActor(actor);
	}
})


engine.ready.then(main);


window.engine = engine;
window.kill = function () { engine.scheduler.kill(); }
window.onbeforeonload = function () {
	engine.network.peer.destroy();
}




//global access to the server connection :/ 
//WARNING. MAY BE MAKING DUPLICATE UUIDS. THIS IS A MUST DO. FIND OUT HOW TO MAKE UUIDS FREAL M8
/*


var latency = null;
var timeDif = null;
var gameDelay = 100;

var states = [];

var updateStates = function (state) {
	states.push(state);
	states.sort((a, b) => { return a.timestamp - b.timestamp; })
}


var interpStates = function (simulatedTime) {
	//find the 2 states. 
	var past = null, future = null;
	for(var i = 0; i < states.length;i++){
		var state = states[i];
		if(state.timestamp < simulatedTime){
			past = i;
		}else{
			break;
		}
	}

	for(var i = states.length-1; i > -1;i--){
		var state = states[i];
		if(state.timestamp >= simulatedTime){
			future = i;
		}else{
			break;
		}
	}

	if(past == null) {
		return states[future];
	}

	if(future == null){
		return null;
	}

	

	var pastState = states[past].scene.actors;
	var futureState = states[future].scene.actors;

	var newState = {
		timestamp : 0,
		scene : {
			id : states[future].scene.id,
			actors : {}
		}
	}

	//console.log(futureState)


	var w =  (simulatedTime - states[past].timestamp) / (states[future].timestamp - states[past].timestamp);
	for(var id in futureState){
		var pastPos = pastState[id].position;
		var futurePos = futureState[id].position;
		//console.log(pastPos, futurePos);
		newState.scene.actors[id] = {
			position : [ (1-w) * pastPos[0] + w * futurePos[0], (1-w) * pastPos[1] + w * futurePos[1]  ]
		}


	}

	states = states.slice(past);
	return newState;
}

var applyState = function (state) {
	//console.log(state);
	if(!state) return;
	var actors = state.scene.actors;
	for(var id in actors){
		scene.actors[id].components.transform.position = actors[id].position;
	}
}

*/
