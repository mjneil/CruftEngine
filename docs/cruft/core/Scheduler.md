
[cruft/core/Scheduler.js](https://github.com/mjneil/CruftEngine/blob/master/cruft/core/Scheduler.js)		
This class defines a Scheduler. 

## Importing
```javascript
import Scheduler from "cruft/core/Scheduler";
```

## Constructors

### Scheduler( )

```javascript
let scheduler = new Scheduler();
```


##Methods

### update( [now](/primitives.md#number),  [deltaMs](/primitives.md#number) )
Updates all child processes of the scheduler.

```javascript
scheduler.update(now, deltaMs);
```

### addChild( [child](Process.md) )

Adds the proccess to the scheduler.

```javascript
scheduler.addChild(new SomeProcess());
```


