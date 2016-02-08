import Component from "core/engine/Component";

//think about makeing a "dirtable class "
export default class Sprite extends Component {
	constructor() {
		super("sprite");

		this.dirt = 0;
		this._image = null;
	}

	dirty () {
		this.dirt++;n
	}
	get image () {
		return this._image;
	}

	set image (image) {
		this._image = image;
		dirty();
	}



}