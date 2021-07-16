const GAMES_TO_PLAY = 10;
let counter = 0;

function start() {
    alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.');
    play();
}

function play() {
    var a = new Date();
    ask();
    var b = new Date();
    let time = b - a;
    let secs = (time/1000).toFixed(2);
    alert('You answered ' + counter + ' of 10 questions correctly in ' + secs + ' seconds.\nAverage time to answer: ' + secs/10);
    let cont = confirm('Another game?');
    if (cont) { start(); }
}

function ask() {
    let count = 0;
    while (count < GAMES_TO_PLAY) {
    let aynRand = randomNumber(1, 4);
        switch (aynRand) {
            case 1:
                sumQ();
                count++;
                break;
            case 2: 
                difQ();
                count++;
                break;
            case 3:
                prodQ();
                count++;
                break;
            case 4:
                quatQ();
                count++;
                break;
            }
        }
}

function sumQ() {
    let num = randomNumber(1, 100);
    let num2 = randomNumber(1, 100);
    let rettSvar = num + num2;
    let svar = prompt(num + ' + '  + num2 + ' ? ');
    if (svar == rettSvar) {
        counter++;
    } else if (svar == null) { 
        alert('Start over?'); 
        start(); 
    }
}

function difQ() {
    let num = randomNumber(1, 100);
    let num2 = randomNumber(1, 100);
    let rettSvar = num - num2;
    let svar = prompt(num + ' - '  + num2 + ' ? ');
    if (svar == rettSvar) {
        counter++;
    } else if (svar == null) { 
        alert('Start over?'); 
        start(); 
    }
}

function prodQ() {
    let num = randomNumber(1, 10);
    let num2 = randomNumber(1, 10);
    let rettSvar = num * num2;
    let svar = prompt(num + ' * '  + num2 + ' ? ');
    if (svar == rettSvar) {
        counter++;
    } else if (svar == null) { 
        alert('Start over?'); 
        start(); 
    }
}

function quatQ() {
    let num = randomNumber(2, 10);
    let num2 = num * randomNumber(2, 10);
    let rettSvar = num2 / num;
    let svar = prompt(num2 + ' / '  + num + ' ? ');
    if (svar == rettSvar) {
        counter++;
    } else if (svar == null) { 
        alert('Start over?'); 
        start(); 
    }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

start();
