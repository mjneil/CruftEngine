
export default class Geometry {

	constructor() {
		this.vertices = null;
		this.normals = null;
		this.texCoords = null;
		this.groups = null;
		this.version = 0;
	}

	static create({vertices, texCoords, normals, groups}) {
		var geometry = new Geometry();

		geometry.vertices = vertices;
		geometry.normals = normals;
		geometry.texCoords = texCoords;
		geometry.groups = groups;

		geometry.needsUpdate = true;
		return geometry;
	}


	set needsUpdate (value) {
		if(value) this.version++;
	}

	calculateVertexNormals() {
		
	}
}