export default class vec3 {
    constructor(x, y, z) { 
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static zero() { //static constructor for making empty vectors. 
        return new vec3(0, 0, 0);
    }

    static add(a, b) { //adds new vecs and stores them in a new vector.
        return new vec2(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    add(b) { //modifies self so like a.add(b) changes the vector a. (mem effecient)
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;
        return this;
    }

    static addScalar(a, s) {
        return new vec2(a.x + s, a.y + s, a.z + s);
    }

    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    }

    static clone(a) {
        return new vec2(a.x, a.y, a.z);
    }

    clone() {
        return new vec2(this.x, this.y, this.z);
    }

    static cross(a, b) {
        console.error("NOT IMPLEMENTED");
        //return a.x * b.y - a.y * b.x;
    }

    cross(b) {
        return this.x * b.y - a.y * b.x;
    }

    static crossScalar(a, s, left) {
        if (left) {
            return new vec2(-s * a.y, s * a.x);
        } else {
            return new vec2(s * a.y, -s * a.x);
        }
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

    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    dot(b) {
        return this.x * b.x + this.y * b.y; 
    }

    equals(b) {
        return a.x === b.x && a.y === b.y;
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

    static negate(a) {
        return new vec2(-a.x, -a.y);
    }

    negate() {
        this.x *= -1;
        this.y *= -1;
        return this;
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

    static scale (a, s) {
        return new vec2(a.x * s, a.y * s);
    }

    scale(s) {
        this.x *= s;
        this.y *= s;
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
}
