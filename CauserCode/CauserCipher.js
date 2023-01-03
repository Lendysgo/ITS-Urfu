let arg = process.argv;
let fs = require('fs');
let symbol = fs.readFileSync('input.txt', 'utf-8').toString().toLowerCase();
let shift = arg[2] * 1;
let cf = new Array();
let ff = new Array();
let key = new Array();
let out_code = "";

let length = 0;
for (let i = 0; i < symbol.length; i++){
    if (symbol[i] !== " " && symbol[i] !== '.' && symbol[i] !== '!' && symbol[i] !== '?' && symbol[i] !== '\r' && symbol[i] !== '\n' && symbol[i] !== '…' && symbol[i] !== ',' && symbol[i] !== '-' && symbol[i] !== ';' && symbol[i] !== ':'){
        cf[symbol.charAt(i)] = 0;
        length++;
    }
}
for (let i = 0; i < symbol.length; i++){
    if (symbol[i] !== " " && symbol[i] !== '.' && symbol[i] !== '!' && symbol[i] !== '?' && symbol[i] !== '\r' && symbol[i] !== '\n' && symbol[i] !== '…' && symbol[i] !== ',' && symbol[i] !== '-' && symbol[i] !== ';' && symbol[i] !== ':'){
        cf[symbol.charAt(i)]++;
    }
}

let amount = 0;
for(let i in cf){
    cf[i] = cf[i]/length;
    amount++
}

let count = 0;
for(let i in cf){
    ff[(count + shift) % amount] = i;
    count++;
}

count = 0;
for (let i in cf){
    key[i] = ff[count++];
}

for (let i = 0; i < symbol.length; i++){
    if (symbol[i] !== " " && symbol[i] !== '.' && symbol[i] !== '!' && symbol[i] !== '?' && symbol[i] !== '\r' && symbol[i] !== '\n' && symbol[i] !== '…' && symbol[i] !== ',' && symbol[i] !== '-' && symbol[i] !== ';' && symbol[i] !== ':'){
        out_code += key[symbol.charAt(i)];
    }
    else{
        out_code += symbol.charAt(i);
    }
}

fs.writeFileSync('code.txt', out_code);


// node caesar_code-decode.js testText.txt 1