

//maybe make this a class
var randomRange = (begin, end) => {
	return (Math.random() * (end - begin)) + begin;
}


export{randomRange}