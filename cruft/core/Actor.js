import Emitter from "./Emitter";
import uuid from "./../util/uuid";

export default class Actor extends Emitter {
    
    constructor(guid) {
        super();
        this.guid = guid || uuid();
    	this.parent = null;
        this.components = {};
        this.children = {};
        this.initialized = false;
        this.destroyed = false;
    }

    addComponent(component)  {
        this.components[component.type] = component;
        component.actor = this;
        this.emit("addComponent", component);
    }

    removeComponent(name) {
        var component = this.components[name];
        if(!component) return;
        component.actor = null;
        delete this.components[name];
        this.emit("removeComponent", component);
    }

    getComponent(name) {
        return this.components[name] || null;
    }

    addChild(child) {

        if(child.parent){
            console.warn("Child already attached to parent.");
            child.parent.removeChild(child);
        }

        child.parent = this;
        child.emit("setParent", this);

        this.children[child.guid] = child;

        if(this.initialized) {
            child.initialize();
        }

        this.emit("addChild", child);
    }

    removeChild(child) {//TODO remove the listenr. RIP. 
        if(child.parent === this){

            child.parent = null;
            child.emit("removeParent", this);

            delete this.children[child.guid];
            this.emit("removeChild", child);
        }
    }

    initialize() {

        for(let name in this.components) {
            this.components[name].initialize();
        }

        this.initialized = true;

        for(let id in this.children) {
            this.children[id].initialize();
        }
    }

    update(now, deltaMs) {

        for(let key in this.components) {
            this.components[key].update(now, deltaMs);
        }

        for(let id in this.children) {
            this.children[id].update(now, deltaMs);
        }
    }

    destroy(recursive=true) {

        if(this.parent){
            this.parent.removeChild(this);
        }
        
        for(let key in this.components) {
            this.components[key].destroy();
        }

        this.components = null;

        if(recursive){
            for(let id in this.children) {
                this.children[id].destroy();
            }
            this.children = null;
        }
        
        this.destroyed = true;
        this.emit("destroy", this);
    }
}
