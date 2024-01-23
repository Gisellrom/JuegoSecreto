let numeroSecreto = 0;
let intentos = 0;
let lista = [];
let numeroMaximo = 10;
let contIntentos = 0;
let intentosMaximos = 7;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;        
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if(lista.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');
        document.querySelector('#intentar').setAttribute('disabled', 'true');
    }else{

        if(numeroDeUsuario === numeroSecreto){
            asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        }else{
            //el usuario no acertó
            if(numeroDeUsuario > numeroSecreto){
                asignarTextoElemento('p','El número secreto es menor');
            }else{
                asignarTextoElemento('p','El número secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }
    }
    return;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;
    if (lista.includes(numeroGenerado)){
        return generarNumeroSecreto();
    }else{
        lista.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales(){
    intentos = 1;
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}:`);
    //generar el numero Secreto
    numeroSecreto = generarNumeroSecreto();
}

function reiniciarJuego(){
    if(contIntentos == intentosMaximos){
        asignarTextoElemento('p', 'Ya se alcanzó el número de intentos de juegos disponibles, Si quieres volver a jugar, reinicialo de nuevo');
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
        document.querySelector('#valorUsuario').setAttribute('disabled', 'true');
        document.querySelector('#intentar').setAttribute('disabled', 'true');
        limpiarCaja()
    }else{
        //indicar mensaje de inicio
        limpiarCaja();
        condicionesIniciales();
        //deshabilitamos el boton de nuevo Juego:
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
        contIntentos++;
    }
}

condicionesIniciales();