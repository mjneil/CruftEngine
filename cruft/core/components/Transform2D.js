import Transform from "./Transform"
import {vec2, mat3} from "../../math/math";


var IDENTITY_MATRIX = new mat3();

export default class Transform2D extends Transform {
	constructor() {
		super();

		this._position = vec2.zero();
		this._scale = new vec2(1,1);
		this._rotation = 0;

		this.toWorld = new mat3();
		this.matrix = new mat3();
		this.inverse = new mat3();
	}

	initialize() {
		this.updateMatrix();
	}

	get position () {
		return this._position.clone();
	}

	//right now this is kinda expensive. So like dont do it unless you need to :/
	set position (position) {
		this._position.copy(position);
		this.updateMatrix();
	}

	get rotation () {
		return this._rotation;
	}

	set rotation (rotation) {
		this._rotation = rotation;
		this.updateMatrix();
	}

	getWorldPosition() {
		return new vec2(this.toWorld.data[6], this.toWorld.data[7]);
	}

	setDirection(vec) {
		var tmp = vec.clone();
		var len = tmp.length();
		if (len == 0) {
			this.rotation = 0;
		} else {
			tmp.scale(1/len);
			var theta = Math.acos(tmp.x);
			if (vec.y < 0) {
				theta *= -1;
			}
			this.rotation = theta;
		}
	}

	get scale() {
		return this._scale.clone();
	}

	set scale(scale) {
		this._scale.copy(scale);
		this.updateMatrix();
	}

	updateMatrix() { //possibly also keep track of inverse matrix? of both toWorld and local ? Useful for camera class.
		//also setting matrix then adding to actor = not live toWorld matrix. :^)
		var actor = this.actor;
		var parent = actor.parent;
		var toWorld = this.toWorld;
		var matrix = this.matrix;
		var _position = this._position;
		var _rotation = this._rotation;

		matrix.identity()
			  .scale(this._scale)
			  .rotate(this._rotation);

		matrix.data[6] = this._position.x;
		matrix.data[7] = this._position.y;

		this.inverse.copy(matrix).invert();
		//TODO z-index? What are we doing with that exactly. 
		if (parent) {
			toWorld.copy(mat3.multiply(parent.getComponent("transform").toWorld, matrix));
		} else {
			toWorld.copy(matrix);
		}
		
		actor.emit("transform:change");

		var children = this.actor.children;
		for (let key in children) {
			children[key].getComponent("transform").updateMatrix();
		}
	}

}