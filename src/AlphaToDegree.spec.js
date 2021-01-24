const AlphaToDegree = require('./AlphaToDegree')

const assert = require('assert');

describe('AlphaToDegree#convert', () => {
    it('aaa', async () => {
        const converter = new AlphaToDegree();

        const actual = converter.convert("Bm | GM7 A", "D");
        const expect = "Ⅵm | ⅣM7 Ⅴ";

        assert.equal(actual, expect);
    });

    it('aaaa', async () => {
        const converter = new AlphaToDegree();

        const actual = converter.convert("GM7 A | Bm A\nGM7 C | Bsus4 B", "D");
        const expect = "ⅣM7 Ⅴ | Ⅵm Ⅴ ⅣM7 Ⅶ | Ⅵsus4 Ⅵ";

        assert.equal(actual, expect);
    });
});