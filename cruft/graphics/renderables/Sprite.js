
import {cache} from "../../engine";
import Renderable from "../Renderable";

export default class Sprite extends Renderable {

	constructor() {
		super();
		this.dirt = 0;
		this._width = null;
		this._height = null;
		this._url = null;
		this._image = null;
		this.loaded = false;
	}

	dirty () {
		this.dirt++;
	}

	get width() {
		return this._width;
	}

	set width (width) {
		this._width = width;
		this.dirt++;
	}

	get height() {
		return this._height;
	}

	set height(height) {
		this._height = height;
		this.dirt++;
	}

	get image () {
		return this._image;
	}

	set image (image) {
		this._image = image;
		if(!this._width) this._width = image.width;
		if(!this.height) this._height = image.height;
		this.dirt++;
	}

	get url() {
		return this._url;
	}

	set url(url) {
		this._url = url;
		this.loaded = false;
		cache.get(url).then((image) => {
			this.image = image;
			this.loaded = true;
		})
	}

}

