export default class Async {
	constructor() {
		this.loaded = false;
		this.urls = [];
		this.assets = null;
	}

	load() {
		return cache.getAll(this.urls).then((assets) => {
			this.assets = assets;
			this.loaded = true;
			return assets;
		}, (err) => {
			return err;
		})
	}
}