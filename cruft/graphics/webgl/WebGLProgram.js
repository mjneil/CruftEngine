import * as glutil from "./util"

export default class WebGLProgram {

	constructor(gl, vertexSource, fragmentSource, options={}) {

		this.gl = gl;
		this.vertexSource = vertexSource;
		this.fragmentSource = fragmentSource;
		this.program = glutil.createProgram(gl, vertexSource, fragmentSource, options.attributes);

		this.attributes = {};
		this.uniforms = {};

		var attributes = options.attributes || [];
		var uniforms = options.uniforms || [];

		for(let attrib in attributes) {
			this.attributes[attrib] =  gl.getAttribLocation(this.program, attrib) ;
		}

		for(let uniform of uniforms) {
			this.uniforms[uniform] = gl.getUniformLocation(this.program, uniform);
		}
	}

	static fromProgram(gl, program) {
		return new WebGLProgram(gl, program.vertexSource, program.fragmentSource,  program);;
	}

	enable() {

		var gl = this.gl;

		gl.useProgram(this.program);

		for(let key in this.attributes) {
			gl.enableVertexAttribArray(this.attributes[key]);
		}
		
	}

	disable() {

		var gl = this.gl;

		for(let key in this.attributes){
			gl.disableVertexAttribArray(this.attributes[key]);
		}

	}
}




