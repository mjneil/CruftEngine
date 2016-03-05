import {cache} from "../../engine";
import Renderable from "./Renderable";

export default class Sprite extends Renderable {

	constructor(url, width, height) {
		super();
		this.renderType = "sprite";
		this._width = null;
		this._height = null;
		this._url = null;
		this._image = null;
		this.loaded = false;
		this.version = 0;

		if(url) this.url = url;
		if(width !== undefined) this.width = width;
		if(height !== undefined) this.height = height;
		
	}

	set needsUpdate (value) {
		if(value) this.version++;
	}

	get width() {
		return this._width;
	}

	set width (width) {
		this._width = width;
		this.needsUpdate = true;
	}

	get height() {
		return this._height;
	}

	set height(height) {
		this._height = height;
		this.needsUpdate = true;
	}

	get image () {
		return this._image;
	}

	set image (image) {
		this._image = image;
		if(!this._width) this._width = image.width;
		if(!this.height) this._height = image.height;
		this.needsUpdate = true;
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

