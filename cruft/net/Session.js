import Emitter from "../core/Emitter";

export default class Session extends Emitter {

	constructor(peer, reliable, unreliable) {
		super();

		this.peer = peer;

		this.reliable = reliable;
		this.unreliable = unreliable;

		this.reliable.on("data", (e) => {
			this.emit(e.event, e.data);
		});

		this.unreliable.on("data", (e) => {
			this.emit(e.event, e.data);
		});
	}

	destroy() {
		this.reliable.destroy();
		this.unreliable.destroy();
		this.reliable = null;
		this.unreliable = null;
	}

}

