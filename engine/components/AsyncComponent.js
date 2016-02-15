import Component from "engine/core/Component"

export default class AsyncComponent extends Component {

	constructor(type) {
		super(type);
		this._loaded = false;
		this.urls = [];
		this.assets = null;
		this.children = [];
		this.cache = null;
	}

	setCache(cache) {
		this.cache = cache;
	}

	loadAsync (urls) {
		return this.cache.getAll(urls).then((assets) =>{
			this.assets = assets;
			this._loaded = true;
			return assets;
		})
	}

	get loaded () {
		if(!this._loaded) { //assume if people are checking if its laoded to start the proc  
			return false
		};
		for(let child of this.children){
			if(!child.loaded) return false;
		}
		return true;
	}
}