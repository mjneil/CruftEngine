export default class vec2 {
	constructor(x, y) { //no default values cause these needs to be fast. 
		this.x = x;
		this.y = y;
	}

	static zero() { //static constructor for making empty vectors. 
		return new vec2(0, 0);
	}

	static add(a, b) { //adds new vecs and stores them in a new vector.
		return new vec2(a.x + b.x, a.y + b.y);
	}

	add(b) { //modifies self so like a.add(b) changes the vector a. (mem effecient)
		this.x += b.x;
		this.y += b.y;
		return this;
	}

	static sub(a, b) {
		return new vec2(a.x - b.x, a.y - b.y);
	}

	sub(b) {
		this.x -= b.x;
		this.y -= b.y;
		return this;
	}

	static scale (a, s) {
		return new vec2(a.x * s, a.y * s);
	}

	scale(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	static dot(a, b) {
		return a.x * b.x + a.y * b.y;
	}

	dot(b) {
		return this.x * b.x + this.y * b.y;	}

	static cross(a, b) {
		return a.x * b.y - a.y * b.x;
	}

	static crossScalar(a, s, left) {
		if (left) {
			return new vec2(-s * a.y, s * a.x);
		} else {
			return new vec2(s * a.y, -s * a.x);
		}
	}

	cross(b) {
		return this.x * b.y - a.y * b.x;
	}

	crossScalar(s, left) {
		let x = this.x;
		if (left) {
			this.x = -s * this.y;
			this.y = s * x;
		} else {
			this.x = s * this.y;
			this.y = -s * x;
		}
		return this;
	}

	static length(a) {
		return Math.sqrt(a.x * a.x + a.y * a.y);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	static lengthSquared(a) {
		return a.x * a.x + a.y * a.y;
	}

	lengthSquared() {
		return this.x * this.x + this.y * this.y;
	}

	static normalize(a) {
		let len = vec2.length(a);
		len = 1 / len;
		return new vec2(a.x * len, a.y * len);
	}

	normalize() {
		let len = this.length();
		len = 1 / len;
		this.x *= len;
		this.y *= len;
		return this;
	}

}
