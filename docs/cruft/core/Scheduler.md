
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

### start( [deltaMs](/primitives.md#number) )
Starts the scheduler with the given delay. 
```javascript
scheduler.start(17);
```

### kill( )
Stops the scheduler from updating. 
```javascript
scheduler.kill()
```

