This class defines a 2d vector.

## Constructors

### vec2( x, y )
x - Float representing the x value of the vector.  
y - Float representing the y value of the vector.

```javascript
let a = new vec2(1, 2);
```

### static zero()
Constructs the zero vector.

```javascript
let a = vec2.zero();
```

## Properties
### .x
### .y

##Methods

### static add( a, b )
Adds vector a and b, returning the result.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

let c = vec2.add(a, b);
```

### add( b )
Adds vector b to this, returning this.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

a.add(b);
```

### static addScalar( a, s)
Adds scalar value s to a, returning the result.

```javascript
let a = new vec2(1, 2);

let c = vec2.addScalar(a, 3);
```

### addScalar( s )
Adds scalar value s to this, returning this.

```javascript
let a = new vec(1, 2);

a.addScalar(3);
```

### static clone( a )
Returns clone of vector a.

```javascript
let a = new vec2(1, 2);

let c = vec2.clone(a);
```

### clone()
Returns clone of this.

```javascript
let a = new vec2(1, 2);

let c = a.clone();
```

### static cross( a, b )
Calculates a cross b, returning the result.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

let c = vec2.cross(a, b);
```

### cross( b )
Calculates this cross b, returning the this.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

a.cross(b);
```