import Referenceable from "./Referenceable";

export default class Actor extends Referenceable  {
    
    constructor(guid) {
        super(guid);
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

    destroyComponent(type) {
        var component = this.components[type];
        if(!component) return;
        component.destroy();
        delete this.components[type];
        this.emit("destroyComponent", com)
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

    update(deltaMs) {

        for(let key in this.components) {
            this.components[key].update(deltaMs);
        }

        for(let id in this.children) {
            this.children[id].update(deltaMs);
        }
    }

    destroy(recursive) {
        super.destroy();

        if(this.parent){
            this.parent.removeChild(this);
        }
        
        for(let key in this.components) {
            this.components[key].destroy();
        }

        if(recursive){
             for(let id in this.children) {
                this.children[id].destroy(recursive);
            }
        }

       

        this.components = null;
        this.children = null;
    }

}