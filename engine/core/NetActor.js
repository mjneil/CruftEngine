import Actor from "./Actor"

export default class NetActor extends Actor {
	constructor(id, owner) {
		super(id);
		this.owner = owner;
	}
}