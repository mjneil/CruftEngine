[cruft/math/vec2.js](https://github.com/mjneil/CruftEngine/blob/master/cruft/math/vec2.js)		
This class defines a 2d vector.		


## Constructors

### vec2( [x](/primitives.md#number), [y](/primitives.md#number) )
[x](/primitives.md#number) - Initial x value of the vector.		
[y](/primitives.md#number) - Initial y value of the vector.	

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);
```

### static zero()
Constructs the zero vector.

```javascript
let c = vec2.zero();
```


## Properties
.[x](/primitives.md#number) - Value of the x component.		
.[y](/primitives.md#number) - Value of the y component.


## Static Methods

### static add( [a](vec2.md), [b](vec2.md) )
Adds a and b, returning the result.

```javascript
let c = vec2.add(a, b);
```

### static addScalar( [a](vec2.md), [s](/primitives.md#number) )
Adds scalar value s to a, returning the result.

```javascript
let c = vec2.addScalar(a, 3);
```

### static clone( [a](vec2.md) )
Returns clone of vector a.

```javascript
let c = vec2.clone(a);
```

### static cross( [a](vec2.md), [b](vec2.md) )
Calculates a cross b, returning the result.

```javascript
let c = vec2.cross(a, b);
```

### static crossScalar( [a](vec2.md), [s](/primitives.md#number), [left](/primitives.md#boolean) )
Calculates the cross product on a vector and a scalar. If left, then calculates s cross a, otherwise a cross s.

```javascript
let c = vec2.crossScalar(a, 5);
let d = vec2.crossScalar(b, 3, true);
```

### static dot( [a](vec2.md), [b](vec2.md) )
Calculates a dot b, returning the result.

```javascript
let c = vec2.dot(a, b);
```

### static length( [a](vec2.md) )
Calculates the length of vector a.

```javascript
let len = vec2.length(a);
```

### static lengthSquared( [a](vec2.md) )
Calculates the length squared of vector a.

```javascript
let lensq = vec.lengthSquared(a);
```

### static negate( [a](vec2.md) )
Returns the inverse of vector a.

```javascript
let inv = vec2.negate(a);
```

### static normalize( [a](vec2.md) )
Calclates the normalized vector of a.

```javascript
let norm = vec2.normalize(a);
```

### static scale( [a](vec2.md), [s](/primitives.md#number) )
Scales vector a by s.

```javascript
let c = vec2.scale(a, 10);
```

### static sub( [a](vec2.md), [b](vec2.md) )
Calculates a - b.

```javascript
let c = vec2.sub(a, b);
```


##Methods

### add( [b](vec2.md) )
Adds vector b to this, returning this.

```javascript
a.add(b);
```

### addScalar( [s](/primitives.md#number) )
Adds scalar value s to this, returning this.

```javascript
a.addScalar(3);
```

### clone()
Returns clone of this.

```javascript
let c = a.clone();
```

### copy( [b](vec2.md) )
Copies vec2 b into this.

```javascript
a.copy(b);
```

### cross( [b](vec2.md) )
Calculates this cross b, returning this.

```javascript
a.cross(b);
```

### crossScalar( [s](/primitives.md#number), [left](/primitives.md#boolean) )
Calculates the cross product on this and a scalar. If left, then calculates s cross this, otherwise this cross s.

```javascript
a.crossScalar(5);
b.crossScalar(3, true);
```

### dot( [b](vec2.md) )
Calculates this dot b, returning this.

```javascript
a.dot(b);
```

### equals( [b](vec2.md) )
Checks for strict equality of this and b.

```javascript
let eq = a.equals(b);
```

### length()
Calculates the length of this.

```javascript
let len = a.length();
```

### lengthSquared()
Calculates the length squared of this.

```javascript
let lensq = a.lengthSquared();
```

### negate()
Inverts this vector.

```javascript
a.negate();
```

### normalize()
Normalizes this vector.

```javascript
a.normalize();
```

### scale( [s](/primitives.md#number) )
Scales this by s.

```javascript
a.scale(10);
```

### sub( [b](vec2.md) )
Subtracts this by vector b.

```javascript
a.sub(b);
```