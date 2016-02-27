import Component from 'cruft/core/Component.js';

describe("ActorFactory", () => {

	let component = null;

	beforeEach(() => {
		component = new Component();
	})

    it('has a guid', () => {
        expect(component.guid).toBeTruthy();
    });


})