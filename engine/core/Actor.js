import uuid from "engine/lib/uuid";
import EventEmitter from "events";
export default class Actor {
    constructor(id) {
        this.id = (id === null || id === undefined)? uuid.create().toString() : id;
    	this.parent = null;
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
        delete children[child.id];
    }

    setEngine(engine) {
        this.engine = engine;
    }

    update(deltaMs) {

        for(let key in this.components) {
            this.components[key].update(deltaMs);
        }

        for(let id in this.children) {
            this.children[id].update(deltaMs);
        }
    }
}