import Loader from "../Loader";
import *  as http from "../http";

export default class TextLoader extends Loader {
	
	constructor(){
		super();
	}

	load(url) {
		return http.get(url).then((e) =>{
			return e.target.responseText;
		}, (err) => {
			return err
		})
	}
}