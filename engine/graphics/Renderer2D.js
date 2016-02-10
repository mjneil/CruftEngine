import Program from "./Program"
import ProgramManager from "./ProgramManager"
//think about how I want to do this freal.

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



//everything above is tmp >_>




export default class Renderer2D {
	constructor(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.globs = {};
		var gl = this.gl = this.canvas.getContext("webgl");
			gl.viewport(0, 0, width, height);
			gl.clearColor(0, 0, 0, 1);
			gl.disable(gl.DEPTH_TEST)


		this.programManager = new ProgramManager(gl);

		this.defaultProgram = new Program(gl, vSrc, fSrc, {
			attributes : ["aPosition", "aTexCoord"],
			uniforms : ["vMatrix", "mMatrix", "pMatix"]
		});


	}


	

	//todo remove references to sprite
	hasGlob (sprite) {
		return this.globs[sprite.guid] !== undefined;
	}

	addGlob(sprite) {
		this.globs[sprite.guid] = sprite.createGlob(this.gl);
	}

	getGlob(sprite) {
		return this.globs[sprite.guid];
	}

	render(scene, camera) { //ignore camera matrix for now :/
		var gl = this.gl;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		this.programManager.use(this.defaultProgram);
		this._render(scene, camera);

	}

	_render(actor, camera) {
		var globs = this.globs;

		//try to get the actor's sprite component. (I guess in future change from sprite to renderable or somthing )
		var sprite = actor.getComponent("sprite");

		if(sprite && sprite.loaded){
			if(!this.hasGlob(sprite)) this.addGlob(sprite);

			var glob = this.getGlob(sprite);
			glob.update();

			//idk y 3 things but yoloooooo

			glob.preRender(this.programManager, camera);
			glob.render(this.programManager, camera);
			glob.postRender(this.programManager, camera);




		}


		for(let child of actor.children) {
			this._render(child, camera);
		}

	}
}