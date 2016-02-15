import *  as http from "engine/net/http";

var imageLoader = (url) => {
	return new Promise( (resolve, reject) => {
		var image = new Image();
			image.addEventListener("load", ()=>{
				resolve(image);
			});
			image.addEventListener("error", reject);
			image.src = url;
	})
}

var jsonLoader = (url) => {
	return http.get(url).then((e)=>{
		return JSON.parse(e.target.responseText) ;
	}, (err)=> {
		return e;
	})
}

var defaultLoader = (url) => {
	return http.get(url).then((e) =>{
		return e.target.responseText;
	}, (err) => {
		return err
	})
}

export default class Cache {
	constructor() {
		this.assets = {};
		this.plugins = {
			"png" : imageLoader,
			"json" : jsonLoader
		};
	}


	get(url){
		return new Promise((resolve, reject) => {
			var assets = this.assets;

			if(assets[url]!==undefined){
				resolve(assets[url]);
			}

			var fileType = url.split(".").pop();
			var loader = this.plugins[fileType] || defaultLoader;

			loader(url).then((data) =>{
				resolve(data)
			}, (err) => {
				reject(err);
			})
			
		})
	}

	getAll(urls) {
		var promises = urls.map((url)=>{ return this.get(url); })
		return Promise.all(promises).then((assets)=>{
			var data = {}
			for(var i = 0; i < assets.length;i++){
				var url = urls[i], asset = assets[i];
				data[url] = asset;
			}
			return data;
		})
	}
}