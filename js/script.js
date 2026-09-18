console.log("Script JS chargé avec succès");

// HTML elements 
const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;
let cards = [];
const images = [];

for (let i = 0; i < 8; i++) {
    images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}
cards = [...images, ...images];

function shuffle(arr) {
  var i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}

