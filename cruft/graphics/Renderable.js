export default class Renderable {

	constructor() {
		this.data = {};
	}

	destroy() {
		for(let key in this.data) {
			this.data[key].destroy();
		}
		this.data = null;
	}

}