import Object3D from "../Object3D";
import mat4 from "../../math/mat4"

export default class Camera extends Object3D { //for now only perspective
	constructor(perspective) {
		super();
		this.perspective = perspective;
		this.inverse = new mat4();
	}

	update() {
		mat4.invertDst(this.inverse, this.transform.toWorld);
	}
}