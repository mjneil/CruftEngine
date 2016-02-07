import Actor from "./Actor";
import Transform3D from "./Transform3D";

export default class Actor3D extends Actor {
	constructor() {
		super();
		this.addComponent(new Transform3D());
	}
}