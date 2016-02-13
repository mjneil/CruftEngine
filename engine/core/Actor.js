import uuid from "engine/lib/uuid";

export default class Actor {
    constructor(id) {
    	this.parent = null;
    	this.id = id || uuid.create().toString();//or somthing like that. 
        this.components = {};
        this.children = [];
        this.eventManager = null;
    }

    addComponent(component)  {
        component.setActor(this);
        this.components[component.type] = component;
    }

    getComponent(type) {
        return this.components[type]
    }

    removeComponent() {
        console.log("FUNCTION NOT DONE")
    }

    addChild(child) {
        if(child.parent !== null) console.log("WARNING: ATTEMPTING TO BREAK EVERYTHING")
        this.children.push(child);
        child.parent = this;
    }

    removeChild(child) {
        var children = this.children;
        for(let i = 0; i < children.length;i++){
            if(children[i] === child){
                child.parent = null;
                this.children = children.splice(i, 1);
                return;
            }
        }
    }

    setEventManager(eventManager) {
        this.eventManager = eventManager;
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