const fs = require("fs");
let str = fs.readFileSync(process.argv[2], "utf-8");
let alph = new Array();
for (let i in str) {
    alph[str[i]] = 0;
}
for (let i in str) {
    alph[str[i]] += 1;
}
console.log(alph);
let p, summa = 0;
for(let j in alph) {
    p = alph[j]/str.length;
    summa -= p*Math.log(p)
}
summa = summa/Math.log(2);
console.log(summa, 'частота символа частого символа');
