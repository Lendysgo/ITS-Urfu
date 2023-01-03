let line = "Папа нас бросил и ушёл к другой тёте, хочу ананас съесть";
let subline = "ананас";
let sizes = subline.length;
let alph = new Array();
//Определяем алфавит строки
for(let i=0;i<sizes;i++)
    alph[subline.charAt(i)]=0
//В двумерном массиве del храним таблицу переходов
let del = new Array(sizes+1);
for(let j=0;j<=sizes;j++){
    del[j] = new Array();
}
//Инициализируем таблицу переходов
for(let i in alph){
    del[0][i]=0;
}
//Формируем таблицу переходов
for(let j=0;j<sizes;j++){
    prev=del[j][subline.charAt(j)]
    del[j][subline.charAt(j)] = j+1;
    for(let i in alph) {
        del[j+1][i] = del[prev][i];
    }
}
//Выводим таблицу переходов
for (let j=0; j<=sizes; j++) {
    out = ""
    for (let i in alph){
        out += del[j][i] + " ";
    }
}
//Выводим шаблон, встретившийся в строке
let state = 0;
for(let i = 0; i < line.length; i++){
    if(line.charAt(i) in alph ){
        state = del[state][line.charAt(i)]
    }
    else state = 0;
    if(state === sizes){
        console.log("Шаблон встречается в заданной строке с позиции --> ",i - sizes+1)
    }
}
