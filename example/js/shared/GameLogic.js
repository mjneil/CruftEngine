import Component from "engine/core/Component"
import engine, {scheduler, instantiate} from "engine/engine";
import Camera2D from "engine/graphics/Camera2D"
import Interval from "engine/processes/Interval";
import Actor from "engine/core/Actor";
import memory from "engine/memory"

export default class GameLogic extends Component {
	constructor() {
		super("GameLogic");
		this.playerTransform = null;
		this.playerLogic = null;
	}

	initialize() {
		
		var scene = this.actor; //almost never should you use new directly
		//everything needs to go through the memeorymanager 
		//
		engine.camera = new Camera2D(window.innerWidth, window.innerHeight);
		scene.addChild(engine.camera);

		var player = instantiate("Player");
		var actor = player.get();
		scene.addChild(actor);

		this.playerLogic = memory.createPointer(actor.getComponent("PlayerLogic"));
		this.playerTransform = memory.createPointer(actor.getComponent("transform"));

		engine.on("PlayerController:events", (events) => {
			var logic = this.playerLogic.get();
			if(logic) {
				logic.handleEvents(events);
			}
		})

		engine.on("PlayerController:mouse", (events) => {
			var logic = this.playerLogic.get();
			if(logic) {
				logic.handleMouse(events);
			}
		})

		scheduler.addChild(new Interval(()=>{
			var zombie = instantiate("Zombie", {
				ZombieLogic : {
					target : this.playerTransform
				}
			})	
			engine.scene.addChild(zombie.get());
		}, 5000))
	}
}