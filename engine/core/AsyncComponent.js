import Component from "engine/core/Component"
import {getCache} from "engine/core/globals"
var cache = getCache();
export default class AsyncComponent extends Component {

	constructor(type) {
		super(type);
		this._loaded = false;
		this.urls = [];
		this.assets = null;
		this.children = [];
	}

	loadAsync (urls) {
		return cache.getAll(urls).then((assets) =>{
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