const AlphaToDegree = require('./AlphaToDegree')

if (!process.argv[1] || !process.argv[2]) {
    console.log('引数が不足しています。')
} else {
    const alpha2degree = new AlphaToDegree();

    const chordSyntax = process.argv[2];
    const key = process.argv[3];
    const degreeSyntax = alpha2degree.convert(chordSyntax, key)

    // console.log("chordSyntax: " + chordSyntax);
    // console.log("key: " + key);
    console.log(degreeSyntax);
}