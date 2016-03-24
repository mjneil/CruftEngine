import uuid from "../util/uuid"
import vec3 from "../math/vec3"

export default class Geometry {
	
	constructor() {

		this.guid = uuid();
		this.version = 0;

		this.vertices = [];
		this.vertexNormals = [];
		this.uvs = [];
		this.faces = [];
	}


	computeFaceNormals() {

		let vertices = this.vertices;
		for(let face of this.faces){
			let a = vertices[face.indices[0]],
				b = vertices[face.indices[1]],
				c = vertices[face.indices[2]]

			let ab = vec3.sub(b, a);
			let bc = vec3.sub(c, b);

			face.normal = ab.cross(bc).normalize();

		}
	}

	computeVertexNormals() {

	}

	needsUpdate(val) {
		if(val) this.version++;
	}
}
