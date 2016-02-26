#Actor extends [Emitter](Emitter.md)	
[cruft/core/Actor.js](https://github.com/mjneil/CruftEngine/blob/master/cruft/core/Actor.js)		
This class defines an Actor. 

## Importing
```javascript
import Actor from "cruft/core/Actor"
```

## Constructors

### Actor( [ [guid](/primitives.md#number) ] )
[guid](/primitives.md#number) - guid of actor. 

```javascript
let actor = new Actor(); 
//or
let actor2 = new Actor(12); //actor2.guid === 12;
```



## Properties
.[parent](Actor.md) - Strong reference to parent actor. 		
.[components](/primitives.md#object) - Object containing strong references to the actor's components. 		
.[children](/primitives.md#object) - Object containing strong references to the actor's children. 


##Methods


### addComponent( [component](Component.md) )
Add a component to an actor. 
```javascript
actor.addComponent(component);
```

### getComponent( [type](/primitives.md#string) )
Get a component of the specified type. 

```javascript
var transform = actor.getComponent("transform");
```


### removeComponent( [type](/primitives.md#string) )
Remove a component of the specified type. 

```javascript
actor.removeComponent("transform"); 
```


### addChild( [child](Actor.md) )
Add a child to an actor. 

```javascript
actor1.addChild(actor2)
```

### removeChild( [child](Actor.md) )
Remove a child from an actor. 

```javascript
actor1.removeChild(actor2)
```


### setParent( [parent](Actor.md) )
Method used to set actor's parent reference. 		
**AddChild already takes care of setting a child's parent. **

```javascript
actor1.setParent(actor2).
```


### update( [now](/primitives.md#number) ,  [deltaMs](/primitives.md#number) )
Recursive function to update all children Actor/Component 's of an actor.		

```javascript
actor.update(now, deltaMs)
```


### destroy(  )
DESC

```javascript
//example
```
