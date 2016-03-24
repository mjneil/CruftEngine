import transform3 from "../math/transform3";
import uuid from "../util/uuid";

export default class Object3D {
	
	constructor () {
		this.guid = uuid();
		this.transform = new transform3();
		this.children = [];
	}


	addChild(child) {
		if(this.children.indexOf(child) > -1) return;
		this.children.push(child);
		child.transform.parent = this;
	}
}