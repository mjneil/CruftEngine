import *  as http from "../http";

export default (url) => {
	return http.get(url).then((e) =>{
		return e.target.responseText;
	}, (err) => {
		return err
	})
}
