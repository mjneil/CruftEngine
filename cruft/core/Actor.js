import EventEmitter from "events";

export default class Actor   {
    
    constructor(guid) {
        super();
        this.guid = guid || uuid.create().toString();
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
        var component = this.components[type];
        if(!component) return;
        component.setActor(null);
        delete this.components[type];
        this.emit("removeComponent", component);
    }

    getComponent(type) {
        return this.components[type]
    }

    setParent(parent) {
        this.parent = parent;
        this.emit("setParent", parent);
    }

    addChild(child) {
        if(child.parent){
            console.warn("Child already attached to parent.");
            child.parent.removeChild(child);
        }
        child.setParent(this);
        this.children[child.guid] = child;
        this.emit("addChild", child);
    }

    removeChild(child) {//TODO remove the listenr. RIP. 
        child.setParent(null);
        delete this.children[child.guid];
        this.emit("removeChild", child);
    }

    update(now, deltaMs) {

        for(let key in this.components) {
            this.components[key].update(now, deltaMs);
        }

        for(let id in this.children) {
            this.children[id].update(now, deltaMs);
        }
    }

    destroy() {

        if(this.parent){
            this.parent.removeChild(this);
        }
        
        for(let key in this.components) {
            this.components[key].destroy();
        }

        this.components = null;

    }
}

//memory.delete(recursive)