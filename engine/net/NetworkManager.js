import EventEmitter from "events"
import Session from "./Session"
//this is for da servvvvveeeerr. 
//var session = NetworkManager.getSession("default");
//var sessions = NetworkManager.sessions 
export default class NetworkManager extends EventEmitter {
	constructor(name, key) {
		super();
		this.peerId = null;
		this.peer = new Peer(name, { key });
		this.sessions = {};

		var builder = {};
		
		this.peer.on("open", (id) => {
			console.log("PEERJS ID : " + id );
			this.peerId = id;
			this.emit("open", id);
		})

		//try to build sessions 
		this.peer.on("connection", (conn) => {
			var peer = conn.peer;
			if(!builder[peer]) builder[peer] = {};
			var built = builder[peer];
			conn.once("data", (data) => {
				built[data.connectionType] = conn;
				if(built.reliable && built.unreliable){
					this.addSession(new Session( peer, built.reliable, built.unreliable ));
					this.emit("connection", session);
				}
			})

			conn.on("close", () => {
				var session = this.sessions[peer];
				delete this.sessions[peer];
				if(session) {
					session.reliable.close();
					session.unreliable.close();
					this.emit("close", session);
				}
			})
		})


	}
	addSession(session) {
		this.sessions[session.peer] = session;
	}

	//temp util functions
	sendReliable(data) {
		for(var key in this.sessions){
			this.sessions[key].reliable.send(data);
		}
	}

	sendUnreliable(data) {
		for(var key in this.sessions){
			this.sessions[key].unreliable.send(data);
		}
	}

	createSession(name) { //we need some kind of timeout for this stuff. It will just hang forever if it fails. TODO failing
		return new Promise((resolve, reject) => {
			var peer = this.peer;
			var reliable = peer.connect(name, {reliable : true, ordered : true});
			var unreliable = peer.connect(name, {reliable : false, ordered : false});

		
			var loaded = 0;
			var tryResolve = () => {
				loaded++;
				if(loaded == 2){
					this.addSession(new Session( peer, built.reliable, built.unreliable ));
					resolve(session)
				}
			}

			var fail = (err) => {
				reject(err);
			}

			reliable.once("open", () => {
				reliable.send({connectionType:"reliable"});
				tryResolve();
			});

			unreliable.once("open", () => {
				unreliable.send({connectionType:"unreliable"});
				tryResolve();
			});

			reliable.once("err", fail);
			unreliable.once("error", fail);
		})
	}


}

//NetworkManager 