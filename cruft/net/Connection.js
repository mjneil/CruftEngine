import Emitter from "../core/Emitter";

export default class Connection extends Emitter { //wrapper for peer connection. 
	constructor(connection) {
		super();

		this.connection = connection;

		this.connection.on("data", (data) => {
			this.emit("data", data);
			this.emit(data.event, data);//for now assume its always json
		})

		this.on("ping_request", () => {
			this.connection.send({
				event : "ping_response",
				timestamp : Date.now()
			})
		})
	}



	send(data) {
		this.connection.send(data);
	}

	//assume no other ping_requests durring this time :I
	ping() { //tfw no timeout. Lol. Prob should do that cause if connection drops infinite hang. RIP. 
		return new Promise((resolve, reject) => {
			var timeout = 10000//TODO make reject if ping hasnt been answered by then. 
			this.connection.send({
				event : "ping_request"
			});

			this.once("ping_response", (message) => {
				resolve(message);
			})
		})
		
	}

	latency() {
		//calculate da latency :O :O
		return new Promise((resolve, reject) => {
			//for now do 1 RTT. DO a bunch of averages for a real test. 
			var last = Date.now();
			this.ping().then((data) => {
				var now = Date.now();
				var latency = now - last;
				resolve({timestamp : data.timestamp, latency : latency});
			})

		})
	} 


}

