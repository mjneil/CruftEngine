import Actor from "../core/Actor";
import Renderer from "./Renderer"
import SpriteRenderer from "./renderers/SpriteRenderer";
import Transform2D from "../core/components/Transform2D";
import {vec2} from "../math/math";
import engine, {scheduler} from "../engine";
import Script from "../core/processes/Script";


export default class Camera2D extends Actor {//todo set/get widht//height
	constructor(width, height) {
		super();

		this._width = width;
		this._height = height;
		this._renderer = new Renderer(width, height);

		this._renderer.register(new SpriteRenderer());
		document.body.appendChild(this._renderer.canvas);//not sure how want to manage access to the dom

		this.addComponent(new Transform2D()); //think about using a height variable or somthing? :/ Hmm idk. 
		this.getComponent("transform").scale = new vec2(width/2, height/2) //might want to make variables to like set zoom and stuff idk. 

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
		var transform = this.getComponent("transform");
		var position = transform.position;
		var scale = transform.scale;

		var tmp = vec2.zero();
		tmp.x = (mouse.x - window.innerWidth/2);
		tmp.y = (window.innerHeight - mouse.y - window.innerHeight/2);

		tmp.add(position);

		return tmp;
	}

	update(deltaMs) {
		
		if(this.target && this.target.get()){
			var target = this.target.get();
			var transform = this.getComponent("transform");
			var world = target.getComponent("transform").getWorldPosition();
			var selfWorld = transform.getWorldPosition();
			var dif = vec2.subtract(world, selfWorld);
			var len = dif.length();
			var scale = (len < 900) ? 0.002 : 0.05;
			dif.scale(0.07);

			var pos = transform.position;
			pos.add(dif)
			transform.position = pos;


		}
	}
}