//Colors
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");

//Start Area
const startArea = document.getElementById("startArea");
const playBtn = document.getElementById("play-btn");

//Current level Area
const currentLevel = document.getElementById("current-level");

//CONSTS==================================================
const DEFAULT_LEVEL = 10;
const RANDOM_UNO_A_CUATRO = () => Math.floor(Math.random() * 4);

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    this.siguienteNivel();
  }

  //What the game do when starts
  inicializar() {
    startArea.classList.add("hide");
    currentLevel.classList.add("show");
    this.nivel = 7;
    this.colores = {
      red,
      green,
      blue,
      yellow,
    };
  }

  //Capturing the input of levels

  //Generating the random secuence of  numbers for the levels
  generarSecuencia() {
    //catching the input level
    let nivelDeseado = parseInt(document.getElementById("set-level").value);

    if (nivelDeseado > 0) {
      this.secuencia = new Array(nivelDeseado)
        .fill(0)
        .map((n) => RANDOM_UNO_A_CUATRO);
    } else {
      this.secuencia = new Array(DEFAULT_LEVEL)
        .fill(0)
        .map(RANDOM_UNO_A_CUATRO);
    }
  }

  siguienteNivel() {
    this.iluminarSecuencia();
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "red";
      case 1:
        return "green";
      case 2:
        return "blue";
      case 3:
        return "yellow";
    }
  }

  iluminarSecuencia() {
    
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      console.log(color);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  
  iluminarColor(color) {
    
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }
}

function startGame() {
  window.juego = new Juego();
}
