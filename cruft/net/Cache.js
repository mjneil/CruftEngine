export default class Cache {
	constructor() {

		this.assets = {};
		this.loaders = {};

	}

	register(loaders) {
		for(var name in loaders){
			this.loaders[name] = loaders[name];
		}
	}

	
	get(path){
		return new Promise((resolve, reject) => {
			var assets = this.assets;

			if(assets[path]!==undefined){
				resolve(assets[path]);
			}

			var split = path.split("!");
			var url, loader;

			if(split.length == 1){
				url = split[0];
				loader = this.loaders.default;
			}else{
				url = split[1];
				loader = this.loaders[split[0]];
			}

			if(!loader) {
				console.error(`Failed To Find Specified Loader`);
			}

			loader(url).then((asset)=>{
				this.assets[path] = asset;
				resolve(asset);
			} , reject);

		})
	}

	load(urls) {
		var get = (url) => this.get(url);
		return Promise.all(urls.map(get)).then((assets)=>{
			var data = {}
			for(var i = 0; i < assets.length;i++){
				var url = urls[i], asset = assets[i];
				data[url] = asset;
			}
			return data;
		})
	}
}


