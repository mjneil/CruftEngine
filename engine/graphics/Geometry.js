export default class Geometry {
    constructor() {
        this.vertices = null;
        this.texCoords = null;
        this.normals = null;
        this.faces = null;
    }

    get hasVertices() {
        return !(this.vertices === null);
    }

    get hasNormals() {
        return !(this.normals === null);
    }

    get hasTexCoords() {
        return !(this.texCoords === null);
    }
}