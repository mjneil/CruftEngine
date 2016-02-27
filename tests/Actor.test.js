import Actor from 'cruft/core/Actor.js';
import Component from 'cruft/core/Component.js';

describe("Actor", () => {

	let actor = null;

	beforeEach(() => {
		actor = new Actor();
	})

    it('generates a random guid', () => {
        expect(actor.guid).toBeTruthy();
    });

    it('accepts a passed in guid', () => {
    	var id = 12;
    	actor = new Actor(id);
        expect(actor.guid).toBe(id);
    });

    it('can add a component', () => {
        var component = new Component()
        actor.addComponent(component);
        expect(actor.getComponent("Component")).toBe(component);
        expect(component.actor).toBe(actor);
    });

    it('can remove a component', () => {
        var component = new Component();
        actor.addComponent(component);
        actor.removeComponent("Component");
        expect(actor.getComponent("Component")).toBe(null);
        expect(component.actor).toBe(null);
    });

    it('can add a child', () => {
        var child = new Actor();
        actor.addChild(child);
        expect(actor.children[child.guid]).toBe(child);
        expect(child.parent).toBe(actor);
    });

    it('can remove a child', () => {
        var child = new Actor();
        actor.addChild(child);
        actor.removeChild(child);

        expect(actor.children[child.guid]).toBe(undefined);
        expect(child.parent).toBe(null);
    });

    //@TODO destroy/update/initialize
})