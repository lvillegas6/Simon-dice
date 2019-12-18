const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const boton = document.getElementById('boton');

class Juego{

    constructor(){
        this.inicializar();
    }

    inicializar(){
        boton.classList.add('hide');
    }
}


function empezarJuego(e){
    var juego = new Juego();
}

boton.addEventListener('click', empezarJuego);






