

var request = (type, url, progress, data) => {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("progress", progress);
		xhr.addEventListener("load", resolve);
		xhr.addEventListener("error", reject);
		xhr.open(type, url);
		xhr.send(data);
	})
}

var get = (url, async, progress) => {
	return request("GET", url, progress, null);
}
var post = (url, async, progress, data) => {
	return request("POST", url, progress, data);
}

export {get, post, request};