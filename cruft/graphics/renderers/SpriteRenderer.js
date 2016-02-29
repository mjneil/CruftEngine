import Program from "../Program"
import SubRenderer from "../SubRenderer";
import Sprite from "../renderables/Sprite";

export default class SpriteRenderer extends SubRenderer {

	constructor() {
		super(Sprite);
		this.gl = null;
		this.program = null;
	}

	initialize(gl) {
		this.gl = gl;
		this.program = new Program(gl, vSrc, fSrc, {
			attributes : ["aPosition", "aTexCoord"],
			uniforms : ["vMatrix", "mMatrix", "pMatix"]
		});
	}

	render(renderer, render, camera) {
		var sprite = render.renderable;
		var actor = render.actor;
		
		if(!sprite.loaded) return;

		var gl = this.gl;
		renderer.programManager.use(this.program);

		var glSprite = sprite.data[this.guid];
		if(!glSprite) glSprite = sprite.data[this.guid] = new GLSprite(gl);
		if(glSprite.lastDirt !== sprite.lastDirt) glSprite.update(sprite);


		var buffers = glSprite.buffers;
		var texture = glSprite.texture;
		var program = renderer.programManager.program;

		var transform = actor.getComponent("Transform2D");
		var cameraTransform = camera.getComponent("Transform2D");


		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
		gl.vertexAttribPointer(program.attributes.aPosition, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1]);
		gl.vertexAttribPointer(program.attributes.aTexCoord, 2, gl.FLOAT, false, 0, 0); 

		gl.uniformMatrix3fv(program.uniforms.vMatrix, gl.FALSE, cameraTransform.inverse.data);
		gl.uniformMatrix3fv(program.uniforms.mMatrix, gl.FALSE, transform.toWorld.data);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);

		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}


}

var vSrc = `
	attribute vec2 aPosition;
	attribute vec2 aTexCoord;

	uniform mat3 vMatrix;
	uniform mat3 mMatrix;

	varying vec2 vTexCoord;

	void main(void) {
		vec3 position = vMatrix * mMatrix * vec3(aPosition, 1.0);
		gl_Position = vec4( position.xy, 0.0, 1.0 );
		vTexCoord = aTexCoord;
	}
`

var fSrc = `
	precision mediump float;
	varying vec2 vTexCoord;
	uniform sampler2D uTexture;
	void main(void) {
		gl_FragColor = texture2D(uTexture, vTexCoord);
	}

`


class GLSprite {

	constructor(gl) {
		this.gl = gl;
		this.vertices = new Float32Array(12);
		this.texCoords = new Float32Array(12);
		this.texture = gl.createTexture();
		this.buffers = [gl.createBuffer(), gl.createBuffer()];
		
		this.lastDirt = null;
	}

	destroy() {
		var gl = this.gl;
		gl.deleteBuffer(this.buffers[0]);
		gl.deleteBuffer(this.buffers[1]);
		gl.deleteTexture(this.texture);
	}

	update(sprite) {
		var gl = this.gl;
		var vertices = this.vertices;
		var texCoords = this.texCoords;
		var buffers = this.buffers;
		var texture = this.texture;

		var hw = sprite._width/2;
		var hh = sprite._height/2;

		vertices[0] =  hw;
		vertices[1] =  hh;
		vertices[2] = -hw;
		vertices[3] =  hh;
		vertices[4] = -hw;
		vertices[5] = -hh;


		vertices[6]  =  hw;
		vertices[7]  =  hh;
		vertices[8]  = -hw;
		vertices[9]  = -hh;
		vertices[10] =  hw;
		vertices[11] = -hh;

		texCoords[0] = 1;
		texCoords[1] = 1;
		texCoords[2] = 0;
		texCoords[3] = 1
		texCoords[4] = 0;
		texCoords[5] = 0;


		texCoords[6] = 1;
		texCoords[7] = 1;
		texCoords[8] = 0;
		texCoords[9] = 0;
		texCoords[10] = 1;
		texCoords[11] = 0;

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1]);
		gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);



		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sprite.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //prob want 2 change these at some point aheh
	  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);

		this.lastDirt = sprite.dirt;
	}

}