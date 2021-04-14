let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

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

  deck = _.shuffle( deck );
  console.log(deck);
  
  return deck;

};

crearDeck();

//Funcion para tomar carta de la baraja
const pedirCarta = () =>{
    if(deck.length === 0){
        throw 'No quedan cartas';
    }
    const carta = deck.shift();
    console.log( carta );
}

for( let i = 0; i <=60;i++){
    pedirCarta();
}
