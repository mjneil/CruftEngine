export default class WebGLState {

	constructor(gl) {
		this.gl = gl;
		this.activeProgram = null;
	}

	useProgram(program) {
		let gl = this.gl;

		var current = this.activeProgram
		if(current && current !== program) current.disable();

		this.activeProgram = program;
		program.enable();
	};

}