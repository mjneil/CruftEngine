const UNINITIALIZED = 0x1;
const RUNNING = 0x2;
const SUCCEEDED = 0x3;
const FAILED = 0x4;

export default class Process {
	constructor(){
		this.state = UNINITIALIZED;
		this.children = [];
	}

	initialize(){
		this.state = RUNNING;
	}

	succeed(){
		this.state = SUCCEEDED;
	}

	fail(){
		this.state = FAILED;
	}

	addChild(child) {
		this.children.push(child);
	}

	update(now, deltaMs){
		
	}
}

export {UNINITIALIZED, RUNNING, SUCCEEDED, FAILED}