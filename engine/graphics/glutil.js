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

var createTexture = (gl, type, image) => {
	var texture = gl.createTexture();
	gl.bindTexture(type, texture);
	gl.texImage2D(type, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //prob want 2 change these at some point aheh
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(type, null);
	return texture;
}

var createBufferWithData = (gl, type, data, usage) => {
	var buffer = gl.createBuffer();
	gl.bindBuffer(type, usage);
	gl.bufferData(type, data, usage);
	gl.bindBuffer(type, null);
	return buffer;
}

export {createShader, createProgram, createTexture, createBufferWithData}