import * as glutil from "./util"

export default class Program {
	constructor(gl, vSrc, fSrc, config) {
		this.gl = gl;
		this.program = glutil.createProgram(gl, vSrc, fSrc);
		this.attributes = {};
		this.uniforms = {};


		var attributes = config.attributes || [];
		var uniforms = config.uniforms || [];

		for(let attrib of attributes) {
			this.attributes[attrib] =  gl.getAttribLocation(this.program, attrib) ;
		}

		for(let uniform of uniforms) {
			this.uniforms[uniform] = gl.getUniformLocation(this.program, uniform);
		}
	}
}