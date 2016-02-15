import EventEmitter from "events";
export default class Session extends EventEmitter {
	constructor(key, reliable, unreliable) {
		super();
		this.key = key;
		this.reliable = reliable;
		this.unreliable = unreliable;

		this.reliable.on("data", (data) => {
			this.emit("data", data);
			this.emit(data.event, data);
		})

		this.unreliable.on("data", (data) => {
			this.emit("data", data);
			this.emit(data.event, data);
		})
	}
}