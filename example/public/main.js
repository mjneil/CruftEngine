import asad from "./js/test";
import Actor from "engine/core/Actor";
import Cache from "engine/core/Cache";
import {getEventManager} from "engine/core/EventManager";
import Actor3D from "engine/core/Actor3D";
import Scene3D from "engine/core/Scene3D";
import EventEmitter from "events";
import ProcessManager from "engine/core/ProcessManager";
import TimerProcess from "./js/TimerProcess"


eventManager = new EventEmitter();
processManager = new ProcessManager();
scene = new Scene3D();
cache = new Cache();

//test actor
var actor = new Actor3D();
eventManager.on("actor:move", (actor) => {
	console.log("Actor : " + actor.id  + " Moved!")
})


//test cache
cache.get("assets/test.json").then((data)=>{
	console.log(data)
}, (err) => {
	console.log(err)
})

//test processes 
processManager.addChild(new TimerProcess(1000, ()=>{
	var pos = vec3.create();
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