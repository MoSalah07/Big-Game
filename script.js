"use strict";
// Global Variables
const player0El = document.querySelector(".player--0"),
  player1El = document.querySelector(".player--1"),
  score0El = document.querySelector("#score--0"),
  score1El = document.querySelector("#score--1"),
  currentScore0El = document.querySelector("#current--0"),
  currentScore1El = document.querySelector("#current--1"),
  btnNewGame = document.querySelector(".btn--new"),
  btnRoll = document.querySelector(".btn--roll"),
  btnHold = document.querySelector(".btn--hold"),
  dice = document.querySelector(".dice");

// Default Setting For Game
let currentScore, playing, scores, activePlayer;

const init = function () {
  (currentScore = 0), (activePlayer = 0), (scores = [0, 0]), (playing = true);
  addScore("#score", "0", "0");
  addScore("#score", "1", "0");
  addScore("#current", "0", "0");
  addScore("#current", "1", "0");
  CustomClassList(dice, "add", "hidden");
  CustomClassList(player0El, "add", "player--active");
  CustomClassList(player1El, "remove", "player--active");
  CustomClassList(player0El, "remove", "player--winner");
  CustomClassList(player1El, "remove", "player--winner");
};
init();

btnRoll.addEventListener("click", handelRoll);
function handelRoll() {
  if (playing) {
    CustomClassList(dice, "remove", "hidden");
    let diceNum = Math.trunc(Math.random() * 6) + 1;
    dice.src = `Images/dice-${diceNum}.png`;
    if (diceNum !== 1) {
      currentScore += diceNum;
      addScore("#current", activePlayer, currentScore);
    } else {
      switchPlayer();
    }
  }
}

btnHold.addEventListener("click", handelHold);
function handelHold() {
  if (playing) {
    addScore("#current", activePlayer, "0");
    scores[activePlayer] += currentScore;
    addScore("#score", activePlayer, scores[activePlayer]);
    if (scores[activePlayer] >= 30) {
      playing = false;
      CustomClassList(dice, "add", "hidden");
      CustomClassList(
        document.querySelector(`.player--${activePlayer}`),
        "add",
        "player--winner"
      );
      CustomClassList(
        document.querySelector(`.player--${activePlayer}`),
        "remove",
        "player--active"
      );
    } else switchPlayer();
  }
}
// For Rest
btnNewGame.addEventListener("click", init);

// Custom Functions
function switchPlayer() {
  // For Change Content CurrentElement;
  currentScore = 0;
  addScore("#current", "0", "0");
  activePlayer = activePlayer === 0 ? 1 : 0;
  addScore("#current", activePlayer, "0");
  addScore("#current", activePlayer, currentScore);
  // RemoveAll Class Active
  document
    .querySelectorAll(".player")
    .forEach((el) => el.classList.remove("player--active"));
  // Add Class Active
  CustomClassList(
    document.querySelector(`.player--${activePlayer}`),
    "add",
    "player--active"
  );
}

function CustomClassList(el, type, nameClass) {
  el.classList[type](nameClass);
}

function addScore(nameClass, active, content) {
  document.querySelector(`${nameClass}--${active}`).textContent = content;
}
