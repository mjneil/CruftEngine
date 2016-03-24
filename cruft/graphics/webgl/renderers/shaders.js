


let def = {
	vertex : `
	#version 330 core
	attribute vec3 aPosition;
	attribute vec3 aNormal;
	uniform mat4 pMatrix;
	uniform mat4 mvMatrix;
	uniform mat4 nMatrix;

	varying vec3 vNormal;

	void main(void) {
		gl_Position = pMatrix * mvMatrix * vec4(aPosition, 1.0);
		vNormal =  normalize( (nMatrix * vec4(aNormal, 0.0)).xyz  ) ;
	}
	`,
	fragment : `
		precision mediump float;
		uniform vec3 uColor;
		varying vec3 vNormal;



		vec3 light_position = vec3(0.0, 0.0, 0.0);
		vec3 light_diffuse = vec3(0.0, 0.0, 0.0);

		void main(void) {
			vec3 normal = normalize(vNormal);
			gl_FragColor = vec4(uColor, 1.0);
		}
	`
}


export {def}