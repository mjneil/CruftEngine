import Emitter from "../core/Emitter";

export default class Session extends Emitter {
	constructor(key, reliable, unreliable) {
		super();
		this.key = key;
		this.reliable = reliable;
		this.unreliable = unreliable;

		this.reliable.on("data", (data) => {
			this.emit("data", data);
		})

		this.unreliable.on("data", (data) => {
			this.emit("data", data);
		})
	}

	emitReliable(event, data) {
		var packet = {
			event : event,
			timestamp : Date.now(),
			data : data
		}
		this.reliable.send(packet);
	}
}