export default class ProcessManager {
	constructor(){
		this.processes = [];
	}

	addChild(proc) {
		this.processes.push(proc);
	}

	update(deltaMs){
		for(let proc of this.processes){
			if(proc.state === "UNINITIALIZED"){
				proc.initialize();
			}

			if(proc.state === "RUNNING"){
				proc.update(deltaMs);
			}

			if(proc.state === "SUCCEEDED"){
				proc.succeed();
				this.processes.push(...this.children);
			}
		}
	}
}