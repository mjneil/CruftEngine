import NetActor from "engine/core/NetActor"
import Transform2D from "engine/core/Transform2D";
import uuid from "engine/lib/uuid";
import PlayerComponent from "./PlayerComponent";

var Player = (owner) => {
	var actor = new NetActor("server-" + uuid.create().toString(), owner);
		actor.addComponent(new Transform2D());
		actor.addComponent(new PlayerComponent());
	return actor;
}


export {Player}