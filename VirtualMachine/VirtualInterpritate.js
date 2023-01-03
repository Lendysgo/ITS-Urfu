fs = require("fs")
file = fs.readFileSync(process.argv[2], "utf8")
let memVar = new Array(6);
let s = "";
for (let i of file.split("\n")) {
    s += i + " _ ";
}
let memory = memVar.concat(s.split(" "));
memory.pop()
let instruction_pointer = 6;
let argv = 3;//начало ввода аргументов
let save_instruction_pointer;
while (memory [instruction_pointer] !== "exit") {
    switch (memory[instruction_pointer]) {
        case "stg":
            memory[memory[instruction_pointer + 1]] = memory[instruction_pointer + 2]
            instruction_pointer += 3
        case "_":
            instruction_pointer++
            break
        case "jumpstart":
            save_instruction_pointer = instruction_pointer
            instruction_pointer++
            break
        case "jumpfinish":
            instruction_pointer = save_instruction_pointer;
            break
        case "cmp":
            if (memory [instruction_pointer + 2] === ">" && Number(memory[memory[instruction_pointer + 1]]) > Number(memory [memory [instruction_pointer + 3]])) {
                instruction_pointer += 4
                break
            }
            if (memory [instruction_pointer + 2] === "==" && Number(memory[memory[instruction_pointer + 1]]) === Number(memory [memory [instruction_pointer + 3]])) {
                instruction_pointer += 4
                break
            }
            if (memory [instruction_pointer + 2] === "<" && Number(memory[memory[instruction_pointer + 1]]) < Number(memory [memory [instruction_pointer + 3]])) {
                instruction_pointer += 4
                break
            }
            if (memory [instruction_pointer + 2] === "!=" && Number(memory[memory[instruction_pointer + 1]]) !== Number(memory [memory [instruction_pointer + 3]])) {
                instruction_pointer += 4
                break
            } else {
                instruction_pointer += 5
                while (memory[instruction_pointer] !== "_") {
                    instruction_pointer++
                }
                break
            }
        case "cmpbool":
            if (memory [instruction_pointer + 2] === ">" && Number(memory[memory[instruction_pointer + 1]]) > Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "true"
                instruction_pointer += 5
                break
            }
            if (memory [instruction_pointer + 2] === ">" && Number(memory[memory[instruction_pointer +1]]) < Number(memory [memory [instruction_pointer +3]]))
            {
                memory[memory[instruction_pointer+4]] = "false"
                instruction_pointer +=5
                break
            }
            if (memory [instruction_pointer + 2] === ">" && Number(memory[memory[instruction_pointer +1]]) === Number(memory [memory [instruction_pointer +3]]))
            {
                memory[memory[instruction_pointer+4]] = "false"
                instruction_pointer +=5
                break
            }
            if (memory [instruction_pointer + 2] === "==" && Number(memory[memory[instruction_pointer + 1]]) === Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "true"
                instruction_pointer += 5
                break
            }
            if (memory [instruction_pointer + 2] === "==" && Number(memory[memory[instruction_pointer + 1]]) > Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "false"
                instruction_pointer += 5
                break
            }
            if (memory [instruction_pointer + 2] === "==" && Number(memory[memory[instruction_pointer + 1]]) < Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "false"
                instruction_pointer += 5
                break
            }
            if (memory [instruction_pointer + 2] === "<" && Number(memory[memory[instruction_pointer + 1]]) < Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "true"
                instruction_pointer += 5
                break
            }
            if (memory [instruction_pointer + 2] === "<" && Number(memory[memory[instruction_pointer + 1]]) > Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "false"
                instruction_pointer += 5
                break
            }
            if (memory [instruction_pointer + 2] === "<" && Number(memory[memory[instruction_pointer + 1]]) === Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "false"
                instruction_pointer += 5
                break
            }
            if (memory [instruction_pointer + 2] === "!=" && Number(memory[memory[instruction_pointer + 1]]) !== Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "true"
                instruction_pointer += 5
                break
            }
            if (memory [instruction_pointer + 2] === "!=" && Number(memory[memory[instruction_pointer + 1]]) !== Number(memory [memory [instruction_pointer + 3]])) {
                memory[memory[instruction_pointer + 4]] = "false"
                instruction_pointer += 5
                break
            }
            else {
                instruction_pointer += 6
                while (memory[instruction_pointer] !== "_") {
                    instruction_pointer++
                }
                break
            }
        case "input"://реализация ввода с терминала
            memory[memory[instruction_pointer + 1]] = process.argv[argv]
            argv += 1
            instruction_pointer += 2
            break;
        case "output"://реализация вывода в терминал
            console.log(memory [memory [instruction_pointer + 1]])
            instruction_pointer += 2
            break
        case "add"://реализация сложения
            memory [memory [instruction_pointer + 3]] = memory [memory [instruction_pointer + 1]] * 1 + memory [memory [instruction_pointer + 2]] * 1
            instruction_pointer += 4
            break
        case "diff"://реализаци вычитания
            memory [memory [instruction_pointer + 3]] = memory [memory [instruction_pointer + 1]] * 1 - memory [memory [instruction_pointer + 2]] * 1
            instruction_pointer += 4
            break
        case "multi"://реализация произведения
            memory[memory[instruction_pointer + 3]] = memory[memory[instruction_pointer + 1]] * memory[memory[instruction_pointer + 2]]
            instruction_pointer += 4
            break
    }
}
