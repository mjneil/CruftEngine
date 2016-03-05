import *  as http from "../http";

export default (url) => {
	return http.get(url).then((e)=>{
		return JSON.parse(e.target.responseText) ;
	}, (err)=> {
		return e;
	})
}