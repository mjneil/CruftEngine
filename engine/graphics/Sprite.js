import AsyncComponent from "engine/core/AsyncComponent";

//think about makeing a "dirtable class "
//possibly make a global array for vertices so we arent creating a lot of arrays :/. 
//or just make a vertices cache thingy                           
class SpriteGlob {

	constructor() {
		this.initialized = false;
		this.sprite = null;
		this.gl = null;
		this.vertices = null
		this.texCoords = null
		this.buffers = null;
		this.texture = null;
		this.lastDirt = null;
	}

	initialize(gl, sprite) {
		this.gl = gl;
		this.sprite = sprite;
		this.vertices = new Float32Array(12);
		this.texCoords = new Float32Array(12);
		this.buffers = [gl.createBuffer(), gl.createBuffer()];
		this.texture = gl.createTexture();
		this.initialized = true;
	}

	update() {
		var sprite = this.sprite;
		if(this.lastDirt === sprite.dirt) return;
		this.lastDirt = sprite.dirt;

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
	}

	destroy() {
		gl.deleteBuffer(buffers[0]);
		gl.deleteBuffer(buffers[1]);
	}

	preRender(programManager, camera) {
		
		var gl = this.gl;
		var buffers = this.buffers;
		var texture = this. texture;
		var program = programManager.program;

		var actor = this.sprite.actor;
		var transform = actor.getComponent("transform");

		var cameraTransform = camera.getComponent("transform");


		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
		gl.vertexAttribPointer(program.attributes.aPosition, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1]);
		gl.vertexAttribPointer(program.attributes.aTexCoord, 2, gl.FLOAT, false, 0, 0); 

		gl.uniformMatrix3fv(program.uniforms.vMatrix, gl.FALSE, cameraTransform.inverse);
		gl.uniformMatrix3fv(program.uniforms.mMatrix, gl.FALSE, transform.toWorld);


		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);


	}

	render(programManager, camera) {
		var gl = this.gl;
		var program = programManager.program;
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

	postRender() {

	}

}

export default class Sprite extends AsyncComponent {
	constructor(url) {
		super("sprite");
		this.dirt = 0;
		this._width = null;
		this._height = null;
		this._image = null;

		this.loadAsync([url]).then((assets) => {
			this.image = assets[url];
		})
	}

	dirty () {
		this.dirt++;
	}

	get width() {
		return this._width;
	}

	set width (width) {
		this._width = width;
		this.dirt++;
	}

	get height() {
		return this._height;
	}

	set height(height) {
		this._height = height;
		this.dirt++;
	}

	get image () {
		return this._image;
	}

	set image (image) {
		this._image = image;
		if(!this._width) this._width = image.width;
		if(!this.height) this._height = image.height;
		this.dirt++;
	}

	
	createGlob(gl) {
		var glob = new SpriteGlob();
			glob.initialize(gl, this);
		return glob;
	}


	toJSON() {
		var json = {
			width : this._width,
			height : this._height,
			src : image.src
		}
		return json;
	}

}