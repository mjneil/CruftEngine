import asad from "./js/test";
import Cache from "engine/core/Cache";
import {getEventManager} from "engine/core/EventManager";
import Actor from "engine/core/Actor";
import Scene2D from "engine/core/Scene2D";
import EventEmitter from "events";
import ProcessManager from "engine/core/ProcessManager";
import UpdateProcess from "./js/UpdateProcess"
import PlayerFactory from "./js/PlayerFactory"
import Renderer2D from "engine/graphics/Renderer2D";
import Transform2D from "engine/core/Transform2D"

//rethink the event system .-.
eventManager = new EventEmitter();
processManager = new ProcessManager();
scene = new Scene2D();
cache = new Cache();


camera = new Actor();//for now camera is just an actor? make a real class that does da mat 4 u
camera.addComponent(new Transform2D());
camera.getComponent("transform").scale = [400, 400]


//test events. Should fire when actor moves (look at procManager example below)
var actor = PlayerFactory();
scene.addChild(actor);
var renderer = new Renderer2D(400, 400);

eventManager.on("transform:move", (actor) => {
	//nsole.log("Actor : " + actor.id  + " Moved!")
})

////@TODO formalize plugins interface for now just hijack



//test cache
cache.get("assets/test.json").then((data)=>{
	console.log(data)//is an object
}, (err) => {
	console.log(err)
})

cache.get("assets/test.png").then((data)=>{
	console.log(data) //is an image
}, (err) => {
	console.log(err)
})

cache.get("assets/test.txt").then((data)=>{
	console.log(data) //is a string
}, (err) => {
	console.log(err)
})


//test processes might want to make the timer procs more effective (bettering dealing off half function calls. )
//make a updateprocesses instead (always run but pass in a ms).
/*
processManager.addChild(new UpdateProcess((deltaMs)=>{
	//should pass in time or somthing 
	var now = Date.now();
	var transform = camera.getComponent("transform");
	var pos = transform.position;
		pos[0] = Math.cos(now/100) * 100;
		pos[1] = Math.sin(now/100) * 100;
	transform.position = pos;
}))*/


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
}, 17)