import NetActor from "engine/core/NetActor"
import Sprite from "engine/graphics/Sprite"
import Transform2D from "engine/core/Transform2D";
import PlayerController from "./PlayerController";

//todo make some of dis stuff global / loadable. / re-do all of it cause its bad
var Player = (id, owner, self, reliable) => {
	var actor = new NetActor(id, owner);
		actor.addComponent(new Transform2D());

	var sprite = new Sprite("assets/images/player.png");
		sprite.width = 200;
		sprite.height = 200;

		actor.addComponent(sprite);
	//for now only add if self
	if(owner === self) {
		actor.addComponent(new PlayerController(reliable));
	}

		//actor.addComponent(new PlayerController());
	return actor;
}


export {Player}