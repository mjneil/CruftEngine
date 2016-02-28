import Emitter from "../core/Emitter";
import Session from "./Session";
import Connection from "./Connection";

export default class Network extends Emitter {

	constructor(name, key) {
		super();
		this.id = null;
		this.peer = null;
		this.sessions = null;
	}

	initialize(id, options) {//@TODO someway to detect if it failed. 
		this.id = null;
		this.peer = new Peer(id, options);
		this.sessions = {};

		this.peer.on("open", (id) => {
			this.id = id;
			console.info(`PeerJS id : ${id}`)
		});

		var builder = {};

		this.peer.on("connection", (conn) => {

			var peerId = conn.peer;
			if(!builder[peerId]) builder[peerId] = {};
			var built = builder[peerId];

			conn.once("data", (type) => {
				built[type] = conn; //maybe not alow them to do that cause they can prob do spooky setter/getter mod
				if(built.reliable && built.unreliable){
					var session = new Session( peerId, new Connection(built.reliable), new Connection(built.unreliable) );
					delete builder[peerId];
					this.addSession(session);
					this.emit("connection", session);
				}

			})

			conn.on("close", () => {
				if(builder[peerId]){
					if(built.reliable) built.reliable.destroy();
					if(built.unreliable) built.unreliable.destroy();
				}else{
					this.removeSession(this.sessions[peerId]);
				}	
			})
		})

		return new Promise((resolve, reject) => {
			this.peer.on("open", resolve);//@TODO reject
		})
	}


	addSession(session) {
		this.sessions[session.peer] = session;
	}

	removeSession(session) {
		session.destroy();
		delete this.sessions[session.peer];
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
					var session = new Session( name, reliable, unreliable )
					this.addSession(session);
					resolve(session)
				}
			}

			var fail = (err) => {
				reject(err);
			}

			reliable.once("open", () => {
				reliable.send("reliable");
				tryResolve();
			});

			unreliable.once("open", () => {
				unreliable.send("unreliable");
				tryResolve();
			});

			reliable.once("err", fail);
			unreliable.once("error", fail);
		})
	}

	emit(event, data) {
		var sessions = this.sessions;

		for(var peer in sessions){
			sessions[peer].emit(event, data);
		}
	}


}