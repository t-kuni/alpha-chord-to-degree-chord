const AlphaToDegree = require('./AlphaToDegree')

const assert = require('assert');

describe('AlphaToDegree#convert', () => {
    it('a', async () => {
        const converter = new AlphaToDegree();

        const actual = converter.convert("Bm | GM7 A", "D");
        const expect = "Ⅵm | ⅣM7 Ⅴ";

        assert.equal(actual, expect);
    });

    it('b', async () => {
        const converter = new AlphaToDegree();

        const actual = converter.convert("GM7 A | Bm A\nGM7 C | Bsus4 B", "D");
        const expect = "ⅣM7 Ⅴ | Ⅵm Ⅴ\nⅣM7 Ⅵ# | Ⅵsus4 Ⅵ";

        assert.equal(actual, expect);
    });

    it('c', async () => {
        const converter = new AlphaToDegree();

        const actual = converter.convert("D#m | B | C# | F# C#/F\nD#m | B | C#sus4 C#", "F#");
        const expect = "Ⅵm | Ⅳ | Ⅴ | Ⅰ Ⅴ/Ⅶ\nⅥm | Ⅳ | Ⅴsus4 Ⅴ";

        assert.equal(actual, expect);
    });

    it('d', async () => {
        const converter = new AlphaToDegree();

        const actual = converter.convert("C7 CM7 Cm7-5 Cdim C7sus4 Caug Cm6 C7(9) Cadd9 CmM7", "C");
        const expect = "Ⅰ7 ⅠM7 Ⅰm7-5 Ⅰdim Ⅰ7sus4 Ⅰaug Ⅰm6 Ⅰ7(9) Ⅰadd9 ⅠmM7";

        assert.equal(actual, expect);
    });
});