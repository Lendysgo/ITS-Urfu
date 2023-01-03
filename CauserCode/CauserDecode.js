let fs = require('fs')
let symbol = fs.readFileSync('code.txt', 'utf-8').toString().toLowerCase()
let cf= new Array()
let ff = new Array()
let freq = new  Array()
cf['а'] = 0.07998; cf['б'] = 0.01592; cf['в'] = 0.04533; cf['г'] = 0.01687; cf['д'] = 0.02977; cf['е'] = 0.08483;
cf['ё'] = 0.00013; cf['ж'] = 0.00940; cf['з'] = 0.01641; cf['и'] = 0.07367; cf['й'] = 0.01208; cf['к'] = 0.03486;
cf['л'] = 0.04343; cf['м'] = 0.03203; cf['н'] = 0.06700; cf['о'] = 0.10983; cf['п'] = 0.02804; cf['р'] = 0.04746;
cf['с'] = 0.05473; cf['т'] = 0.06318; cf['у'] = 0.02615; cf['ф'] = 0.00267; cf['х'] = 0.00966; cf['ц'] = 0.00486;
cf['ч'] = 0.01450; cf['ш'] = 0.00718;  cf['щ'] = 0.00362; cf['ъ'] = 0.00038; cf['ы'] = 0.01898; cf['ь'] = 0.01735;
cf['э'] = 0.00331; cf['ю'] = 0.00638; cf['я'] = 0.02001;


let length = 0
for (let i = 0; i < symbol.length; i++){
    if (symbol.charAt(i) !== " " && symbol[i] !== '.' && symbol[i] !== '!' && symbol[i] !== '?' && symbol[i] !== '\r' && symbol[i] !== '\n' && symbol[i] !== '…' && symbol[i] !== ',' && symbol[i] !== '-' && symbol[i] !== ';' && symbol[i] !== ':'){
        ff[symbol.charAt(i)] = 0
        length++
    }
}
for (let i = 0; i < symbol.length; i++){
    if (symbol.charAt(i) !== " " && symbol[i] !== '.' && symbol[i] !== '!' && symbol[i] !== '?' && symbol[i] !== '\r' && symbol[i] !== '\n' && symbol[i] !== '…' && symbol[i] !== ',' && symbol[i] !== '-' && symbol[i] !== ';' && symbol[i] !== ':'){
        ff[symbol.charAt(i)]++
    }
}

let total = 0
for (let i in ff){
    ff[i] = ff[i]/length
    freq[total++] = ff[i]
}

let shift = 0
let sum
let min = 2
let mined = 0
for (let i = 0; i <= total; i++){
    sum = 0
    let count = 0
    for (let j in ff){
        sum += Math.pow(freq[(count + shift)%total] - cf[j], 2)
        count++;
    }
    if (min > sum){
        min = sum
        mined = shift
    }
    shift++
}

let key = new Array()
let count = 0
let move = new Array()
for (let i in ff){
    move[(count + mined) % total] = i;
    count++
}

count = 0
for (let i in ff){
    key[i] = move[count++]
}

let output = ""
for (let i = 0; i < symbol.length; i++){
    if (symbol[i] !== " " && symbol[i] !== '.' && symbol[i] !== '!' && symbol[i] !== '?' && symbol[i] !== '\r' && symbol[i] !== '\n' && symbol[i] !== '…' && symbol[i] !== ',' && symbol[i] !== '-' && symbol[i] !== ';' && symbol[i] !== ':'){
        output += key[symbol.charAt(i)]
    }
    else output += symbol.charAt(i)


}

fs.writeFileSync('decode.txt', output);
