import Actor from 'cruft/core/Actor.js';

describe("Actor", () => {

	let actor = null;

	beforeEach(() => {
		actor = null;
	})

    it('generates a random guid', () => {
    	actor = new Actor();
        expect(actor.guid).toBeTruthy();
    });

    it('accepts a passed in guid', () => {
    	var id = 12;
    	actor = new Actor(id);
        expect(actor.guid).toBe(id);
    });

 

})