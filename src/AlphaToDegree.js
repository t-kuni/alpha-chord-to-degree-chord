module.exports = class AlphaToDegree {
    convert(chordsSyntax, key) {
        const tokens = this.tokenize(chordsSyntax);
        return tokens.map(token => this.parseToken(token))
            .map(node => this.convertNode(node, key))
            .reduce((str, node, i, nodes) => {
                const notHeadNode = str.length > 0
                const notLineBreakNode = node.type !== "line_break";
                const prevNodeIsNotLineBreakNode = i !== 0 && nodes[i - 1].type !== "line_break";
                const space = notHeadNode && notLineBreakNode && prevNodeIsNotLineBreakNode ? " " : ""
                return str + space + node.toString();
            }, "")
    }

    tokenize(chordsSyntax) {
        /*
         * 改行文字でトークンを分割しつつ、トークンとして残したいため以下の処理順になっている
         * 1. 文章を行に分割
         * 2. 行毎にトークナイズ
         * 3. 行毎のトークンリストを改行トークンを挟みつつ結合する
         */
        const lines = chordsSyntax.split("\n");
        return lines.map(l => l.split(/\s+/))
            .reduce((array, tokens) => {
                if (array.length > 0) {
                    array.push("\n");
                }
                return array.concat(tokens);
            }, [])
    }

    parseToken(token) {
        if (token === "|") {
            return this.parseSeparatorToken(token)
        }

        if (token === "\n") {
            return this.parseLineBreakToken(token);
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

    parseLineBreakToken() {
        return {
            type: "line_break",
            toString: function () {
                return "\n";
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
            },
        }
    }

    convertNode(node, key) {
        if (node.type === "chord") {
            return this.convertChordNode(node, key);
        }

        return node;
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