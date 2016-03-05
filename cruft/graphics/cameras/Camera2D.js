import Camera from "../Camera";
import Transform2D from "../../core/components/Transform2D";
import {vec2} from "../../math/math";

//technically this should maybe be a component? Gah ask matt. 

export default class Camera2D extends Camera {

	constructor(width, height) {
		super();

		this.width = width;
		this.height = height;

		this.addComponent(new Transform2D());
		this.getComponent("transform").scale = new vec2(width/2, height/2) 
	}

	mouseToWorld(mouse) {

		var transform = this.getComponent("transform");
		var position = transform.position;
		var scale = transform.scale;

		var tmp = new vec2( mouse.x * this.width/2, mouse.y * this.height/2 );
		tmp.add(position);

		return tmp;
	}

}