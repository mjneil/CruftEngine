import Component from "../../core/Component";

export default class Renderable extends Component {

	constructor() {
		super();
		this.type = "renderable";
		this.renderType = null;
		this.data = {};
	}

	destroy () {
		for(let key in this.data) {
			this.data[key].destroy();
		}
		this.data = null;
	}
}

