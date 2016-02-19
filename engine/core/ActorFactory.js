import engine from "engine/Engine";

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

	loadSkeletons(skeletons) {
		return engine.cache.getAll(Object.keys(skeletons)).then((assets)=>{
			for(var url in skeletons) {
				this.skeletons[skeletons[url]] = assets[url];
			}
			return assets;
		})
	}

	create(base, type, config) {
		var id = (config)? config.id : null;

		var actor = new base(id);

		var skeleton = this.skeletons[type];
		var components = this.components;
		
		for(var componentType in skeleton) {
			var CC = this.components[componentType];
			if(!CC) console.error(`Component ${componentType} Does Not Exist`);
			var component = new CC();

			actor.addComponent(component);
			var defaults = skeleton[componentType];
			component.setFromJSON(defaults);	
		}

		if(config) {
			for(var componentType in skeleton) {
				var settings = config[componentType];
				component.setFromJSON(settings);
			}			
		}

		return actor;

	}

}