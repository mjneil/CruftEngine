import Loader from "../Loader";
import *  as http from "../http";
export default class JsonLoader extends Loader {

	constructor(){
		super();
	}

	load(url) {
		return http.get(url).then((e)=>{
			return JSON.parse(e.target.responseText) ;
		}, (err)=> {
			return e;
		})
	}
}
