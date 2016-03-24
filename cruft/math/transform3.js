import vec3 from "./vec3";
import mat4 from "./mat4";
import quat from "./quat"
export default class transform3 {

	constructor() {

		this.position = new vec3(0, 0, 0);
		this.rotation = new quat(0, 0, 0, 1);
		this.scale = new vec3(1, 1, 1);


		this.toWorld = new mat4();
		this.local = new mat4();
		this.parent = null;
	}

	update() {
		//TODO
		//set matrix
		this.toWorld.fromRotationTranslationScale(this.rotation, this.position, this.scale);

		if(this.parent) {
			//update parent
		}
	}
}