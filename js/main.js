const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const boton = document.getElementById('boton');
const ULTIMO_NIVEL = 10;

const delay = time => new Promise(resolveCallback => setTimeout(resolveCallback, time));


class Juego{

    constructor(){
        this.inicializar(); //este método siempre va dentro del constructor.
        this.generarSecuencia();
        this.siguienteNivel();
    }

    inicializar(){
        //De esta manera elegirColor siempre va a estar atada a la clase o objeto JUEGO
        //No va a poder cambiar el contexto no importa si lo llama el navegador, settimeOut siemppre this estara atada al juego.
        //Por lo general esto pasa cuando pasamos un callback por referencia, por ejemplo .then(algo)
        //para evitar que se pierda el contexto podemos usar .then( () => algo() );
        //o simplemente this.algo = this.algo.bind(this) asi nunca perdemos el contexto.
        this.elegirColor = this.elegirColor.bind(this); //ESTO ES PARA CAMBIAR EL CONTEXTO, bind(this | juego) para atar la funcion al objeto del juego.
        boton.classList.add('hide');
        this.nivel = 1;
        this.colores = {
            //celeste: celeste, esto es equivalente.
            celeste,
            violeta,
            naranja,
            verde
        }
        this.coloresArray = Object.values(this.colores);
    }

    generarSecuencia(){
                        //generar array de 10 elemeto, luego colocando el valor 0 a cada elemento
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    siguienteNivel(){
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
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

    transformarColorANumero(color){
        switch(color){
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
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

    agregarEventosClick(){
        this.coloresArray.forEach(colores => {
            //No podemos poner el .bind() aqui (this.elegircolor.bind(this))
            //Ya que bind() retorna un nuevo contexto (scope)
            //por lo que cuando se agregan los eventos clic funciona bien pero al usar la función 
            //eliminarEventosClic no coinciden los contextos (scopes) con los agregados y no los elimina.
            colores.addEventListener('click', this.elegirColor); 
        });
    }

    eliminarEventosClick(){
        this.coloresArray.forEach(colores => {
            colores.removeEventListener('click', this.elegirColor);
        });
    }

    elegirColor(e){
        const nombreColor = e.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor) ;
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++;

            if(this.subnivel === this.nivel){
                this.nivel++;
                this.eliminarEventosClick();

                if(this.nivel === (ULTIMO_NIVEL +1)){
                    //GANA!
                }else{
                    delay(1500)
                        .then(() => this.siguienteNivel());

                }
            }


        }else{
            this.perderJuego();
        }
    }

    perderJuego(){

    }

}


function empezarJuego(e){
    window.juego = new Juego(); //Poner esta variable dentro de windows, para poder debugearla. 
    //var juego = new Juego();
}

boton.addEventListener('click', empezarJuego);






