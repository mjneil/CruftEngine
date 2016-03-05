import Program from "./Program"
import ProgramManager from "./ProgramManager"



export default class Renderer {//todo pass in options for what to enable/disable.
	constructor({canvas}) {

		this.canvas = canvas;

		this.plugins = {};

		var gl = this.gl = this.canvas.getContext("webgl", { preserveDrawingBuffer : true });
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.clearColor(0, 0, 0, 1);
			gl.disable(gl.DEPTH_TEST)
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


		this.programManager = new ProgramManager(gl);
	}

	register(plugin) {
		plugin.initialize(this.gl);
		this.plugins[plugin.type] = plugin;
	}

	render(scene, camera) { //ignore camera matrix for now :/
		var gl = this.gl;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		this._render(scene, camera);

	}

	_render(actor, camera) {
	

		var renderable = actor.getComponent("renderable");

		if(renderable){
			var plugin = this.plugins[renderable.renderType];//TODO renderType on anything you call render on :/ RIP.
			if(!plugin) {
				console.log("FATAL : ATTEMPING TO RENDER AN UNSUPPORTED RENDER COMPONENT")
				return;
			}
			plugin.preRender();
			plugin.render(this, renderable, camera);
			plugin.postRender();

		}


		for(let id in actor.children) {
			this._render(actor.children[id], camera);
		}

	}
}