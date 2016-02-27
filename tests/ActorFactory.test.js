import ActorFactory from 'cruft/core/ActorFactory.js';
import Actor from 'cruft/core/Actor.js';
import Component from 'cruft/core/Component.js';

describe("ActorFactory", () => {

	let factory = null;

	beforeEach(() => {
		factory = new ActorFactory();
	})

    it('can register new types', () => {

        let creator = () => {
            return new Actor();
        }
        
    	factory.register("Empty", creator);
        expect(factory.creators["Empty"]).toBe(creator);
    });

    it('can create actors given the type', () => {

        let creator = () => {
            return new Actor();
        }
        
        factory.register("Empty", creator);
        expect(factory.create("Empty")).toEqual(jasmine.any(Actor));
    });

    it('can create actors given null as the type', () => {
        expect(factory.create(null)).toEqual(jasmine.any(Actor));
    });




    /*

    it('accepts a passed in guid', () => {
    	var id = 12;
    	actor = new Actor(id);
        expect(actor.guid).toBe(id);
    });

    it('can add a component', () => {
        actor = new Actor();
        var component = new Component()
        actor.addComponent(component);
        expect(actor.components.Component).toBe(component);
    });

    it('can remove a component', () => {
        actor = new Actor();
        actor.addComponent(new Component());
        actor.removeComponent("Component");
        expect(actor.components.Component).toBe(undefined);
    });

    it('can add a child', () => {
        actor = new Actor();
        var child = new Actor();
        actor.addChild(child);
        expect(actor.children[child.guid]).toBe(child);
        expect(child.parent).toBe(actor);
    });

    it('can remove a child', () => {
        actor = new Actor();
        var child = new Actor();
        actor.addChild(child);
        actor.removeChild(child);

        expect(actor.children[child.guid]).toBe(undefined);
        expect(child.parent).toBe(null);
    });*/

    //@TODO destroy/update/initialize
})