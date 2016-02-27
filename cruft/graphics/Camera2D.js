import Actor from "../core/Actor";
import Renderer from "./Renderer"
import SpriteRenderer from "./renderers/SpriteRenderer";
import Transform2D from "../components/Transform2D";
import {vec2} from "../lib/gl-matrix";
import engine, {scheduler} from "../engine";
import Script from "../processes/Script";

export default class Camera2D extends Actor {//todo set/get widht//height
	constructor(width, height) {
		super();

		this._width = width;
		this._height = height;
		this._renderer = new Renderer(width, height);

		this._renderer.register(new SpriteRenderer());
		document.body.appendChild(this._renderer.canvas);//not sure how want to manage access to the dom

		this.addComponent(new Transform2D()); //think about using a height variable or somthing? :/ Hmm idk. 
		this.getComponent("Transform2D").scale = [width/2, height/2] //might want to make variables to like set zoom and stuff idk. 

		//todo track that script so we can delete it. 
		//also its not in update because I want it to be the last thing that happens
		////@matt neill plz help with this. Iddk how 2 do
		scheduler.addChild(new Script(()=>{//tmp here for now
			this.render();
		}))

		//just throw random stuff in here.
		this.target = null;

	}

	render() {
		this._renderer.render(engine.scene, this);
	}

	mouseToWorld(mouse) { //takes mouse relative to canvas and spits out where it would be on this camera. 

		//cheat and dont use camera rotation * DOESN"T WORK IF YOU ROTATE CAMERA*
		var transform = this.getComponent("Transform2D");
		var position = transform.position;
		var scale = transform.scale;

		var tmp = vec2.create();
		tmp[0] = (mouse[0] - window.innerWidth/2);
		tmp[1] = (window.innerHeight - mouse[1] - window.innerHeight/2);

		tmp[0] += position[0];
		tmp[1] += position[1];

		return tmp;
	}

	update(deltaMs) {
		
		if(this.target && this.target.get()){
			var target = this.target.get();
			var transform = this.getComponent("Transform2D");
			var world = target.getComponent("Transform2D").getWorldPosition();
			var selfWorld = transform.getWorldPosition();
			var dif = vec2.create();
			vec2.sub(dif, world, selfWorld);
			var len = vec2.len(dif);
			var scale = (len < 900)? .002:.05;
			vec2.scale(dif, dif, .07);

			var pos = transform.position;
			vec2.add(pos, pos, dif);
			transform.position = pos;


		}
	}
}