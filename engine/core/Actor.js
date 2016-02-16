import uuid from "engine/lib/uuid";

export default class Actor {
    constructor(id) {
    	this.parent = null;
    	this.id = id || uuid.create().toString();//or somthing like that. 
        this.components = {};
        this.children = {};
    }

    addComponent(component)  {
        component.setActor(this);
        this.components[component.type] = component;
    }

    getComponent(type) {
        return this.components[type]
    }

    removeComponent(type) {//todo remove listeners
        delete this.components[type];
    }

    addChild(child) {
        if(child.parent !== null) console.log("WARNING: ATTEMPTING TO BREAK EVERYTHING")
        child.parent = this;
        this.children[child.id] = child;
    }

    removeChild(child) {
        var children = this.children;
        console.log("TODO PLZ")
    }

    setEngine(engine) {
        this.engine = engine;
    }

    update(deltaMs) {

        for(let key in this.components) {
            this.components[key].update(deltaMs);
        }

        for(let child of this.children) {
            child.update(deltaMs);
        }
    }
}