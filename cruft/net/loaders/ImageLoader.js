import Loader from "../Loader";

export default class ImageLoader extends Loader {

	constructor(){
		super();
	}

	load(url) {
		return new Promise( (resolve, reject) => {
			var image = new Image();
				image.addEventListener("load", ()=>{
					resolve(image);
				});
				image.addEventListener("error", reject);
				image.src = url;
		})
	}
}