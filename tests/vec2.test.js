import vec2 from 'cruft/math/vec2.js';

describe('vec2', () => {
    let vec;

    beforeEach(() => {
        vec = vec2.zero();
    });

    it('should be an a 0 vec2. i.e. (0,0)', () => {
        expect(vec.x).toBe(0);
        expect(vec.y).toBe(0);
    });

    
})