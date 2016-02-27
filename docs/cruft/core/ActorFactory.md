[cruft/core/ActorFactory.js](https://github.com/mjneil/CruftEngine/blob/master/cruft/core/ActorFactory.js)		
This class defines an ActorFactory. 

## Importing
```javascript
import ActorFactory from "cruft/core/ActorFactory";
```

## Constructors

### ActorFactory( )

```javascript
let factory = new ActorFactory();
```


##Methods

### register( [name](/primitives.md#string), [creator](/primitives.md#function) )
[name](/primitives.md#string) - name to associate with the given creator function. 		
[creator](/primitives.md#function) - a function that returns an actor. 

```javascript
let EmptyCreator = () => {
	return new Actor();
}
factory.register("Empty", EmptyCreator)
```

### create(  [name](/primitives.md#string), [config](/primitives.md#object) )
creates an actor of the given type.  
```javascript

let MyCreator = (config) => {
	return new Actor(config.guid);
}

factory.register("MyCreator", MyCreator)
let actor = factory.create("MyCreator", {guid : 12});
```

