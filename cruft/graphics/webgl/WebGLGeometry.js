export default class WebGLGeometry { //if vn + p then can do index rendering. but how do know./ 
	
	constructor(gl) {

		this.gl = gl;
		this.version = null;
		this.buffers = {};

		this.groups = [];
		this.vertices = null;
		this.vertexNormals = null;
		this.faceNormals = null;
		this.uvs = null;

	}

	static fromGeometry(gl, geometry) {
		return (new WebGLGeometry(gl)).fromGeometry(geometry);
	}

	fromGeometry(geometry) {

		if(geometry.version == this.version) return this;
		this.version = geometry.version;

		let groups = [];

		for(let face of geometry.faces) {

			let materialIndex = face.materialIndex;
			let faceNormal = face.normal;

			let group = groups[materialIndex] || (groups[materialIndex] = { vertices : [], faceNormals : [], vertexNormals : [], uvs : [] });

			for(let i of face.indices){
				var vertex = geometry.vertices[i];
				var vertexNormal = geometry.vertexNormals[i];
				var uv = geometry.uvs[i];
				if(vertex) group.vertices.push(vertex.x, vertex.y, vertex.z);
				if(vertexNormal) group.vertexNormals.push(vertexNormal.x, vertexNormal.y, vertexNormal.z);
				if(faceNormal) group.faceNormals.push(faceNormal.x, faceNormal.y, faceNormal.z);
				if(uv) group.uvs.push(uv.x, uv.y);
			}
		}
	

		
		let vertices = [];
		let faceNormals = [];
		let vertexNormals = [];
		let uvs = []

		this.groups = [];
		for(let group of groups) {

			this.groups.push({
				start : vertices.length/3,
				end : vertices.length/3 + group.vertices.length/3
			})

			vertices.push.apply(vertices, group.vertices);
			vertexNormals.push.apply(vertexNormals, group.vertexNormals);
			faceNormals.push.apply(faceNormals, group.faceNormals);
			uvs.push.apply(uvs, group.uvs);
		}

		this.vertices = new Float32Array(vertices);
		this.vertexNormals = (vertexNormals.length)? new Float32Array(vertexNormals) : null;
		this.faceNormals = (faceNormals.length)? new Float32Array(faceNormals) : null;
		this.uvs = (uvs.length)? new Float32Array(uvs) : null;


		var gl = this.gl;

		if(!this.vertexArray) {
			this.vertexArray = gl.createVertexArray();
			gl.bindVertexArray(this.vertexArray);
		}

		if(this.vertices) {
			if(!this.buffers.vertices) this.buffers.vertices = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertices);
			gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
			gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
		}

		if(this.vertexNormals) {
			if(!this.buffers.vertexNormals) this.buffers.vertexNormals = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexNormals);
			gl.bufferData(gl.ARRAY_BUFFER, this.vertexNormals, gl.STATIC_DRAW);
			gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
		}

		if(this.faceNormals) {
			if(!this.buffers.faceNormals) this.buffers.faceNormals = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.faceNormals);
			gl.bufferData(gl.ARRAY_BUFFER, this.faceNormals, gl.STATIC_DRAW);
			gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
		}

		if(this.uvs) {
			if(!this.buffers.uvs) this.buffers.uvs = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.uvs);
			gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
			gl.vertexAttribPointer(3, 2, gl.FLOAT, false, 0, 0);
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
		
		return this;
	}


}