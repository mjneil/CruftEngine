import Component from "./Component.js";

var IDENTITY_MATRIX = mat3.create();
	mat3.identity(IDENTITY_MATRIX)//DO NOT CHANGE THIS.

export default class Transform2D extends Component {
	constructor() {
		super("transform");

		this._position = vec2.create();
		this._rotation = 0;

		this.toWorld = mat3.create();
		this.matrix = mat3.create();
		mat3.identity(this.toWorld);
		mat3.identity(this.matrix);
	}

	get position () {
		return vec2.clone(this._position);
	}

	//right now this is kinda expensive. So like dont do it unless you need to :/
	set position (position) {
		vec2.copy(this._position, position);
		this.updateMatrix();
		eventManager.emit("transform:move", this.actor);
	}

	get rotation () {
		return this._rotation;
	}

	set rotation (rotation) {
		this._rotation = rotation;
		this.updateMatrix();
		eventManager.emit("transform:rotate", this.actor);
	}

	updateMatrix() {
		var actor = this.actor;
		var parent = this.parent;
		var toWorld = this.toWorld;
		var matrix = this.matrix;
		var _position = this._position;
		var _rotation = this._rotation;

		//optimize this later
		mat3.rotate(matrix, IDENTITY_MATRIX, this._rotation);
		matrix[6] = _position[0];
		matrix[7] = _position[1];
		//TODO z-index? What are we doing with that exactly. 

		if(parent) {
			mat4.mul(toWorld, parent.getComponent("transform").toWorld, matrix);
		}else{
			mat3.copy(toWorld, matrix);
		}

		for(let child of this.actor.children){
			child.updateMatrix();
		}
	}
}