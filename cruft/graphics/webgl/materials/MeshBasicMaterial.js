import Material from "../WebGLMaterial";
import vec3 from "../../../math/vec3";


export default class MeshBasicMaterial extends Material {

	constructor(options={}) {
		super("default");
		this.color = options.color || new vec3(1.0, 0.0, 0.0);
		this.shading = options.shading || "flat";
	}

	apply(gl, program) {
		let uniforms = program.uniforms;
		gl.uniform3fv(uniforms.uColor, this.color.toBuffer());
	}

}