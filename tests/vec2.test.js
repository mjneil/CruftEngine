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

    it('should add 2 vecs without modifying second', () => {
        let b = new vec2(1,2);

        expect(vec.x).toBe(0);
        expect(vec.y).toBe(0);

        vec.add(b);

        expect(vec.x).toBe(1);
        expect(vec.y).toBe(2);

        expect(b.x).toBe(1);
        expect(b.y).toBe(2);
    })

    
})