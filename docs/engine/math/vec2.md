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
