[cruft/math/vec2.js](https://github.com/mjneil/CruftEngine/blob/master/cruft/math/vec2.js)		
This class defines a 2d vector.		


## Constructors

### vec2( [x](/primitives.md#number), [y](/primitives.md#number) )
[x](/primitives.md#number) - Initial x value of the vector.		
[y](/primitives.md#number) - Initial y value of the vector.	

```javascript
let a = new vec2(1, 2);
```



## Properties
.[x](/primitives.md#number) - Value of the x component.		
.[y](/primitives.md#number) - Value of the y component.



## Static Methods

### zero()
Constructs the zero vector.

```javascript
let a = vec2.zero();
```

### add( [a](vec2.md), [b](vec2.md) )
Adds a and b, returning the result.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

let c = vec2.add(a, b);
```

### static addScalar( [a](vec2.md), [s](/primitives.md#number) )
Adds scalar value s to a, returning the result.

```javascript
let a = new vec2(1, 2);

let c = vec2.addScalar(a, 3);
```

### static clone( [a](vec2.md) )
Returns clone of vector a.

```javascript
let a = new vec2(1, 2);

let c = vec2.clone(a);
```

### static cross( [a](vec2.md), [b](vec2.md) )
Calculates a cross b, returning the result.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

let c = vec2.cross(a, b);
```


##Methods

### add( [b](vec2.md) )
Adds vector b to this, returning this.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

a.add(b);
```

### addScalar( [s](/primitives.md#number) )
Adds scalar value s to this, returning this.

```javascript
let a = new vec(1, 2);

a.addScalar(3);
```

### clone()
Returns clone of this.

```javascript
let a = new vec2(1, 2);

let c = a.clone();
```

### cross( [b](vec2.md) )
Calculates this cross b, returning the this.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

a.cross(b);
```