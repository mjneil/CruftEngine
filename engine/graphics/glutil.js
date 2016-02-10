var createShader = (gl, type, src) => {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		console.log(gl.getShaderInfoLog(shader));
		return null;//or somthing else?
	}
	return shader
}

var createProgram = (gl, vSrc, fSrc) => {
	var program = gl.createProgram();
	gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vSrc));
	gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fSrc));
	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.log("FAILED TO COMPILE SHADER");
		return null;
	}
	return program;
}

var createTexture = () => {

}

var createBufferWithData = (gl, type, data, usage) => {
	var buffer = gl.createBuffer();
	gl.bindBuffer(type, usage);
	gl.bufferData(type, data, usage);
	gl.bindBuffer(type, null);
	return buffer;
}

export {createShader, createProgram, createTexture, createBufferWithData}