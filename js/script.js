const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");

const RANDOMUNO_CUATRO = (n) => Math.floor(Math.random() * 4);
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel(), 500);
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  //VERIFICA Y OCULTA/MUESTRA EL BOTON EMPEZAR JUEGA
  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }
  ///////////////////////////////////////////////////

  //GENERAMOS LA SECUENCIA CON DIEZ NUMEROS ALEATORIOS DEL 1 AL 4
  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(RANDOMUNO_CUATRO);
  }

  //METODO AL PASAR DE NIVEL
  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventoClick();
  }

  //TRANSFORMANDO LOS NUMEROS DEL 1 AL 4 => A celeste,violeta,naranja y verde y VICEVERSA
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

  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }
  //////////////////////////////////////////////////////////////////

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

  //CAPTURAMOS EL CLICK DEL USUARIO Y
  agregarEventoClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
  }
  eliminarEventosClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);

    //SI EL USUARIO TOCA EL BOTON CORRECTO
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          //GANASTE EL JUEGO
          this.ganaste();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    }
    //SI EL BOTON ES INCORRECTO
    else {
      //PERDISTE
      this.perdiste();
    }
  }

  ganaste() {
    swal("SIMON DICE", "Ganaste!", "success").then(this.inicializar);
  }

  perdiste() {
    swal("SIMON DICE", "Perdiste! :(", "error").then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
