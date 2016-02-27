import Component from "../core/Component";

export default class Lifetime extends Component {

	constructor() {
		super()
		this.lifetime = 0;
	}
	update(deltaMs) {
		this.lifetime-=deltaMs;
		if(this.lifetime<0){
			this.actor.destroy();
		}
	}
}