
[cruft/net/Cache.js](https://github.com/mjneil/CruftEngine/blob/master/cruft/net/Cache.js)		
This class defines a Cache. 

## Importing
```javascript
import Cache from "cruft/net/Cache";
```

##Methods


### register( [name](/primitives#string), [Loader](Loader.md) )
Register Cache loader to the given name. 
```javascript
import ObjLoader from "cruft/net/loaders/ObjLoader";
cache.register("obj", new ObjLoader());
cache.get("obj!assets/models/CruftModel.obj").then((asset) => {
	//asset is the parsed obj model
});
```

### get( [path](/primitives.md#string) )
Path to the asset to load. Optionaly prefixed with pluginname! to specify which loader to use.
```javascript
cache.get("json!assets/data/data.json").then((data) => {
	console.log(data.pasword)//data is an obect. 
});
```


### load( ...[paths](/primitives.md#string) )
load all of the specified paths. 

```javascript
cache.load("json!assets/data/data.json", "json!assets/data/data2.json").then((paths) => {
	console.log(paths["json!assets/data.txt"]); // contents of data.json
})
```