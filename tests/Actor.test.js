import Actor from 'cruft/core/Actor.js';

describe("Actor", () => {
	let actor = null;

	beforeEach(() => {
		actor = new Actor();
	})

    it('generates a random guid', () => {
        expect(actor.guid).toBeTruthy();
    });

 

})