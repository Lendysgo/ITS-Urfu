let fs = require("fs");
let str = fs.readFileSync("input.txt", "utf-8");
console.log(str, " <- this is words will coding of huffman")
function Node(letter, freq, used, father, code) {
    //this = {};
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}
let alph = new Array();
for (let i = 0; i < str.length; i++) {
    alph[str.charAt(i)] = 0;
}
for (let i = 0; i < str.length; i++) {
    alph[str.charAt(i)]++;
}
if (str.length > 1){

    let tree = new Array();
    for (i in alph) {
        let index = new Node(i, alph[i], 0, null, '');
        tree.push(index);
    }
//кодировка
    treeLength = tree.length;
    for (let i = 0; i < treeLength - 1; i++) {
        let min1 = -1;
        let min2 = -2;
        let minfreq1 = str.length;
        let minfreq2 = str.length;
        for (let i = 0; i < tree.length; i++) {
            if ((tree[i].used == 0) && (tree[i].freq <= minfreq2)) {
                minfreq1 = minfreq2;
                min1 = min2;
                min2 = i;
                minfreq2 = tree[i].freq;
            } else if (tree[i].used == 0 && tree[i].freq <= minfreq1) {
                minfreq1 = tree[i].freq;
                min1 = i;
            }
        }
        tree[min1].used = 1;
        tree[min2].used = 1;
        tree[min1].father = tree.length;
        tree[min2].father = tree.length;
        tree[min1].code = '0';
        tree[min2].code = '1';
        let newNode = new Node(tree[min2].letter + tree[min1].letter, tree[min1].freq + tree[min2].freq, 0, null, '');
        tree.push(newNode);
    }
//построение бинарного дерева
    for (let i = tree.length - 2; i > -1; i--) {
        tree[i].code = tree[tree[i].father].code + tree[i].code;
    }
    for (let i = 0; i < treeLength; i++) {
        console.log(tree[i].letter + " : " + tree[i].code)
        fs.writeFileSync("subs.txt",tree[i].letter + " : " + tree[i].code, "utf-8" )
        //code table
    }
    let codeStr = '';
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < tree.length; j++) {
            if (str[i] == tree[j].letter) {
                codeStr += tree[j].code;
            }
        }
    }

    fs.writeFileSync("string.txt",codeStr,"utf-8" )
//раскодировка заданного слова
    let decoder = '';
    let codeChar = '';

    for (let i = 0; i < codeStr.length; i++) {
        codeChar += codeStr[i];
        for (let j = 0; j < treeLength; j++) {
            if (codeChar == tree[j].code) {
                decoder += tree[j].letter;
                codeChar = '';
            }
        }
    }

    fs.writeFileSync("three.txt",decoder, "utf-8" )
}

else {
    console.log('more symbol, encoding not possible');
}
