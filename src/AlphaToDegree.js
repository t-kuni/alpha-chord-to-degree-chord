module.exports = class AlphaToDegree {
    convert(chordsSyntax, key) {
        const tokens = this.tokenize(chordsSyntax);
        return tokens.map(token => this.parseToken(token))
            .map(node => this.convertNode(node, key))
            .reduce((str, node) => {
                return str + (str.length > 0 ? " " : "") + node.toString();
            }, "")
    }

    tokenize(chordsSyntax) {
        return chordsSyntax.split(/\s+/)
    }

    parseToken(token) {
        if (token === "|") {
            return this.parseSeparatorToken(token)
        }

        return this.parseChordToken(token)
    }

    parseSeparatorToken() {
        return {
            type: "separator",
            toString: function () {
                return "|";
            }
        }
    }

    parseChordToken(token) {
        const matched = token.match(/([A-G](^#|b|)?)(m|sus4)?(7|M7)?/)
        return this.makeChordNode(matched[1], matched[3], matched[4]);
    }

    makeChordNode(root, third, seventh) {
        return {
            type: "chord",
            root,
            third,
            seventh,
            toString: function () {
                return this.root
                    + (this.third ? this.third : "")
                    + (this.seventh ? this.seventh : "");
            }
        }
    }

    convertNode(node, key) {
        if (node.type === "separator") {
            return node;
        }

        if (node.type === "chord") {
            return this.convertChordNode(node, key);
        }
    }

    convertChordNode(node, key) {
        const rootNum = this.alpha2number(node.root);
        const keyNum = this.alpha2number(key);

        const root = this.number2degree(rootNum - keyNum);

        return this.makeChordNode(root, node.third, node.seventh);
    }

    alpha2number(alpha) {
        return {
            "C": 0,
            "C#": 1,
            "D": 2,
            "D#": 3,
            "E": 4,
            "F": 5,
            "F#": 6,
            "G": 7,
            "G#": 8,
            "A": 9,
            "A#": 10,
            "B": 11,
        }[alpha];
    }

    number2degree(number) {
        if (number < 0) {
            number += 13
        }

        return [
            "Ⅰ",
            "Ⅰ#",
            "Ⅱ",
            "Ⅱ#",
            "Ⅲ",
            "Ⅳ",
            "Ⅳ#",
            "Ⅴ",
            "Ⅴ#",
            "Ⅵ",
            "Ⅵ#",
            "Ⅶ",
        ][number]
    }
}