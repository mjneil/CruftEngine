import setIntervalMs from "./setIntervalMs";

export default class ProcessManager {
	constructor(){
		this.processes = [];
		this.interval = null;
	}

	addChild(proc) {
		this.processes.push(proc);
	}

	start(delay) {
		if(this.interval) return;

		this.interval = setIntervalMs((now, deltaMs)=>{
			this.update(now, deltaMs);//maybe pass now?
		}, delay)
	}

	kill() {
		clearInterval(this.interval);
		this.interval = null;
	}

	update(now, deltaMs){
		for(let proc of this.processes){
			if(proc.state === "UNINITIALIZED"){
				proc.initialize();
			}

			if(proc.state === "RUNNING"){
				proc.update(now, deltaMs);
			}

			if(proc.state === "SUCCEEDED"){
				proc.succeed();
				this.processes.push(...this.children);
			}
		}
	}
}