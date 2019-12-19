const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const boton = document.getElementById('boton');

class Juego{

    constructor(){
        this.inicializar(); //este método siempre va dentro del constructor.
        this.generarSecuencia();
        this.siguienteNivel();
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

    siguienteNivel(){
        this.iluminarSecuencia();
    }

    transformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }
    }

    iluminarSecuencia(){ 
        //En los ciclos for es donde debemos usar let y const, ya que se puede presentar bugs
        //var ya casi no se utiliza.
        //Porque cuando se ejecute el ultimo ciclo, se quedara el ultimo color registrado, haciendo que
        //El setTimeOut siempre ejecute el ultimo color.
        for(let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => { this.iluminarColor(color)}, 1000 * i);
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('target', 'light')
        setTimeout( () => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('target', 'light');
    }
}


function empezarJuego(e){
    window.juego = new Juego(); //Poner esta variable dentro de windows, para poder debugearla. 
    //var juego = new Juego();
}

boton.addEventListener('click', empezarJuego);






