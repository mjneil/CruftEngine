import asad from "./js/test";
import Actor from "engine/core/Actor";
import Cache from "engine/core/Cache";
import {getEventManager} from "engine/core/EventManager";
import Actor2D from "engine/core/Actor2D";
import Scene2D from "engine/core/Scene2D";
import EventEmitter from "events";
import ProcessManager from "engine/core/ProcessManager";
import TimerProcess from "./js/TimerProcess"

//rethink the event system .-.
eventManager = new EventEmitter();
processManager = new ProcessManager();
scene = new Scene2D();
cache = new Cache();

//test events. Should fire when actor moves (look at procManager example below)
var actor = new Actor2D();
eventManager.on("transform:move", (actor) => {
	console.log("Actor : " + actor.id  + " Moved!")
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


//test processes 
processManager.addChild(new TimerProcess(1000, ()=>{
	var pos = vec2.create();
	actor.getComponent("transform").position = pos;
}))




//game loop thingy (not using req anim frame because reasons)
var last = Date.now();
setInterval( () => {
	var now = Date.now();
	var deltaMs = now - last;
	last = now;


	processManager.update(deltaMs);
}, 17)