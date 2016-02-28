import Actor from "./Actor";

export default class ActorFactory { //def move this to core at some point 

	constructor() {
		this.skeletons = {};
		this.components = {};
	}

	registerComponent(type, constructor) {
		this.components[type] = constructor;
	}

	registerComponents(components){
		for(var name in components){
			this.registerComponent(name, components[name]);
		}
	}

	registerSkeleton(type, skeleton) {
		this.skeletons[type] = skeleton;
	}

	registerSkeletons(skeletons) {
		for(var type in skeletons){
			this.registerSkeleton(type, skeletons[type]);
		}
	}

	create(type, config) {//right now can only have config code for things in a skeleton 
		var guid = (config)? config.guid : null;
		var actor = new Actor(guid);

		var skeleton = this.skeletons[type];
		var components = this.components;

		if(skeleton) {
			for(var componentType in skeleton) {
				var CC = this.components[componentType];
				if(!CC) console.error(`Component ${componentType} Does Not Exist`);
				var component = new CC();

				actor.addComponent(component);

				var defaults = skeleton[componentType];
				component.setFromJSON(defaults);	

				if(config){
					var settings = config[componentType];
					component.setFromJSON(settings);
				}

				component.initialize();
				
			}
		}
		

		return actor;

	}

}