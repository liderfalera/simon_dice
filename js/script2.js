//Colors
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");

//Input Area
const inputArea = document.getElementById("input-level");

//Start Area
const startArea = document.getElementById("startArea");
const playBtn = document.getElementById("playBtn");

//Current level Area
const currentLevel = document.getElementById("current-level");

//CONSTS==================================================
const DEFAULT_LEVEL = 10;
const RANDOM_UNO_A_CUATRO = () => Math.floor(Math.random() * 4);

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 700);
  }

  //What the game do when starts
  inicializar(loose) {

    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);

    //catching the amount of levels chose
    this.nivelDeseado = parseInt(document.getElementById("set-level").value);

    //SETTING UI IF LOOSE OR WIN
    if (loose) {
      this.settingTryAgain()
    }else{
      this.settingNuevoJuego()
    }
    ////////////////////////////////

 
    this.nivel = 1;
    this.colores = {
      red,
      green,
      blue,
      yellow,
    };
  }

  
  settingNuevoJuego() {

    if(startArea.classList.contains('hide')){
      startArea.classList.remove("hide");
      inputArea.classList.remove("disabled");
      currentLevel.classList.remove("show");
      document.getElementById('set-level').value = ''  
      playBtn.innerHTML = "PLAY<br/>GAME"
    }else{
      
    startArea.classList.add("hide");
    inputArea.classList.add("disabled");
    currentLevel.classList.add("show");
    playBtn.innerHTML = "PLAY<br/>GAME"
 
    }

  }

  settingTryAgain() {
    startArea.classList.remove("hide");
    inputArea.classList.remove("disabled");
    currentLevel.classList.remove("show");

    playBtn.innerHTML = "TRY<br/>AGAIN"

  }

  //Generating the random secuence of  numbers for the levels
  generarSecuencia() {
    if (this.nivelDeseado > 0) {
      this.secuencia = new Array(this.nivelDeseado)
        .fill(0)
        .map(RANDOM_UNO_A_CUATRO);
    } else {
      this.secuencia = new Array(DEFAULT_LEVEL)
        .fill(0)
        .map(RANDOM_UNO_A_CUATRO);
    }
  }


  siguienteNivel() {

    this.aciertos = 0;
    this.eliminarEventosClick();
    this.iluminarSecuencia();
    //this.agregarEventosClick();

    this.actualizarProgreso();
  }

  /*UPDATING THE PROGRESS*/
  actualizarProgreso() {
    const nivelActual = this.nivel;
    const nivelFinal = this.nivelDeseado;
    if (nivelFinal) {
      document.getElementById("progress-level").innerHTML =
        nivelActual + " / " + nivelFinal;
    } else {
      document.getElementById("progress-level").innerHTML =
        nivelActual + " / " + DEFAULT_LEVEL;
    }
  }

  ////*Number to color*/
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
  transformarColorANumero(color) {
    switch (color) {
      case "red":
        return 0;
      case "green":
        return 1;
      case "blue":
        return 2;
      case "yellow":
        return 3;
    }
  }
  //===========================

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i)
      if(i === (this.nivel - 1)){
        setTimeout(()=>this.agregarEventosClick(),((1000*i)+500))
      }
    }
    
    
  }

  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }

  agregarEventosClick() {
    
    this.colores.red.classList.add('clickable')
    this.colores.green.classList.add('clickable')
    this.colores.blue.classList.add('clickable')
    this.colores.yellow.classList.add('clickable')    

    this.colores.red.addEventListener("click", this.elegirColor);
    this.colores.green.addEventListener("click", this.elegirColor);
    this.colores.blue.addEventListener("click", this.elegirColor);
    this.colores.yellow.addEventListener("click", this.elegirColor);
  }
  eliminarEventosClick() {

    this.colores.red.classList.remove('clickable')
    this.colores.green.classList.remove('clickable')
    this.colores.blue.classList.remove('clickable')
    this.colores.yellow.classList.remove('clickable')  

    this.colores.red.removeEventListener("click", this.elegirColor);
    this.colores.green.removeEventListener("click", this.elegirColor);
    this.colores.blue.removeEventListener("click", this.elegirColor);
    this.colores.yellow.removeEventListener("click", this.elegirColor);
  }

  elegirColor(ev) {
    const colorPickedName = ev.target.dataset.color;
    const colorPickedNumber = this.transformarColorANumero(colorPickedName);
    this.iluminarColor(colorPickedName);
    if (colorPickedNumber === this.secuencia[this.aciertos]) {
      this.aciertos++;
      if (this.aciertos === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();

        if (this.nivel === this.nivelDeseado + 1) {
          //GANASTE
          this.ganaste();
        } else {
          if(this.nivel === 1){
          }else{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Next Level',
              showConfirmButton: false,
              timer: 1000
            }).then(()=>{
              
              setTimeout(this.siguienteNivel, 1500);
            })
          }
          
        }
      }
    } else {
      //PERDISTE
      this.perdiste();
    }
  }

  ganaste() {
    swal("Platzi", "GANASTE EL JUEGO", "success").then(() => {
     
      this.inicializar();
    });
  }
  perdiste() {
    swal("Platzi", "PERDISTE :(", "error").then(() => {
      this.eliminarEventosClick();
      this.inicializar("loose");
    });
  }
}

function startGame() {
  window.juego = new Juego();
}
