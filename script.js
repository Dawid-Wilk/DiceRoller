'use strict';

//Selecting elements
const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.querySelector('#score--1');
const currentScorePlayer0 = document.querySelector('#current--0');
const currentScorePlayer1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Start
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate random number
    const rollRandom = Math.trunc(Math.random() * 6) + 1;
    //Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${rollRandom}.png`;
    // If numer 1 switch player
    if (rollRandom !== 1) {
      //Add dice to current score
      currentScore += rollRandom;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
    }
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
