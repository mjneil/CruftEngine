export default class Program {
	constructor(options={}) {
		this.vertexSource = options.vertexSource;
		this.fragmentSource = options.fragmentSource;
		this.attributes = options.attributes || {};
		this.uniforms = options.uniforms || {};
	}
}