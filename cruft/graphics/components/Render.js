import Component from "../../core/Component";

export default class Render extends Component {

	constructor() {
		super();
		this.renderable = null;
	}

	destroy() {
		super.destroy();
		if(this.renderable){
			this.renderable.destroy();
			this.renderable = null;
		}
	
	}

}

