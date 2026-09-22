console.log("Script JS chargé avec succès");

// Liaison avec le DOM
const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

// Variables de suivi du jeu
let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;

const images = [];
for (let i = imgStart; i <= imgStart + 7; i++) {
  images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}
cards = [...images, ...images];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function revealCard(card) {
  const img = document.createElement("img");
  img.src = card.dataset.value;
  img.alt = "Image de mémoire";
  card.appendChild(img);
}

function handleCardClick(card) {
  console.log(`Carte cliquée : ${card.dataset.value}`);

  if (lockBoard || card.classList.contains("matched") || card === firstCard || card.firstChild) {
    return;
  }

  revealCard(card);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  moves++;
  movesDisplay.textContent = `Coups : ${moves}`;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCount += 2;
    resetTurn();
    checkVictory();
  } else {
    setTimeout(() => {
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkVictory() {
  if (matchedCount === cards.length) {
    stopTimer();
    resultDisplay.textContent = `Victoire ! Coups : ${moves} | Temps : ${formatTime(seconds)}`;
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Temps : ${formatTime(seconds)}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function formatTime(duration) { // from stackOverflow
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}

function initGame() {
  board.innerHTML = "";
  resultDisplay.textContent = "";
  moves = 0;
  matchedCount = 0;
  seconds = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  movesDisplay.textContent = `Coups : ${moves}`;
  timerDisplay.textContent = `Temps : 0:00`;

  shuffle(cards);

  cards.forEach((imgUrl) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("role", "button");
    // pas d'image affichée, OSEF on force la taille de la div pour être de 150x150 px
    card.setAttribute("style","width:150px");
    card.setAttribute("style","height:150px");
    card.setAttribute("tabindex", "0");
    card.dataset.value = imgUrl;
    board.appendChild(card);

    card.addEventListener("click", () => handleCardClick(card));
  });

  clearInterval(timerInterval);
  startTimer();
}

restartBtn.addEventListener("click", initGame);
initGame();