import uuid from "engine/lib/uuid";
import EventEmitter from "events";

export default class Actor extends EventEmitter {
    
    constructor(id) {
        super();
        this.id = id || uuid.create().toString();
    	this.parent = null;
        this.components = {};
        this.children = {};
    }

    addComponent(component)  {
        this.components[component.type] = component;
        component.setActor(this);
        this.emit("addComponent", component);
    }

    removeComponent(type) {
        delete this.components[type];
        this.emit("removeComponent", component);
    }

    getComponent(type) {
        return this.components[type]
    }

    addChild(child) {
        if(child.parent){
            child.parent.removeChild(child);
        }
        child.parent = this;
        this.children[child.id] = child;
        this.emit("addChild", child);
    }

    removeChild(child) {//TODO remove the listenr. RIP. 
        child.parent = null;
        delete this.children[child.id];
        this.emit("removeChild", child);
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