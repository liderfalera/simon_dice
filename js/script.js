const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");

const RANDOM_UNO_A_CUATRO = (n) => Math.floor(Math.random() * 4);

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    this.siguienteNivel();
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    btnEmpezar.classList.add("hide");
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  //GENERAMOS LA SECUENCIA CON DIEZ NUMEROS ALEATORIOS DEL 1 AL 4
  generarSecuencia() {
    this.secuencia = new Array(10).fill(0).map(RANDOM_UNO_A_CUATRO);
  }

  //METODO AL PASAR DE NIVEL
  siguienteNivel() {
    this.iluminarSecuencia();
    this.agregarEventoClick();
  }

  //TRANSFORMANDO LOS NUMEROS DEL 1 AL 4 => A celeste,violeta,naranja y verde
  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }

  //METODO QUE ILUMINA LA SECUENCIA DE COLORES SEGUN EL NIVEL
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  //METODOS PARA ILUMINAR Y LUEGO APAGAR
  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }
  //////////////////////////////////////////////////

  agregarEventoClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
  }

  elegirColor(ev) {
    console.log(this);
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
