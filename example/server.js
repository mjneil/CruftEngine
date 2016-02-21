import initialize from "./js/server/initialize";
import engine from "engine/engine"

initialize();

var main = () => {
	console.info("Cruft Running");
}

engine.running.then(main)



//#DEBUG / TEST. #IMPORTANT
window.engine = engine;
window.kill = function () { engine.scheduler.kill(); }
window.onbeforeonload = function () {
	engine.network.peer.destroy();
}