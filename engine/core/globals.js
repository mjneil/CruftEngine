import ProcessManager from "engine/core/ProcessManager";
import EventManager from "events";
import Cache from "engine/core/Cache"


var processManager = new ProcessManager();
var eventManager = new EventManager();
var cache = new Cache();

var getProcessManager = () => processManager;
var getEventManager = () => eventManager;
var getCache = () => cache;

export {getEventManager, getProcessManager, getCache};