let fs = require('fs')
let arg = process.argv
let magnitude = 8
let mantissed = 23
let nan = "11111111100000000000000000000001"
let infinity = "1111111100000000000000000000000"

if (arg[2] === "convert"){
    let number = fs.readFileSync("input.txt", "utf-8").toString()
    let convert = InternalRepresentationNumbers(number)
    fs.writeFileSync("output.txt", convert)
    console.log(convert)
}

if (arg[2] === "op"){
    let strings = fs.readFileSync("input.txt", "utf-8").toString().split(" ")
    let numberone = InternalRepresentationNumbers(strings[0]);
    let numbertwo = InternalRepresentationNumbers(strings[2]);
    let numbers;
    if(strings[1] === "-")
        numbers = SignenChange(numbertwo)
    else
        numbers = numbertwo
    let op = Addition(numberone, numbers)
    fs.writeFileSync("output.txt", op)
    console.log(Convert(op))
}

function Subtraction(arg1, mantissa1, it1, arg2, mantissa2, it2){
    if (it1 === 255 && it2 === 255)
        return nan
    if (it1 === 255)
        return arg1 + infinity;
    if (it2 === 255)
        return arg2 + infinity;
    let minus = ""
    let arg = ""
    if (Search(mantissa1, mantissa2) < 0){
        minus = MantissedSub(mantissa2, mantissa1);
        arg = "1"
    }
    else{
        minus = MantissedSub(mantissa1, mantissa2);
        arg = "0"
    }
    if (minus[1] === 24)
        return "00000000000000000000000000000000";
    let pow = Math.max(it1, it2);
    let deltaPow = pow - Math.max(0, pow - minus[1]);
    pow -= deltaPow
    let res = minus[0].substr(deltaPow + 1);
    while (res.length < 23)
        res += "0"
    return arg + ConvertBinPow(pow) + res
}
function Addition(numberone, numbertwo){
    if (NaN(numberone) || NaN(numbertwo))
        return nan;
    let arg1 = numberone.charAt(0);
    let arg2 = numbertwo.charAt(0);
    let it1 = ConvertBinDec(numberone.substr(1, magnitude));
    let it2 = ConvertBinDec(numbertwo.substr(1, magnitude));
    let number1 = ""
    let number2 = ""
    if (it1 === 0)
        number1 = "0" + number1.substr(magnitude + 1);
    else
        number1 = "1" + number1.substr(magnitude + 1);
    if(it2 === 0)
        number2 = "0" + numbertwo.substr(magnitude + 1);
    else
        number2 = "1" + numbertwo.substr(magnitude + 1);
    let d = ""
    let deltaPow = Math.abs(it1 - it2);
    for (let i = 0; i < deltaPow; i++)
        d += "0"
    if (it1 > it2)
        number2 = (d + number2).substr(0, mantissed + 1);
    else
        number1 = (d + number1).substr(0, mantissed + 1);

    if (arg1 !== arg2){
        if (arg1 === 0)
            return Subtraction(arg1, number1, it1, arg2, number2, it2);
        return Subtraction(arg2, number2, it2, arg1, number1, it1);
    }
    if (it1 === 255 || it2 === 255)
        return arg1 + infinity;
    let pow = Math.max(it1, it2)
    let mantissa = MantissedAdded(number1, number2);
    pow += mantissa[1]
    let add = mantissa[0].substr(1, mantissed);
    if (pow >= 255)
        return arg1 + infinity
    return arg1 + ConvertBinPow(pow) + add;
}
//внутреннее представление числа

function InternalRepresentationNumbers(number){
    let numb = Number(number);
    if(isNaN(numb)) return nan;
    let result = ""
    if(numb < 0)
        result += "1"
    else
        result += "0"
    numb = Math.abs(numb)
    let num = BinStandardNumbers(numb);
    if(num[1] >= 255)
        result += infinity
    else{
        let pow = ConvertBinPow(num[1]);
        result += pow + num[0]
    }
    return result
}

function Convert(number){
    if (NaN(number))
        return "NaN"
    if (number === "0" + infinity)
        return "+Inf"
    if (number === "1" + infinity)
        return "-Inf"
    let pow = ConvertBinDec(number.substr(1, magnitude)) - 127
    let num = number.substr(magnitude + 1)
    let res = 0
    if(pow === -127)
        num = "0" + num
    else
        num = "1" + num
    let p = Math.pow(2, pow);
    for (let i = 0; i < mantissed + 1; i++){
        res += num.charAt(i) * p
        p /= 2
    }
    return res * (number.charAt(0) === '0' ? 1 : -1)
}

function BinStandardNumbers(number){
    let it = -1
    while (number >= 1){
        number /= 2;
        it++
    }
    while (number < 0.5 && it > -127){
        number *= 2
        it--
    }
    let result = ""
    for (let i = 0; i < mantissed + 1; i++){
        number *= 2;
        if (number >= 1){
            result += "1"
            number -= 1
        }
        else
            result += "0"
    }
    return [result.substr(1), it + 127];
}

function ConvertBinDec(number){
    let resed = 0
    let maxPowNum = number.length - 1;
    for (let i = 0; i < number.length; i++)
        resed += number.charAt(i) << (maxPowNum - i);
    return resed
}

function ConvertBinPow(number){
    let res = ""
    for (let i = 0; i < magnitude; i++){
        res = (number % 2) + res
        number >>= 1
    }
    return res
}

function NaN(number){
    if (number.substr(0, magnitude + 1) !== "111111111")
        return false;
    let lengthNum = magnitude + mantissed + 1
    for (let i = magnitude + 1; i < lengthNum; i++)
        if(number.charAt(i) === "1")	return true;
    return false
}
function MantissedAdded(num1, num2){
    let temp = 0
    let result = ""
    let deltaPow = 0
    for (let i = mantissed; i >= 0; i--){
        result = ((temp + Number(num1.charAt(i)) + Number(num2.charAt(i))) % 2) + result;
        temp = (temp + Number(num1.charAt(i)) + Number(num2.charAt(i))) >> 1;
    }
    while (temp !== 0){
        result = (temp % 2) + result
        temp >>= 1
        deltaPow++
    }
    return [result, deltaPow]
}

function MantissedSub(numberone, numbertwo){
    let temp = 0;
    let result = "";
    for (let i = mantissed; i >= 0; i--){
        let a = Number(numberone.charAt(i));
        let b = temp + Number(numbertwo.charAt(i));
        result = (Math.abs(a - b) % 2).toString() + result;
        if (a - b >= 0)
            temp = 0;
        else
            temp = 1;
    }
    let it = 0;
    for (let i = 0; result.charAt(i) === "0" && i < mantissed + 1; i++)
        it++;
    return [result, it]
}


function Search(num1, num2){
    for (let i = 0; i < mantissed + 1; i++){
        if (num1.charAt(i) === "1" && num2.charAt(i) === "0")
            return 1
        if (num1.charAt(i) === "0" && num2.charAt(i) === "1")
            return -1
    }
    return 0
}
//изменение знака
function SignenChange(num){
    return (num.charAt(0) === "0" ? "1" : "0") + num.substr(1, magnitude + mantissed);
}



