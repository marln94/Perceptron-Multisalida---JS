class Perceptron {
    constructor(vectorEntrada, vectorSalida) {
        // Inicialización de variables
        this.umbral = 0;
        this.tazaAprendizaje = 1;
        this.parar = false;

        // Paso 0
        this.w = [];
        for (let i = 0; i < 63; i++) {
            this.w[i] = [];
            for (let j = 0; j < 5; j++) {
                this.w[i][j] = Math.random();
            }
        }
        this.bias = [];
        for (let i = 0; i < 5; i++) {
            this.bias[i] = Math.random();
        }

        this.vectorEntrada = vectorEntrada;
        this.vectorSalida = vectorSalida;
    }

    ejecutar() {
        let x = [];
        let y = [];
        // Paso 1
        while (!this.parar) {
            // Paso 2

            let contador = 0;
            for (let k = 0; k < this.vectorEntrada.length; k++) {
                const s = this.vectorEntrada[k];
                const t = this.vectorSalida[k];

                // Paso 3
                x = [];
                s.forEach(e => x.push(e));

                // Paso 4
                y = [];
                let y_in = 0;
                for (const j in this.bias) {
                    y_in = this.bias[j];
                    for (const i in this.w) {
                        y_in += (x[i] * this.w[i][j]);
                    }
                    y.push(this.funcionDisparo(y_in));
                }

                // Paso 5
                for (const j in this.bias) {
                    // console.log("contador: " + contador);

                    if (t[j] === y[j]) {
                        contador++;
                        // if (contador < this.vectorEntrada.length * this.bias.length) {
                        if (contador < 69) {
                            this.parar = false;
                            continue;
                        } else {
                            this.parar = true;
                            return;
                        }
                    } else {
                        contador = 0;
                        this.parar = false;
                        this.bias[j] = this.bias[j] + (t[j] * this.tazaAprendizaje);

                        for (const i in this.w) {
                            this.w[i][j] = this.w[i][j] + (t[j] * x[i] * this.tazaAprendizaje);
                        }
                    }
                }
            }

        }

    }

    get pesos() {
        return this.w;
    }

    get biases() {
        return this.bias;
    }

    evaluar(vectorEntrada) {
        let y = [];
        let y_in = 0;
        for (const j in this.bias) {
            y_in = this.bias[j];
            for (const i in this.w) {
                y_in += (vectorEntrada[i] * this.w[i][j]);
            }
            y.push(this.funcionDisparo(y_in));
        }
        console.log("Salidas de la red:\n" + y);
        return y;
    }

    funcionDisparo(y_in) {
        if (y_in > this.umbral) {
            return 1;
        } else if (y_in >= (-1 * this.umbral) && y_in <= this.umbral) {
            return 0;
        } else {
            return -1;
        }
    }
}


// Preparar pares de entrenamiento
let vectorEntrada = []
let vectorSalida = [];
for (const letra of letras) {
    vectorEntrada.push(letra.slice(0, 63));
    vectorSalida.push(letra.slice(63));
}

let p = new Perceptron(vectorEntrada, vectorSalida);
p.ejecutar();
// console.log(p.pesos);
// for (const letra of vectorEntrada) {
//     p.evaluar(letra)
// }