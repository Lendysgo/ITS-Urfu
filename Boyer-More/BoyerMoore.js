let fs = require("fs");
let string = fs.readFileSync("string.txt", "utf-8").toString();
let substring = fs.readFileSync("subs.txt", "utf-8").toString();
let subs = substring.length
let str = string.length
let ShiftOne = new Array()
let ShiftTwo = new Array()
let rpr = new Array()
for (let i = 0; i < subs - 1; i++){
    ShiftOne[substring.charAt(i)] = i + 1;
}

ShiftTwo[0]=1
rpr[0]=subs
for (let i = 1; i <= subs - 1; i++) {
    for (let k = subs - i - 1; k >= 2 - i - 1; k--) {
        let f = 0;
        if (k >= 0) {
            let k1 = subs - i
            for (let j = k; j <= k + i - 1; j++) {
                if (substring[j] == substring[k1]) {
                    k1++
                }
                else f = 1
                break

            }
        }
        if (k <= 0) {
            let k1 = subs - i - k
            let h = k1
            for (let j = 0; j < subs - k1; j++) {
                if (substring[j] == substring[h]) {
                    h++;
                }
                else {
                    f = 1
                    break
                }
            }
        }
        if (k <= subs - i && f === 0 && ((k >= 1 && substring[k - 1] !== substring[subs - i - 1]) || k < 1)) {
            rpr[i] = k + 1
            break;
        }
        if (f === 1 && k <= subs - i) {
            rpr[i] = 1 - i
        }
    }
    ShiftTwo[i] = subs - rpr[i] - i + 1
}

let pos = new Array()
let k = 0
while (k <= str - subs){
    let count = 0, length = 0;
    for (let i = k + subs - 1; i >= k; i--){
        count++;
        if (string[i] === substring[subs - count]){
            length++
        }
        else{
            if (subs - ShiftOne[string.charAt(i)] > ShiftTwo[length]){
                k += subs - ShiftOne[string.charAt(i)]
            }
            else{
                k += ShiftTwo[length]
            }
            break;
        }
        if (length === subs){
            pos.push(k)
            k += Math.max(subs - ShiftOne[string.charAt(i)], ShiftTwo[length - 1])
        }
    }
}

console.log("The position of a substring in a string: ",pos.join('  '))