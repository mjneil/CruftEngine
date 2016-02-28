// Column Major
export default class mat3 {
    constructor() {
        this.data = new Float32Array(9);
        this.data[0] = 1;
        this.data[1] = 0;
        this.data[2] = 0;
        this.data[3] = 0;
        this.data[4] = 1;
        this.data[5] = 0;
        this.data[6] = 0;
        this.data[7] = 0;
        this.data[8] = 1;
    }

    identity() {
        this.data[0] = 1;
        this.data[1] = 0;
        this.data[2] = 0;
        this.data[3] = 0;
        this.data[4] = 1;
        this.data[5] = 0;
        this.data[6] = 0;
        this.data[7] = 0;
        this.data[8] = 1;

        return this;
    }

    static clone(a) {
        let out = new mat3();
        out.data[0] = a.data[0];
        out.data[1] = a.data[1];
        out.data[2] = a.data[2];
        out.data[3] = a.data[3];
        out.data[4] = a.data[4];
        out.data[5] = a.data[5];
        out.data[6] = a.data[6];
        out.data[7] = a.data[7];
        out.data[8] = a.data[8];

        return out;
    }

    clone() {
        let out = new mat3();
        out.data[0] = this.data[0];
        out.data[1] = this.data[1];
        out.data[2] = this.data[2];
        out.data[3] = this.data[3];
        out.data[4] = this.data[4];
        out.data[5] = this.data[5];
        out.data[6] = this.data[6];
        out.data[7] = this.data[7];
        out.data[8] = this.data[8];

        return out;
    }

    copy(a) {
        this.data[0] = a.data[0];
        this.data[1] = a.data[1];
        this.data[2] = a.data[2];
        this.data[3] = a.data[3];
        this.data[4] = a.data[4];
        this.data[5] = a.data[5];
        this.data[6] = a.data[6];
        this.data[7] = a.data[7];
        this.data[8] = a.data[8];

        return this;
    }

    transpose() {
        let d1 = this.data[1], d2 = this.data[2], d5 = this.data[5];
        this.data[1] = this.data[3];
        this.data[2] = this.data[6];
        this.data[3] = d1;
        this.data[5] = this.data[7];
        this.data[6] = d2;
        this.data[7] = d5;

        return this;
    }

    invert() {
        let d = this.data,
            d00 = d[0], d01 = d[1], d02 = d[2], // col0
            d10 = d[3], d11 = d[4], d12 = d[5], // col1
            d20 = d[6], d21 = d[7], d22 = d[8], // col2

            b01 = d22 * d11 - d12 * d21,
            b11 = -d22 * d10 + d12 * d20,
            b21 = d21 * d10 - d11 * d20,

            det = d00 * b01 + d01 * b11 + d02 * b21;

        if (det === 0) {
            return null;
        }

        det = 1.0 / det;

        d[0] = b01 * det;
        d[1] = (-d22 * d01 + d02 * d21) * det;
        d[2] = (d12 * d01 - d02 * d11) * det;
        d[3] = b11 * det;
        d[4] = (d22 * d00 - d02 * d20) * det;
        d[5] = (-d12 * d00 + d02 * d10) * det;
        d[6] = b21 * det;
        d[7] = (-d21 * d00 + d01 * d20) * det;
        d[8] = (d11 * d00 - d01 * d10) * det;

        return this;
    }

    determinant() {
        let d = this.data,
            d00 = d[0], d01 = d[1], d02 = d[2],
            d10 = d[3], d11 = d[4], d12 = d[5],
            d20 = d[6], d21 = d[7], d22 = d[8],

            b01 = d22 * d11 - d12 * d21,
            b11 = -d22 * d10 + d12 * d20,
            b21 = d21 * d10 - d11 * d20,

            det = d00 * b01 + d01 * b11 + d02 * b21;

        return det;
    }

    multiply(B) {
        let d = this.data, b = B.data,
            d00 = d[0], d01 = d[1], d02 = d[2],
            d10 = d[3], d11 = d[4], d12 = d[5],
            d20 = d[6], d21 = d[7], d22 = d[8],

            b00 = b[0], b01 = b[1], b02 = b[2],
            b10 = b[3], b11 = b[4], b12 = b[5],
            b20 = b[6], b21 = b[7], b22 = b[8];

        this.data[0] = d00 * b00 + d10 * b01 + d20 * b02;
        this.data[1] = d01 * b00 + d11 * b01 + d21 * b02;
        this.data[2] = d02 * b00 + d12 * b01 + d22 * b02;

        this.data[3] = d00 * b10 + d10 * b11 + d20 * b12;
        this.data[4] = d01 * b10 + d11 * b11 + d21 * b12;
        this.data[5] = d02 * b10 + d12 * b11 + d22 * b12;

        this.data[6] = d00 * b20 + d10 * b21 + d20 * b22;
        this.data[7] = d01 * b20 + d11 * b21 + d21 * b22;
        this.data[8] = d02 * b20 + d12 * b21 + d22 * b22;

        return this;
    }

    translate(v) {
        let d = this.data;
        d[6] = v.x * d[0] + v.y * d[3] + d[6]
        d[7] = v.x * d[1] + v.y * d[4] + d[7]
        d[8] = v.x * d[2] + v.y * d[5] + d[8]

        return this;
    }

    rotate(rad) {
        let d = this.data,
            d00 = d[0], d01 = d[1], d02 = d[2],
            d10 = d[3], d11 = d[4], d12 = d[5],
            d20 = d[6], d21 = d[7], d22 = d[8],
            s = Math.sin(rad),
            c = Math.cos(rad);

        d[0] = c * d00 + s * d10;
        d[1] = c * d01 + s * d11;
        d[2] = c * d02 + s * d12;

        d[3] = c * d10 - s * d00;
        d[4] = c * d11 - s * d01;
        d[5] = c * d12 - s * d02;

        return this;
    }

    scale(v) {
        let d = this.data;

        d[0] *= v.x;
        d[1] *= v.x;
        d[2] *= v.x;

        d[3] *= v.y;
        d[4] *= v.y;
        d[5] *= v.y;

        return this;
    }

    add(B) {
        let d = this.data, b = B.data;
        d[0] += b[0];
        d[1] += b[1];
        d[2] += b[2];
        d[3] += b[3];
        d[4] += b[4];
        d[5] += b[5];
        d[6] += b[6];
        d[7] += b[7];
        d[8] += b[8];

        return this;
    }

    subtract(B) {
        let d = this.data, b = B.data;
        d[0] -= b[0];
        d[1] -= b[1];
        d[2] -= b[2];
        d[3] -= b[3];
        d[4] -= b[4];
        d[5] -= b[5];
        d[6] -= b[6];
        d[7] -= b[7];
        d[8] -= b[8];

        return this;
    }

    multiplyScalar(s) {

        let d = this.data;
        d[0] *= s;
        d[1] *= s;
        d[2] *= s;
        d[3] *= s;
        d[4] *= s;
        d[5] *= s;
        d[6] *= s;
        d[7] *= s;
        d[8] *= s;

        return this;
    }

    equals(B) {
        let d = this.data, b = B.data;

        return d[0] === b[0] && d[1] === b[1] && d[2] === b[2] &&
               d[3] === b[3] && d[4] === b[4] && d[5] === b[5] &&
               d[6] === b[6] && d[7] === b[7] && d[8] === b[8];
    }
}