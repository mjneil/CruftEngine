/*
var STATES = {
	UNINITIALIZED : 0,
	RUNNING : 1,
	SUCCEDED : 2,
	FAILED : 3
}*/

export default class Process {
	constructor(){
		this.state = "UNINITIALIZED";
		this.children = [];
	}

	initialize(){
		this.state = "RUNNING";
	}

	succeed(){
		this.state = "SUCCEDED";
	}

	succeed(){
		this.state = "FAILED";
	}

	addChild(child) {
		this.children.push(child);
	}

	update(deltaMs){
		
	}
}

export {states}