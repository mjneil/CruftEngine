import Component from "core/engine/Component";

//think about makeing a "dirtable class "
//possibly make a global array for vertices so we arent creating a lot of arrays :/. 
//or just make a vertices cache thingy                           
class GLSprite {

	constructor() {
		this.initialized = false;
		this.gl = null;
		this.vertices = null
		this.texCoords = null
		this.buffers = null;
		this.lastDirt = null;
	}

	initialize(gl, sprite) {
		this.gl = gl;
		this.sprite = sprite;
		this.vertices = new Float32Array(8);
		this.texCoords = new Float32Array(8);
		this.buffers = [gl.createBuffer(), gl.createBuffer()];
		this.initialized = true;
	}

	update() {
		if(this.lastDirt === sprite.dirt) return;
		this.lastDirt = sprite.dirt;

		var gl = this.gl;
		var sprite = this.sprite;
		var vertices = this.vertices;
		var texCoords = this.texCoords;
		var buffers = this.buffers;

		

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


		texCoords[0] = 1;
		texCoords[1] = 1;
		texCoords[2] = 0;
		texCoords[3] = 0;
		texCoords[4] = 1;
		texCoords[5] = 0;

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1]);
		gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	destroy() {
		gl.deleteBuffer(buffers[0]);
		gl.deleteBuffer(buffers[1]);
	}

	preRender(programManager) {
		var gl = this.gl;

		var program = programManager.current;

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
		gl.vertexAttribPointer(program.attributes.aPosition, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1]);
		gl.vertexAttribPointer(program.attributes.aTexCoord, 2, gl.FLOAT, false, 0, 0);


	}

	render() {

	}

	postRender() {

	}

}

export default class Sprite extends Component {
	constructor() {
		super("sprite");
		this.dirt = 0;
		this._width = null;
		this._height = null;
		this._image = null;
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
		dirty();
	}

	
	createGL(gl) {
		return new SpriteGlob(gl);
	}

	updateGL(glob) {
		return glob.update();
	}

}