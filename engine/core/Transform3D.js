import Component from "./Component.js";


export default class Transform3D extends Component {
	constructor() {
		super("transform");

		this._position = vec3.create();
		this._rotation = vec3.create();

		this.toWorld = mat4.create();
		mat4.identity(this.toWorld);
	}

	get position () {
		return vec3.clone(this._position);
	}

	set position (position) {
		this._position = position;//COPY THIS
		this.updateMatrix();
		eventManager.emit("transform:move", this.actor);
	}

	get rotation () {
		return vec3.clone(this._rotation);
	}

	set rotation (rotation) {
		this._rotation = rotation;
		this.updateMatrix();
		eventManager.emit("transform:rotate", this.actor);
	}

	updateMatrix() {
		//set matrix according to values in rotation/position;
		//TODO assume this works fine.
		for(let child of this.actor.children){
			child.updateMatrix();
		}
	}
}