import Actor from "./Actor";
import Transform2D from "./Transform2D";

export default class Actor2D extends Actor {
	constructor() {
		super();
		this.addComponent(new Transform2D());
	}
}