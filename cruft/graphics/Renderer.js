import Program from "./Program"
import ProgramManager from "./ProgramManager"



export default class Renderer {//todo pass in options for what to enable/disable.
	constructor(width, height) {
		this.canvas = document.createElement("canvas" , {preserveDrawingBuffer:true});
		this.canvas.width = width;
		this.canvas.height = height;
		this.plugins = {};

		var gl = this.gl = this.canvas.getContext("webgl");
			gl.viewport(0, 0, width, height);
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
	

		var render = actor.getComponent("Render");

		if(render){
			var plugin = this.plugins[render.renderable.constructor];//TODO renderType on anything you call render on :/ RIP.
			if(!plugin) {
				console.log("FATAL : ATTEMPING TO RENDER AN UNSUPPORTED RENDER COMPONENT")
				return;
			}

			plugin.preRender();
			plugin.render(this, render, camera);
			plugin.postRender();

		}


		for(let id in actor.children) {
			this._render(actor.children[id], camera);
		}

	}
}