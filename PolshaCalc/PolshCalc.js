
let string = process.argv[2].split(/([+\-*\/^)(])/).filter(function (f){return f!==""});
let stack = new Array()
let output = new Array()
let lowprior = {"(": 0, "+": 1, "-": 1, "*": 2, "/": 2,"^":3}
for (let i = 0; i < string.length; i++){
    if (!isNaN(string[i])){
        output.push(string[i])
    }
    else if (string[i] !== ")"){
        while (lowprior[string[i]] <= lowprior[stack[stack.length-1]] && stack.length > 0 && string[i] !== "("){
            output.push(stack.pop())//закидывает последний элемент из стека
        }stack.push(string[i])

    }
    else{
        while (stack[stack.length-1] !== "(") {
            output.push(stack.pop())
        }stack.pop()
    }
    if (i === (string.length - 1)){
        while (stack.length){
            output.push(stack.pop())
        }
    }
}console.log(output.join(" "))
function oper(o1, o2, operation){
    if(operation ==="+"){
        return o1 + o2
    }
    if(operation ==="-"){
        return o1 - o2
    }
    if(operation ==="*"){
        return o1 * o2
    }
    if(operation ==="/"){
        return o1 / o2
    }
    if(operation ==="^"){
        return o1 ** o2
    }
}
for (let i = 0; i < output.length; i++){
    if(isNaN(output[i])){
        output[i] = oper(Number(output[i - 2]), Number(output[i - 1]), output[i])
        output.splice(i-2, 2)
        i = i - 2
    }
}
console.log(output[0])