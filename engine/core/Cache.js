import Pipline from "./Pipeline";
import *  as http from "engine/core/http";

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

			http.get(url).then((e)=>{
				assets[url] = e.target.responseText;
				resolve(assets[url]);
			}, (e)=> {
				reject(e);
			})

		})
	}
}