const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const boton = document.getElementById('boton');

class Juego{

    constructor(){
        this.inicializar(); //este método siempre va dentro del constructor.
        this.generarSecuencia();
    }

    inicializar(){
        boton.classList.add('hide');
        this.nivel = 1;
        this.colores = {
            //celeste: celeste, esto es equivalente.
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia(){
                        //generar array de 10 elemeto, luego colocando el valor 0 a cada elemento
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
    }

}


function empezarJuego(e){
    window.juego = new Juego(); //Poner esta variable dentro de windows, para poder debugearla. 
    //var juego = new Juego();
}

boton.addEventListener('click', empezarJuego);






