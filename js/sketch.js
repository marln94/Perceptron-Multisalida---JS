class Casilla {
    constructor(i, j) {
        this.tamanoCasilla = 15

        this.x = (width / 2) + j * this.tamanoCasilla;
        this.y = (height / 2) + i * this.tamanoCasilla;

        this.activada = false;
    }
    update() {

        if ((mouseX > this.x &&
                mouseX < this.x + this.tamanoCasilla &&
                mouseY > this.y &&
                mouseY < this.y + this.tamanoCasilla) ||
            this.activada
        ) {
            fill(200);
        } else {
            fill(255);
        }
        strokeWeight(1);
        stroke(51);
        rect(this.x, this.y, this.tamanoCasilla, this.tamanoCasilla);
    }

    click() {
        if (mouseX > this.x &&
            mouseX < this.x + this.tamanoCasilla &&
            mouseY > this.y &&
            mouseY < this.y + this.tamanoCasilla
        ) {
            this.activada = !this.activada;
        }
    }
}

let rejilla = [];
let div = document.getElementById("label");

function setup() {
    for (let i = 0; i < 9; i++) {
        rejilla[i] = [];
        for (let j = 0; j < 7; j++) {
            rejilla[i][j] = new Casilla(i, j);
        }
    }
    createCanvas(400, 400);
}

function draw() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 7; j++) {
            rejilla[i][j].update();
        }
    }
}

function mouseClicked() {
    let letra = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 7; j++) {
            rejilla[i][j].click();

            if (rejilla[i][j].activada) {
                letra.push(1);
            } else {
                letra.push(-1);
            }
        }
    }
    let salida = p.evaluar(letra);
    for (const key in patronesLetras) {
        if (isEqual(patronesLetras[key], salida.slice(0, 3))) {
            div.innerHTML = "Es una: " + key;
            console.log("Es una: " + key);
            return false;
        }
    }
    div.innerHTML = "No reconozco eso";
    return false;
}
let patronesLetras = {
    "A": [1, 1, 1],
    "B": [1, 1, -1],
    "C": [1, -1, 1],
    "D": [1, -1, -1],
    "E": [-1, 1, 1],
    "J": [-1, 1, -1],
    "K": [-1, -1, 1]
}







function isEqual(value, other) {

    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function(item1, item2) {

        // Get the object type
        var itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        }

        // Otherwise, do a simple comparison
        else {

            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false;
            } else {
                if (item1 !== item2) return false;
            }

        }
    };

    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }

    // If nothing failed, return true
    return true;

};