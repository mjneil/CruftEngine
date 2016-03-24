let tmp = new Float32Array(3);

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
        return new vec3(a.x + b.x, a.y + b.y, a.z + b.z);
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
        var ax = a.x, ay = a.y, az = a.z,
            bx = b.x, by = b.y, bz = b.z;
        return new vec3(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
    }

    cross(b) {
       var ax = this.x, ay = this.y, az = this.z,
            bx = b.x, by = b.y, bz = b.z;

        return new vec3(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
    }

    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    dot(b) {
        return this.x * b.x + this.y * b.y + this.z * this.z; 
    }

    static length(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    static lengthSquared(a) {
        return a.x * a.x + a.y * a.y + a.z * a.z;
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    static normalize(a) {
        let len = vec3.length(a);
        len = 1 / len;
        return new vec3(a.x * len, a.y * len, a.z * len);
    }

    normalize() {
        let len = this.length();
        len = 1 / len;
        this.x *= len;
        this.y *= len;
        this.z *= len;
        return this;
    }

    static scale (a, s) {
        return new vec3(a.x * s, a.y * s, a.z * s);
    }

    scale(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    static sub(a, b) {
        return new vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    sub(b) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        return this;
    }

    toBuffer() {
        tmp[0] = this.x;
        tmp[1] = this.y;
        tmp[2] = this.z;
        return tmp;
    }
}
