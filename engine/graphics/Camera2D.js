import Actor from "engine/core/Actor";
import Renderer from "engine/graphics/Renderer"
import SpriteRenderer from "engine/graphics/plugins/SpriteRenderer";
import Transform2D from "engine/components/Transform2D";
import {vec2} from "engine/lib/gl-matrix";
import engine from "engine/Engine";
import Script from "engine/processes/Script";

export default class Camera2D extends Actor {//todo set/get widht//height
	constructor(width, height) {
		super();
		this._width = width;
		this._height = height;
		this._renderer = new Renderer(width, height);
		this._renderer.registerPlugin(new SpriteRenderer());
		document.body.appendChild(this._renderer.canvas);//not sure how want to manage access to the dom right now. so tmp here. 
		this.addComponent(new Transform2D()); //think about using a height variable or somthing? :/ Hmm idk. 
		this.getComponent("transform").scale = [width/2, height/2] //might want to make variables to like set zoom and stuff idk. 

	}

	render() {
		this._renderer.render(engine.scene, this);
	}

	mouseToWorld(mouse) { //takes mouse relative to canvas and spits out where it would be on this camera. 
		var out = vec2.create();
		out[0] = (mouse[0] - window.innerWidth/2);
		out[1] = (window.innerHeight - mouse[1] - window.innerHeight/2);
		return out;
	}

	update() {

	}
}