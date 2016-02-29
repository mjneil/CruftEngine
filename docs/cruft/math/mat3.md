[cruft/math/mat3.js](https://github.com/mjneil/CruftEngine/blob/master/cruft/math/mat3.js)      
This class defines a 3x3 matrix.


## Constructors

### mat3()
Creats a 3x3 matrix and initializes it to the indentity matrix.

```javascript
let a = new mat3();
let b = new mat3();
```


## Properties
[data](/primitives.md#float32array) - Column-major array representation of the 3x3 matrix.


## Static Methods

### static clone( [a](mat3.md) )
Creates a copy of matrix a.

```javascript
let c = mat3.clone(a);
```

### static multiply( [A](mat3.md), [B](mat3.md) )
Calculates A * B.

```javascript
let c = mat3.multiply(A, B);

## Methods

### add( [B](mat3.md) )
Calculates this + B.

```javascript
a.add(b);
```

### clone()
Creates a copy of this matrix.

```javascript
let c = a.clone();
```

### copy( [b](mat3.md) )
Copies matrix b into this.

```javascript
a.copy(b);
```

### determinant()
Calculates the determinant of this matrix.

```javascript
a.determinant();
```

### equals( [B](mat3.md) )
Checks for strict equality of this and B.

```javascript
let eq = a.equals(b);
```

### identity()
Sets this matrix to the identity matrix.

```javascript
a.identity();
```

### invert()
Inverts this matrix in place. Returns null if not invertible.

```javascript
a.invert();
```

### multiply( [B](mat3.md) )
Multiplies this matrix by B in place.

```javascript
a.multiply(b);
```

### multiplyScalar( [s](/primitives.md#number) )
Multiplies this matrix by scalar s.

```javascript
a.multiplyScalar(4);
```

### rotate( [rad](/primitives.md#number) )
Rotates this matrix by angle rad.

```javascript
a.rotate(Math.PI / 2);
```

### scale([v](vec2.md) )
Scales this matrix by vec2 v.

```javascript
let v = new vec2(5, 10);
a.scale(v);
```

### subtract( [B](mat3.md) )
Calculates this - B.

```javascript
a.subtract(b);
```

### translate( [v](vec2.md) )
Translates this matrix by vec2 v.

```javascript
let v = new vec2(1, 2);
a.translate(v);
```

### transpose()
Transposes this matrix in place.

```javascript
a.transpose();
```