[engine/math/vec2.js](https://github.com/mjneil/CruftEngine/blob/master/engine/math/vec2.js)		
This class defines a 2d vector.		


## Constructors

### vec2( [x](/primitives.md#Number), [y](/primitives.md#Number) )
[x](/primitives.md#Number) - Initial x value of the vector.		
[y](/primitives.md#Number) - Initial y value of the vector.	

```javascript
let a = new vec2(1, 2);
```



## Properties
.[x](/primitives.md#Number) - Value of the x component.		
.[y](/primitives.md#Number) - Value of the y component.



## Static Methods

### zero()
Constructs the zero vector.

```javascript
let a = vec2.zero();
```

### add( [a](/engine/math/vec2.md), [b](/engine/math/vec2.md) )
Adds a and b, returning the result.

```javascript
let a = new vec2(1, 2);
let b = new vec2(3, 4);

let c = vec2.add(a, b);
```



##Methods

