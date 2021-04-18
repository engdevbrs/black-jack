let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let ptsJugador = 0;
let ptsComputadora = 0;

//Referencias HTML
const newCard = document.querySelector('#newCard');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

const ptsJugadores = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('.container2');
const divCartasPc = document.querySelector('.container3');


const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  deck = _.shuffle(deck);

  return deck;
};

crearDeck();

//Funcion para tomar carta de la baraja
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No quedan cartas";
  }
  const carta = deck.shift();

  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) 
  : valor * 1;
};

//Computadora
const turnoPC = (ptsMinimos) => {
  do {
    const carta = pedirCarta();
    ptsComputadora = ptsComputadora + valorCarta( carta );
    ptsJugadores[1].innerText = ptsComputadora;
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasPc.append(imgCarta);
    imgCarta.classList.add('carta');
    if(ptsMinimos > 21){
      break;
    }
  }while( (ptsComputadora < ptsMinimos) && (ptsMinimos < 21) );
  }

const valor = valorCarta( pedirCarta() );

//Eventos
newCard.addEventListener('click',() => {
  const carta = pedirCarta();
  ptsJugador = ptsJugador + valorCarta( carta );
  ptsJugadores[0].innerText = ptsJugador;
  
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugador.append(imgCarta);
  imgCarta.classList.add('carta');
  if(ptsJugador >21){
    alert('Haz perdido');
    newCard.disabled = true;
    stop.disabled = true;
    turnoPC(ptsJugador);
  } else if (ptsJugador === 21){
    stop.disabled = true;
    turnoPC(ptsJugador);
    alert('21, Excelente!!');
  }
});

stop.addEventListener('click', () =>{
  newCard.disabled = true;
  stop.disabled = true;
  turnoPC(ptsJugador);
  if((ptsJugador > ptsComputadora) || ptsComputadora > 21){
    alert('Felicidades!! , Ganaste :)');
  }else if((ptsComputadora > ptsJugador) || (ptsJugador === ptsComputadora)){
    alert('La computadora te ha ganado');
  }
});

reset.addEventListener('click', () =>{
  
  console.clear();
  deck = [];
  deck = crearDeck();
  
  ptsJugador = 0;
  ptsComputadora = 0;
  ptsJugadores[0].innerText = 0;
  ptsJugadores[1].innerText = 0;
  divCartasPc.innerHTML = '';
  divCartasJugador.innerHTML = '';
  stop.disabled = false;
  newCard.disabled = false;
});