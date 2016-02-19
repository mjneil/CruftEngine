import Component from "engine/core/Component";
import engine from "engine/Engine"

export default class Synchronizer extends Component {
	constructor() {
		super("syncronizer");
		this.mode = null
		this.syncs = new WeakMap();
		this.events = [];//for now send in 2 batches just cause it's easier. 
		this.unreliable = [];
		this.reliable = [];
		//TODO.
	}


	setMode(mode) {
		if(mode === "source") this.setModeSource();
		if(mode === "copy") this.setModeCopy();
	}

	setModeSource() {
		this.mode = "source";

		engine.network.on("connection", (session) => {
			session.emitReliable("sync:initialize", this.createFullState());
		});

		engine.network.on("sync:events")
		engine.network.on("sync:messages", (e) => {//TODO make sure clients can only send messages to actors that they own.
			var packet = e.data;
			var messages = e.data;
			for(let p of messages){
				var sync = this.syncs[p.id];
				if(sync) sync.message(p.message);
			}
		})

		engine.on("sync:register", (sync) => {
			this.syncs.put(sync.id, sync);
		});

		engine.on("sync:reliable", (sync, message) => {
			this.reliable.push({
				id : sync.actor.id,
				message : message
			});
		})

		engine.on("sync:unreliable", (sync, message) => {
			this.unreliable.push({
				id : sync.actor.id,
				message : message
			});
		})

	}

	setModeCopy() {
		this.mode = "copy";
	}
}