var nextActorGuid = 0;
export default class Actor {
    constructor() {
    	this.parent = null;
    	this.id = nextActorGuid++;
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
        this.children.push(child);
        child.parent = this;
    }

    setEventManager(eventManager) {
        this.eventManager = eventManager;
    }

    removeChild() {
        console.log("FUNCTION NOT DONE. ")
    }

    update(deltaMs) {

        for(let key in this.components) {
            this.components[key].update(deltaMs);
        }

        for(let child of this.children) {
            child.update(deltaMs);
        }
    }

    //make a more effecient thing later :/
    toJSON() {

        var json = {
            id : this.id,
            parentId : (this.parent !== null)? this.parent.id:null,
            components : {},
            children : [] 
        }

        for(var key in this.components) {
            json.components[key] = this.components[key].toJSON()
        }

        for(let child of this.children) {
            json.children.push(child.toJSON());
        }

        return json;
       
    }


}