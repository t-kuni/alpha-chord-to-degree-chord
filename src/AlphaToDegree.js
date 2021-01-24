module.exports = class AlphaToDegree {
    convert(chordsSyntax, key) {
        const tokens = this.tokenize(chordsSyntax);
        const alphabetNodes = tokens.map(token => this.parseToken(token));
        const degreeNodes = alphabetNodes.map(node => this.convertNode(node, key));
        return degreeNodes.reduce((str, node, i, nodes) => {
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
        const matched = token.match(/^(?<root>[A-G](#|b|)?)(?<option>[^/]*)?(\/(?<baseRoot>[A-G](#|b|)?))?$/)
        return this.makeChordNode(matched.groups.root, matched.groups.option, matched.groups.baseRoot);
    }

    makeChordNode(root, option, baseRoot) {
        return {
            type: "chord",
            root,
            option,
            baseRoot,
            toString: function () {
                return this.root
                    + (this.option ? this.option : "")
                    + (this.baseRoot ? "/" + this.baseRoot : "")
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
        const rootDeg = this.alpha2degree(node.root);
        const keyDeg = this.alpha2degree(key);
        const relatedDeg = this.calcRelatedDegreeByKey(rootDeg, keyDeg);
        const root = this.degree2degreeChar(relatedDeg);

        let baseRoot = null;
        if (node.baseRoot) {
            const baseRootDeg = this.alpha2degree(node.baseRoot);
            const relatedDeg = this.calcRelatedDegreeByKey(baseRootDeg, keyDeg);
            baseRoot = this.degree2degreeChar(relatedDeg);
        }

        return this.makeChordNode(root, node.option, baseRoot);
    }

    calcRelatedDegreeByKey(rootDeg, keyDeg) {
        let deg = rootDeg - keyDeg;

        if (deg < 0) {
            deg = 12 + deg;
        }

        return deg;
    }

    alpha2degree(alpha) {
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

    degree2degreeChar(degree) {
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
        ][degree]
    }
}