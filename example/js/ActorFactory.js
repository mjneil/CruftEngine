import Actor from "engine/core/Actor"
import Sprite from "engine/components/Sprite";
import Transform2D from "engine/components/Transform2D";

export default class ActorFactory { //def move this to core at some point 

	constructor(engine) {
		this.engine = engine;

		this.skeletons = {};

		this.constructors = {};
		this.constructors["Sprite"] = Sprite;
		this.constructors["Transform2D"] = Transform2D;
	}

	create(type, config) {
		var actor = new Actor(config.id);
		var constructors = this.constructors;
		var skeleton = this.skeletons[type];

		for(var componentType in skeleton) {
			var constructor = this.constructors[componentType];

			var component = new constructor();
				actor.addComponent(component);

				var defaults = skeleton[componentType];
				component.setFromJSON(defaults);
				
				if(config) {
					var settings = config[componentType];
					component.setFromJSON(settings);
				}

				
		}

		return actor;

	}




}