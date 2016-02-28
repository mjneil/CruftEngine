import Emitter from "../core/Emitter";

export default class Connection extends Emitter { //wrapper for peer connection. 
	constructor(connection) {
		super();

		this.connection = connection;

		this.connection.on("data", (e) => {
			this.emit(e.event, e.data);//for now assume its always json
			this.emit("data", e);
		})

		this.on("ping_request", () => {
			this.emit("ping_response");
		})
	}

	emit(event, data) {
		this.connection.send({event, data});
	}

	ping() { //never have more than one pending ping. 
		return new Promise((resolve, reject) => {
			var timeout = 10000//TODO make reject if ping hasnt been answered by then. 
			var resolved = false;
			this.emit("ping_request");
			this.once("ping_response", resolve);
			setTimeout(() => {
				if(!resolved) reject();
			}, 5000)
		})
		
	}

	latency() {
		return new Promise((resolve, reject) => {
			var last = Date.now();
			this.ping().then((data) => {
				var now = Date.now();
				resolve(now - last);
			}, reject);

		})
	}

	destroy() {
		this.connection.close();
		this.connection = null;
	}


}

