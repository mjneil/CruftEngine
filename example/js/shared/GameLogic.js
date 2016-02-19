import Component from "engine/core/Component"
import engine from "engine/Engine";

export default class GameLogic extends Component {
	constructor() {
		super("GameLogic");
		this.player = null;
		engine.on("PlayerController:events", (events) => {
			if(this.player) {
				this.player.getComponent("PlayerLogic").handleEvents(events);
			}
		})

		engine.on("PlayerController:mouse", (events) => {
			if(this.player) {
				this.player.getComponent("PlayerLogic").handleMouse(events);//todo make handle or set direction or idk.
			}
		})
	}
}