import Actor from "engine/core/Actor";
import Transform2D from "engine/core/Transform2D";
import Sprite from "engine/graphics/Sprite"
import PlayerController from "./PlayerController";
import PlayerComponent from "./PlayerComponent"
export default function () {
	var actor = new Actor();
		//add transform 
		actor.addComponent(new Transform2D());

		//add sprite possibly have spriteBuilders for different class / images / deps idk
		var sprite = new Sprite();
			sprite.loadAsync(["assets/images/player.png"]).then((assets)=> {
				sprite.image = assets["assets/images/player.png"];
			})

			sprite.width = 100;
			sprite.height = 100;
			//I dont like this part
		actor.addComponent(sprite);

		//add controller
		var controller = new PlayerController();
		actor.addComponent(controller);

		///add player
		var playerComponent = new PlayerComponent();
		actor.addComponent(playerComponent);

	return actor;
}