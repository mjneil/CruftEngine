export default class Face {

	constructor (a, b, c, materialIndex=0) {

		this.indices = [a, b, c];
		this.materialIndex = materialIndex;
		this.normal = null;

	}

}