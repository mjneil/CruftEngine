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

### register( [creators](/primitives.md#object) )
[creators](/primitives.md#object) - Object containg (name, creator) pairs. 

```javascript

let EmptyCreator = () => {
	return new Actor();
}

factory.register({
	"Empty" : EmptyCreator
});

let actor = factory.create("Empty")// actor == EmptyCreator();

```

### create(  [name](/primitives.md#string), [config](/primitives.md#object) )
creates an actor of the given type.  
```javascript

let MyCreator = (config) => {
	return new Actor(config.guid);
}

factory.register({MyCreator});
let actor = factory.create("MyCreator", {guid : 12});
```

