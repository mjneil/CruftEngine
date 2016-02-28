import Component from "engine/core/Component";

export default class Lifetime extends Component {
	constructor() {
		super("Lifetime")
		this.lifetime = 0;
	}
	update(deltaMs) {
		this.lifetime-=deltaMs;
		if(this.lifetime<0){
			this.actor.destroy();
		}
	}

	setFromJSON(lifetime) {
		if(!lifetime) return;
		this.lifetime = lifetime;
	}
}