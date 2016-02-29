#Component extends [Emitter](Emitter.md)	
[cruft/core/Component.js](https://github.com/mjneil/CruftEngine/blob/master/cruft/core/Component.js)		
This class defines a Component. 

## Importing
```javascript
import Component from "cruft/core/Component";
```

## Constructors

### Component( [ [guid](/primitives.md#number) ] )
[guid](/primitives.md#number) - guid of the component. 

```javascript
let component = new Component();
```



## Properties
.[guid](/primitives.md#number) - guid of the component.			
.[actor](Actor.md) - Strong reference to the parent Actor.	


##Methods


### initialize( )
Initializes the component. 		
**initialize is already called once the component has been added to an active actor in the scene.  **
```javascript
component.initialize();
```

### update( [now](/primitives.md#number), [deltaMs](/primitives.md#number) )
Update the component every game loop.		
```javascript
component.update(now, deltaMs);
```


### destroy(  )
//DESC

```javascript
//EXAMPLE
```
