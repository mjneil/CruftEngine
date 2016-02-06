import Pipline from "./Pipeline";
import http from "http";

export default class Cache {
	constructor() {
		this.assets = {};
		this.plugins = [];
	}

	get(url){
		return new Promise((resolve, reject) => {
			var assets = this.assets;
			if(assets[url] !== undefined){
				resolve(assets[url]);
				return;
			}

			//#TODO 

		})
	}
}