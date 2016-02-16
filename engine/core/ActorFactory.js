import Actor from "engine/core/Actor"

export default class ActorFactory { //def move this to core at some point 

	constructor(engine) {
		this.engine = engine;

		this.skeletons = {};
		this.constructors = {};
	}

	registerClass(type, constructor) {
		this.constructors[type] = constructor;
	}

	loadSkeletons(skeletons) {
		return this.engine.cache.getAll(Object.keys(skeletons)).then((assets)=>{
			for(var url in skeletons) {
				this.skeletons[skeletons[url]] = assets[url];
			}
			return assets;
		})
	}

	create(type, config) {
		var actor = new Actor(config.id);
			actor.setEngine(this.engine);

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



		this.engine.scene.addActor(actor);
		return actor;

	}




}