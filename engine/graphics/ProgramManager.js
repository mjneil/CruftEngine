export default class ProgramManager {
	constructor(gl) {
		this.gl = gl;
		this.program = null;
	}

	use(program) {
		var gl = this.gl;
		var current = this.program;

		if(current!==null){
			for(let key in current.attributes){
				gl.disableVertexAttribArray(current.attributes[key]);
			}
		}

		
		gl.useProgram(program.program);

		for(let key in program.attributes) {
			gl.enableVertexAttribArray(program.attributes[key]);
		}
		
		this.program = program;
	}
}