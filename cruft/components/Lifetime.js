import Component from "../core/Component";

export default class Lifetime extends Component {

	constructor(lifetime) {
		super()
		this.lifetime = lifetime;
	}
	
	update(deltaMs) {
		this.lifetime-=deltaMs;
		if(this.lifetime<0){
			this.actor.destroy();
		}
	}
}