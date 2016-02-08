//first pass at a 2d renderer .


export default class Renderer2D {
	constructor(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.globs = {};
		var gl = this.gl = this.canvas.getContext("2d");
			gl.viewport(0, 0, width, height);
			gl.clearColor(0, 0, 0, 1);
			gl.disable(gl.DEPTH_TEST)
	}


	render(scene, camera) {
		//lookup the scene 
	}
}