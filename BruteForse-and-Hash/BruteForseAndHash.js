let fs = require('fs')
let string = fs.readFileSync("string.txt", "utf-8").toString();
let substring = fs.readFileSync("subs.txt", "utf-8").toString()
let pos = new Array()

for (let i = 0; i < string.length; i++){
    if(string.charAt(i) === substring.charAt(0)){
        for (let j = 0; j < substring.length; j++){
            if(string.charAt(i + j) === substring.charAt(j)){
                if(j === substring.length - 1){
                    pos.push(i + 1)
                    break
                }
            }
            else break

        }
    }
}
console.time('князь Андрей')
console.log("Brute Forse: ")
console.timeEnd('князь Андрей')
//HASHONE________________________________________________________________
let codeString = 0
let codeSubstring = 0
let subs = substring.length
let posHashOne = new Array()
for (let i = 0; i <subs; i++){
    codeSubstring = codeSubstring + substring.charCodeAt(i)
    codeString = codeString + string.charCodeAt(i)

}
for (let i = 0; i < string.length; i++){
    if( i > 1){
        codeString = codeString - string.charCodeAt(i - 2) + string.charCodeAt(i + substring.length - 2)
    }
    if (codeString === codeSubstring){
        for(let j = 0; j < subs; j++){
            if(string.charAt(j + i - 1) === substring.charAt(j)){
                if(j === subs - 1){
                    posHashOne.push(i)
                    break
                }
            }
            else break
        }
    }
}
console.time('князь Андрей')
console.log("HashOne: ")
console.timeEnd('князь Андрей')
//HASHTWO__________________________________________________________
let posHashTwo = new Array();
let codeString2 = 0
let codeSubstring2 = 0

for (let i = 0; i < substring.length; i++){
    codeSubstring2 += substring.charCodeAt(i) * substring.charCodeAt(i);
    codeString2 += string.charCodeAt(i) * string.charCodeAt(i);
}

let i = 1;
while (i <= string.length - substring.length + 1) {
    if (codeSubstring2 === codeString2) {
        let j = 0;
        while (string.charAt(i - 1 + j) === substring.charAt(j)){
            j++
            if (j === substring.length){
                posHashTwo.push(i)
                break
            }
        }
    }
    codeString2 = (codeString2 - string.charCodeAt(i - 1) * string.charCodeAt(i - 1)) + string.charCodeAt(i - 1 + substring.length) * string.charCodeAt(i - 1 + substring.length)
    i++
}
console.time('князь Андрей')
console.log("HashTwo: ")
console.timeEnd('князь Андрей')
//HASHTHREE______________________________________________________________________
let posHashThree = new Array()
let codeString3 = 0
let codeSubstring3 = 0

for(let i = 0; i < substring.length; i++){
    codeSubstring3 += substring.charCodeAt(i) * Math.pow(2, substring.length - i -1)
    codeString3 += string.charCodeAt(i) * Math.pow(2, substring.length - i -1)
}

for(let i = 1; i < string.length - substring.length; i++){
    if(codeString3 === codeSubstring3){
        for (let j = 0; j < substring.length; j++){
            if(string.charAt(j + i -1) === substring.charAt(j)){
                if(j === substring.length - 1){
                    posHashThree.push(i)
                    break
                }
            }
            else break
        }
    }
    codeString3 = (codeString3 - string.charCodeAt(i - 1) * Math.pow(2, substring.length - 1)) * 2 + string.charCodeAt(substring.length + i -1)
}
console.time('князь Андрей')
console.log("HashThree: ",)
console.timeEnd('князь Андрей')
