"use strict";
/* Esta clase hace que el juego de mayor o menor funcione. Se encarga de comunicarse con la clase Jugador, y la clase Pantalla...
Todo lo maneja desde el metodo jugar(). Que tiene un bucle que se repite hasta que le digas que no, o hasta que te quedes sin dinero
Los otros metodos que surgen segun se los necesite son los de leer o modificar los atributos de la clase, un metodo del reglamento
que devuelve un string, que luego se mostrara en pantalla.

Los atributos que tiene son el titulo del juego, las cartas una, la de la mesa, y dos la proxima a salir, el jugador y el mazo con el
que se va a dar las cartas.

Los demas metodos estan comentados*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MayorOmenor = void 0;
const colors_1 = require("colors");
const cartas_1 = require("./cartas");
const mazo_1 = require("./mazo");
const readlineSync = __importStar(require("readline-sync"));
class MayorOmenor {
    constructor(pJugador, pTitulo) {
        this.mazo = new mazo_1.Mazo();
        this.titulo = pTitulo;
        this.carta1 = new cartas_1.Cartas("Instrucciones");
        this.carta2 = new cartas_1.Cartas("Dorso");
        ;
        this.jugador = pJugador;
    }
    getNombre() {
        return this.titulo;
    }
    getCarta1() {
        return this.carta1;
    }
    getCarta2() {
        return this.carta2;
    }
    setCarta1(pCarta1) {
        this.carta1 = pCarta1;
    }
    setCarta2(pCarta2) {
        this.carta2 = pCarta2;
    }
    reglamentoJuego() {
        const reglamento = new Array;
        reglamento.push(`El juego consiste en acertar si la sigueiente carta es mayor o menor`);
        reglamento.push(`Primero debe apostar las fichas que cree conveniente, RECUERDE,`);
        reglamento.push(`tiene que apostar más de una ficha y menos del total de fichas que posee.`);
        reglamento.push(`Despues se le mostrara una carta en la mesa, debe adivinar si la siguiente es mayor o menor,`);
        reglamento.push(`si sale algún comodín automaticamente pierde la apuesta y se vuelve a abarajar.`);
        reglamento.push(`Mientras menos probabilidades de ganar tenga, mayor va a ser el premio`);
        reglamento.push(`Si en el mazo hay menos de 15 cartas se vuelve a abarajar.\n`);
        return reglamento;
    }
    cantidadCartasMazo() {
        return 56 - this.mazo.getDescarte().length;
    }
    probabilidadMayor() {
        const carta1aux = parseInt(this.carta1.getCartas().replace(/\D/g, "")); // Lee el numero de la carta que esta en la mesa, si es comodin es undefined
        const casosPosibles = this.cantidadCartasMazo(); // Total de cartas en el mazo
        let casosProbables = (13 - carta1aux) * 4; // cantidad de cartas mayores a la carta que esta en la mesa
        for (let i = 0; i < this.mazo.getDescarte().length; i++) { // recorre el descarte, buscando el numero de cartas y la cantidad de cartas mayores.
            if (parseInt(this.mazo.getNombreCarta(this.mazo.getDescarte()[i]).replace(/\D/g, "")) > carta1aux) { //Pregunta si la carta es mayor a la carta de la mesa
                casosProbables = casosProbables - 1; // Si es mayor le resta 1 a los casos probables.
            }
        }
        return Number((casosProbables / casosPosibles * 100).toFixed(0)); // retorna el porcentaje de probabilidades que tiene de salir una carta mayor con 0 decimales.
    }
    probabilidadMenor() {
        const carta1aux = parseInt(this.carta1.getCartas().replace(/\D/g, "")); // Lee el numero de la carta que esta en la mesa, si es comodin es undefined
        const casosPosibles = this.cantidadCartasMazo(); // Total de cartas en el mazo
        let casosProbables = (carta1aux - 1) * 4; // cantidad de cartas menores a la carta que esta en la mesa
        for (let i = 0; i < this.mazo.getDescarte().length; i++) { // recorre el descarte, buscando el numero de cartas y la cantidad de cartas menores.
            if (parseInt(this.mazo.getNombreCarta(this.mazo.getDescarte()[i]).replace(/\D/g, "")) < carta1aux) { //Pregunta si la carta es menor a la carta de la mesa
                casosProbables = casosProbables - 1; // Si es menor le resta 1 a los casos probables.
            }
        }
        return Number((casosProbables / casosPosibles * 100).toFixed(0)); // retorna el porcentaje de probabilidades que tiene de salir una carta menor con 0 decimales.  
    }
    probabilidadComodin() {
        const casosPosibles = this.cantidadCartasMazo(); // Total de cartas en el mazo
        let casosProbables = 4; // cantidad de comodines en el mazo 
        return Number((casosProbables / casosPosibles * 100).toFixed(0)); // retorna el porcentaje de probabilidades que tiene de salir un comodin con 0 decimales.  
    }
    verificaMayor() {
        let condicion;
        if (parseInt(this.carta1.getCartas().replace(/\D/g, "")) < parseInt(this.carta2.getCartas().replace(/\D/g, ""))) { // Obtengo solo el numero de la carta en cuestión
            condicion = true;
        }
        else {
            condicion = false;
        }
        return condicion;
    }
    verificaMenor() {
        let condicion;
        if (parseInt(this.carta1.getCartas().replace(/\D/g, "")) > parseInt(this.carta2.getCartas().replace(/\D/g, ""))) { // Obtengo solo el numero de la carta en cuestión
            condicion = true;
        }
        else {
            condicion = false;
        }
        return condicion;
    }
    verificaComodin() {
        let condicion;
        if (this.carta1.getCartas().replace(/\D/g, "") === undefined) { // Obtengo solo el numero de la carta como el comodin no tiene numero me devuelve un undefined
            condicion = true;
        }
        else {
            condicion = false;
        }
        return condicion;
    }
    calcularPremio(pApuesta) {
        let premio = 0;
        if (this.verificaComodin() === true) { //Verifica que la segunda carta no sea comodin, si lo es, reestablece el descarte
            this.mazo.setDescarte([]); //y da una nueva carta... El premio sigue en 0 porque perdio.
            this.carta2 = this.mazo.darCarta();
        }
        else {
            if ((pApuesta === 1) && (this.verificaMayor() === true)) { //verifica si la apuesta fue a mayor y si la carta es mayor. Calcula el premio
                premio = Number((10 - this.probabilidadMayor() / 10).toFixed(0)) * this.jugador.getApuesta(); //restandole a 10 el porcentaje de probacilidades que tenia, y multiplicandolo por la apuesta-
            }
            else { //de 0 a 9 va a multiplicar la apuesta por 10, de 10 a 19 multipluca por 20, de 20 a 29 por 30 y asi.
                if ((pApuesta === 2) && (this.verificaMenor() === true)) { // para menor hace lo mismo pero si es menor.
                    premio = Number((10 - this.probabilidadMenor() / 10).toFixed(0)) * this.jugador.getApuesta();
                }
            }
        }
        return premio; // retorna el premio, si todas fallaron es 0;
    }
    probabilidad() {
        const listaProbabilidades = new Array();
        listaProbabilidades.push(`${(0, colors_1.green)(`La probabilidad de sacar una carta mayor es de ${this.probabilidadMayor()}%`)}`); //carga mensaje con la probabilidad de cartas mayores
        listaProbabilidades.push(`${(0, colors_1.green)(`La probabilidad de sacar una carta menor es de ${this.probabilidadMenor()}%`)}`); //carga mensaje con la probabilidad de cartas menores
        listaProbabilidades.push(`${(0, colors_1.green)(`La probabilidad de sacar un comodin es de ${this.probabilidadComodin()}%`)}`); //carga mensaje con la probabilidad de comodines
        return listaProbabilidades; // Lo devuelve como array para mostrarlo en pantalla.
    }
    entregarPremio(pApuesta) {
        let premio = new Array;
        const valor = this.calcularPremio(pApuesta); //llama al metodo calcular premio para saber si gano o perdio
        if (valor !== 0) {
            premio.push(`Felicitaciones... gano`.toUpperCase()); // si el valor es distinto de 0 quiere decir que gano y da mensaje de felicitaciones
            premio.push(`Su premio es de ${valor}`);
            this.jugador.setDinero(valor + this.jugador.getDinero());
        }
        else {
            premio.push(`Desafortunadamente perdio`.toUpperCase()); // si es 0 quiere decir que perdio y da mensaje de derrota
        }
        premio.push(`Ahora le quedan ${this.jugador.getDinero()} fichas`); // carga al array para luego mostrar en pantalla la cantidad de fichas que le quedan
        return premio;
    }
    juego(pPantalla) {
        let strPantalla = new Array(); // Declaro el array para pasarlo cargado a la pantalla
        let valor; // valor me va a tomar la elección de mayor o menor   
        let condicion = false; // condición me va a decir si eligio 1 o 2, si es falso va a seguir en el bucle de eleccion
        this.mazo.cargarMazo(); // carga el mazo de cartas
        this.carta2 = this.mazo.darCarta(); // da la primera carta.
        pPantalla.borrarConsola(); // borra la consola
        pPantalla.setPantalla(this.reglamentoJuego()); // setea el arreglo a mostrar en pantalla con las reglas del juego
        pPantalla.mostrarReglas(this.titulo); // muestra el reglamento en pantalla
        pPantalla.pausaConsola(); // pasa la pantalla hasta que se precione enter
        do {
            this.carta1 = this.carta2; // comienza el ciclo del juego, se termina cuando te quedas sin fichas, o cuando decis que no queres jugar mas
            this.carta2 = this.mazo.darCarta(); // Pasa la carta 2 a carta 1, y da una nueva carta a carta 2
            strPantalla = [];
            pPantalla.borrarConsola(); // borra la pantalla
            pPantalla.bienvenido(this.titulo);
            strPantalla.push(`${this.carta1.mostrarCartaPantalla(true)} \n`); // empieza a cargar el array a mostrar en pantalla con la carta 1
            strPantalla.push.apply(strPantalla, this.probabilidad()); // carga las probabilidades
            strPantalla.push(`Recuerde si sale ${(0, colors_1.green)("COMODIN")} pierde todo su dinero\n`); // y la advertencia de comodin
            strPantalla.push(`Su dinero actual es de $${this.jugador.getDinero()}\n`); // y el dinero que posee
            strPantalla.push(`¿La siguiente carta es Mayor o Menor?`); // pregunta por la siguiente carta
            pPantalla.setPantalla(strPantalla); // lo setea a la pantalla
            strPantalla = []; // borra el array que se estaba cargando.
            pPantalla.mostrarPantallaInicio(this.titulo); // lo muestra en pantalla
            this.jugador.apostar(pPantalla); // toma la apuesta del jugador
            strPantalla.push(`${this.carta2.mostrarCartaPantalla(false)} \n`); // carga la segunda carta en el arreglo
            do { // comienza el ciclo de la eleccion de mayor o menor.  
                valor = readlineSync.questionInt(`Ingrese 1 para mayor, 2 para menor: `.toUpperCase());
                if ((valor === 1) || (valor === 2)) {
                    strPantalla.push.apply(strPantalla, this.entregarPremio(valor)); // carga en el array los premios
                    pPantalla.setPantalla(strPantalla); // los setea en pantalla
                    condicion = true; // y habilita la salida del bucle
                }
                else {
                    pPantalla.mensajesError(2);
                    pPantalla.pausaConsola(); //Da en pantalla el mensaje de que solo puede elegir mayor o menor, 1 o 2    
                }
            } while (condicion === false);
            pPantalla.mostrarMensaje(); // muestra en pantalla los mensajes cargados en el array
            console.log("\n");
            pPantalla.pausaConsola();
        } while ((this.jugador.getDinero() > 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? "))); // hace la pregunta si quiere seguir jugando
    }
}
exports.MayorOmenor = MayorOmenor;
