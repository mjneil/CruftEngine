import {PEERJS_API_KEY} from "./js/constants";
import Scene from "engine/core/Scene"
import Renderer2D from "engine/graphics/Renderer2D"
import Engine from "engine/Engine"
import Transform2D from "engine/components/Transform2D";

//initialize everything. 
var engine = new Engine({ 
	network : { 
		name : null, 
		key : PEERJS_API_KEY 
	}
});

var scene = new Scene(0);//sceneid= 0;
	scene.addComponent(new Transform2D());
var renderer = new Renderer2D(GAME_WIDTH, GAME_HEIGHT);//todo fix aspect ratio stuff. 


engine.network.createSession("server").then((session) => {
	console.log(session);
	session.sendReliable({
		event:"game:events",
		events : ["I", "AM", "12"]
	})
})




//global access to the server connection :/ 
//WARNING. MAY BE MAKING DUPLICATE UUIDS. THIS IS A MUST DO. FIND OUT HOW TO MAKE UUIDS FREAL M8
/*
var processManager = getProcessManager()
var eventManager = getEventManager();
var cache = getCache();

var renderer = new Renderer2D(GAME_WIDTH, GAME_HEIGHT);
var scene = null;
var camera = new Camera2D(GAME_WIDTH, GAME_HEIGHT);
var follow = new CameraFollow();
camera.addComponent(follow);

var latency = null;
var timeDif = null;
var gameDelay = 100;

var peer = new Peer({key : PEERJS_API_KEY });
var peerjsKey = null;
peer.on("open", (id) => {
	console.log("PEERJS KEY : " + id);
	peerjsKey = id;
})


var reliable = new Connection(peer.connect("server", {reliable : true, ordered : true}));
var unreliable = new Connection(peer.connect("server", {reliable : false, ordered : false}));


//friggan really T_T. 

reliable.connection.on("open", () => {

	reliable.latency().then((data) => {
		console.log("RTT : " + data.latency + "ms");
		latency = data.latency/2;

		var serverTime = data.timestamp + latency;
		timeDif = (serverTime - Date.now());
	}).then(() => {
		reliable.connection.send({
			event : "connection:initialize", 
			connectionType : "RemoteViewReliable"
		})
	})

	reliable.on("game:initialize", (data) => {
		makeGameFromServer(data.scene);
		console.log(scene)
		main();
	});

	reliable.on("game:add_player", (data) => {
		if(scene == null || scene.actors[data.id]) return;
		var actor = factories.Player(data.id, data.owner, peerjsKey, reliable );//decouple this shit plz. 
		scene.addChild(actor);
	})


})



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


unreliable.connection.on("open", () => {
		unreliable.connection.send({
			event : "connection:initialize", 
			connectionType : "RemoteViewUnReliable"
		})


		unreliable.on("game:update", (data) => {
			updateStates(data);
		})
})

var draw = function () {
	renderer.render(scene, camera);
	requestAnimationFrame(draw);
};

processManager.addChild(new ScriptProcess((now, deltaMs) => {

	var simulatedTime = now + timeDif - gameDelay; //prob should just make that latency. 
	var state = interpStates(simulatedTime);
	applyState(state);
	scene.update(deltaMs);
	

}));


var main = function () {
	processManager.start(17);
	draw();
}

//#testinglyf
window.onload = function () { document.body.appendChild(renderer.canvas); }
window.kill = function () { processManager.kill(); }
window.onbeforeonload = function () {
	console.log("TERMINATING CONNECTION!");
	peer.destroy();
}



//toLocaleString()
var makeGameFromServer = (data) => {
	var actors = {}
		actors[data.id] = new Scene2D(data.id);

	for(var actorid in data.actors){
		var actor = factories.Player(actorid, data.actors[actorid].owner, peerjsKey, reliable );
		if(actor.owner == peerjsKey) {//todo make actor.isOwn()
			follow.setTarget(actor);
		}
		actor.getComponent("transform").position = data.actors[actorid].position;
		actors[actorid] = actor;
	}

	for(var actorid in data.actors){
		var actormeta = data.actors[actorid];
		if(actormeta.parent) actors[actormeta.parent].addChild(actors[actormeta.id]); 
	}

	scene = actors[data.id];
	scene.addChild(camera);

}
*/
