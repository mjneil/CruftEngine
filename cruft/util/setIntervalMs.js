export default (cb, ms) =>{
	var last = Date.now()//think about making some kind of engine timer thing so everything can be on the same clock :/
	var interval = setInterval(() => {
		var now = Date.now();
		var deltaMs = now - last;
		last = now;
		cb(now, deltaMs);
	}, ms);
	return interval;
}