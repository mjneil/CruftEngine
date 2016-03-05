import Actor from "./Actor";

export default class ActorFactory { //def move this to core at some point 

	constructor() {
		this.creators = {};
	}

	register(creators) {
		for(var name in creators) {
			this.creators[name] = creators[name];
		}
	}

	create(type, config) {//right now can only have config code for things in a skeleton 

		if(type === null) return new Actor();


		var creator = this.creators[type];
		
		if(!creator){
			console.error(`Creator ${type} not found.`);
			return null;
		}

		return creator(config);
	}

}