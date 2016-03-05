import Process from "./Process";
import {UNINITIALIZED, RUNNING, FAILED, SUCCEEDED} from "./Process";//can you import default and named at same time?

export default class Scheduler {
	constructor(){
		this.processes = [];
		this.interval = null;
	}

	addChild(proc) {
		this.processes.push(proc);
	}

	update(now, deltaMs){
		var add = [];

		var needCull = false;

		for(let proc of this.processes) {
			if(proc.state === UNINITIALIZED){
				proc.initialize(now);
			}

			if(proc.state === RUNNING){
				proc.update(now, deltaMs);
			}

			if(proc.state === SUCCEEDED){
				needCull = true;
				add.push(...proc.children);
			}

			if(proc.state === FAILED){
				needCull = true;
			}
		}
		if(needCull) {
			this.processes = this.processes.filter((proc)=>{
				return proc.state != FAILED && proc.state != SUCCEEDED;
			});
		}
		

		if(add.length){
			this.processes.push(...add);
		}
		


	}
}