// Special math simbols (UTF-16)
// Overline (under root sign): \u0305
let squaredSymbol = String.fromCharCode(0x00B2);
let squareRoot = String.fromCharCode(0x221A);

let functionIn, abrazolGomb;
let grid, menu;
let menuWidth = window.innerWidth * 0.2;
let points = [];
let ps = [];
let currentP;
let currentPt;

function setup() {
    grid = createCanvas(window.innerWidth, window.innerHeight);
    background(255, 255, 255);
    menu = createGraphics(menuWidth, window.innerHeight);
    let abrazolGomb = createButton("Abrazol!");
    abrazolGomb.position(10, 500);
    abrazolGomb.mousePressed(abrazol);
    menu.textSize(15);
    let lenBeforeSqrt = 0; 
    currentP = createP();
    currentP.position(10, 100); 
    currentPt = "normal";
    ps.push([currentPt, currentP]);
    // Input buttons
    let oneButton = createButton("1");
    oneButton.position(10, 300);
    oneButton.mousePressed(function() {currentP.html("1", true)});
    let twoButton = createButton("2");
    twoButton.position(40, 300);
    twoButton.mousePressed(function() {currentP.html("2", true)});
    let threeButton = createButton("3");
    threeButton.position(70, 300);
    threeButton.mousePressed(function() {currentP.html("3", true)});
    let multiplyButton = createButton("*");
    multiplyButton.position(100, 300);
    multiplyButton.mousePressed(function() {currentP.html("*", true)});
    let fourButton = createButton("4");
    fourButton.position(10, 330);
    fourButton.mousePressed(function() {currentP.html("4", true)});
    let fiveButton = createButton("5");
    fiveButton.position(40, 330);
    fiveButton.mousePressed(function() {currentP.html("5", true)});
    let sixButton = createButton("6");
    sixButton.position(70, 330);
    sixButton.mousePressed(function() {currentP.html("6", true)});
    let divideButton = createButton("/");
    divideButton.position(100, 330);
    divideButton.mousePressed(function() {currentP.html("/", true)});
    let sevenButton = createButton("7");
    sevenButton.position(10, 360);
    sevenButton.mousePressed(function() {currentP.html("7", true)});
    let eightButton = createButton("8");
    eightButton.position(40, 360);
    eightButton.mousePressed(function() {currentP.html("8", true)});
    let nineButton = createButton("9");
    nineButton.position(70, 360);
    nineButton.mousePressed(function() {currentP.html("9", true)});
    let squareRootButton = createButton(squareRoot);
    squareRootButton.position(100, 360);
    squareRootButton.mousePressed(function() {
        currentP.html(squareRoot, true);
        currentPt = "squareRoot";
        let charLen = 0;
        for (let i = 0; i < ps.length; i++) {
            charLen += ps[i][1].html().length;
        }
        currentP = createP(); 
        currentP.position(10 + charLen * 8, 100); 
        currentP.style("text-decoration", "overline");
        ps.push([currentPt, currentP]);
    });
    let zeroButton = createButton("0");
    zeroButton.position(10, 390);
    zeroButton.mousePressed(function() {currentP.html("0", true)});
    let plusButton = createButton("+");
    plusButton.position(40, 390);
    plusButton.mousePressed(function() {currentP.html("+", true)});
    let minusButton = createButton("-");
    minusButton.position(70, 390);
    minusButton.mousePressed(function() {currentP.html("-", true)});
    let squareButton = createButton(squaredSymbol);
    squareButton.position(100, 390);
    squareButton.mousePressed(function() {currentP.html(squaredSymbol, true)});
    let absoluteValueButton = createButton("||");
    absoluteValueButton.position(10, 420);
    absoluteValueButton.mousePressed(function() {currentP.html("|", true)});
    let moveLeftButton = createButton("<-");
    moveLeftButton.position(40, 420);
    moveLeftButton.mousePressed();
    let moveRightButton = createButton("->");
    moveRightButton.position(70, 420);
    moveRightButton.mousePressed(function() {
        if (currentPt == "squareRoot") {
            let charLen = 0;
            for (let i = 0; i < ps.length; i++) {
                charLen += ps[i][1].html().length;
            }
            currentP = createP();
            currentP.position(10 + charLen * 8, 100);
            currentPt = "normal";
            ps.push([currentPt, currentP]);
        }
    });
    let xButton = createButton("x");
    xButton.position(100, 420);
    xButton.mousePressed(function() {currentP.html("x", true)});
    let deleteButton = createButton("del");
    deleteButton.position(10, 450);
    deleteButton.mousePressed(function() {
        if (currentP.html().length > 0) {
            currentP.html(currentP.html().slice(0, -1), false);
        }
        else {
            if (ps.length > 1) {
                ps.pop();
                currentP = ps[ps.length-1][1];
                currentP.html(currentP.html().slice(0, -1), false);
            }
        }
    });
}

function draw() {
    stroke("rgba(0, 0, 0, 0.6)");
    for (let i = -20 + (window.innerWidth/2 % 20); i < window.innerWidth; i+=20) {
        for (let j = -20 + (window.innerHeight/2 % 20); j < window.innerHeight; j+=20) {
            rect(i, j, 20, 20);
        }
    }
    stroke(255, 0, 0);
    line(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
    line(0, window.innerHeight / 2, window.innerWidth, window.innerHeight / 2);
    if (points.length > 0) {
        push();
        translate(window.innerWidth / 2, window.innerHeight / 2);
        noFill();
        scale(4, -4);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        for (let i = 0; i < points.length; i+=2) {
            curveVertex(points[i], points[i+1]);
        }
        endShape();
        pop();
    }
    menu.background("rgba(255, 255, 255, 0.5)");
    menu.text("f(x)=", 3, 15);
    image(menu, 0, 0);
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function abrazol() {
    let input = "";
    for (let i = 0; i < ps.length; i++) {
        if (!ps[i][1].html().includes(squareRoot)) {
            input += ps[i][1].html();
        }
        else {
            input += ps[i][1].html().slice(0, -1);
            input += "Math.sqrt("
            input += ps[i+1][1].html() + ")";
            i += 1;
        }
    }
    points = [];
    if (input.includes("|")) {
        while(input.includes("|")) {
            input = input.slice(0, getPosition(input, "|", 1)) + "Math.abs" + input.slice(getPosition(input, "|", 1), input.length);
            input = setCharAt(input, getPosition(input, "|", 1), "(");
            input = setCharAt(input, getPosition(input, "|", 1), ")");
        }
    }
    if (input.includes(squaredSymbol)) {
        while (input.includes(squaredSymbol)) {
            let toBeSquared = input[getPosition(input, squaredSymbol, 1)-1];
            input = setCharAt(input, getPosition(input, squaredSymbol, 1), "*"+toBeSquared);
        }
    }
    console.log(input);
    for (let i = 100; i > -100; i--) {
        x = i;
        points.push(i);
        points.push(eval(input));
    }
}