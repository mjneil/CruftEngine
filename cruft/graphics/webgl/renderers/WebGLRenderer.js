
import WebGLProgram from "../WebGLProgram"
import WebGLGeometry from "../WebGLGeometry";
import WebGLState from "../WebGLState";
import Mesh from "../../objects/Mesh";
import mat4 from "../../../math/mat4"


import * as programs from "./programs";


export default class WebGLRenderer {

	constructor(options={}) {

		var canvas = this.canvas = options.canvas || document.createElement("canvas");
		var gl = this.gl = options.gl || canvas.getContext("webgl2", {antialias : true});
		var webglstate = this.webglstate = new WebGLState(gl);


		canvas.width = options.width || canvas.width;
		canvas.height = options.height || canvas.height;

		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);

		this.tmpMatrixA = new mat4();
		this.tmpMatrixB = new mat4();
		this.tmpMatrixC = new mat4();

		this.programs = {};
		this.geometries = {};
		this.materials = {};

		for(let programName in programs){
			this.programs[programName] = WebGLProgram.fromProgram(gl, programs[programName]);
		}

	}

	getGeometry( geometry ) {

		var _geometry = this.geometries[geometry.guid];

		if(_geometry) {
			return _geometry.fromGeometry(geometry);
		}else{
			return this.geometries[geometry.guid] = WebGLGeometry.fromGeometry(this.gl, geometry);
		}

	}

	getMaterial () { 
		return this.programs
	}


	render(scene, camera) {

		let queue = [scene], nodes = [];
		while(queue.length){
			let curr = queue.shift()
			curr.transform.update();
			nodes.push(curr);
			queue.push.apply(queue, curr.children);
		}

		camera.update();

		let gl = this.gl;

		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		for(let node of nodes){
			if(node instanceof Mesh) {

				let geometry = this.getGeometry(node.geometry);

				gl.bindVertexArray(geometry.vertexArray);
		
				for(let group of geometry.groups) {

					let material = node.material;

					let program = this.programs.def;

					this.webglstate.useProgram(program);
					
					mat4.multiplyDst(this.tmpMatrixA, camera.inverse, node.transform.toWorld);
					mat4.invertDst(this.tmpMatrixB, this.tmpMatrixA)
					this.tmpMatrixB.transpose();

					gl.uniformMatrix4fv(program.uniforms.pMatrix, gl.FALSE, camera.perspective.data);
					gl.uniformMatrix4fv(program.uniforms.mvMatrix, gl.FALSE, this.tmpMatrixA.data);
					gl.uniformMatrix4fv(program.uniforms.nMatrix, gl.FALSE, this.tmpMatrixB.data);

					material.apply(gl, program);
					gl.drawArrays(gl.TRIANGLES, group.start, group.end);
				}


			}
			
		}

	}
}
