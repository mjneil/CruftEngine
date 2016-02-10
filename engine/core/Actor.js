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


}