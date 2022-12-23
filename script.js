'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// initializing variables
let currentScore, activePlayer, scores, playing;

const init = function(){
    //  hide dice image
    diceEl.classList.add('hidden');
    
    // starting conditions
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    playing = true;

    // Initial state
    current0.textContent = 0;
    current1.textContent = 0;
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];
    player0El.classList.add('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    scores[activePlayer] += currentScore;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function(){
    if (playing){
        // change dice image
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove('hidden');

        if(dice !== 1){
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            score0El.textContent = scores[0];
            score1El.textContent = scores[1];

        } else {
            // switch player
            currentScore = 0;
            switchPlayer();
            score0El.textContent = scores[0];
            score1El.textContent = scores[1];
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        // saves active player scores
        scores[activePlayer] += currentScore;
        currentScore = 0
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
        // Check if the active player have won the game and finish the Game
        if(scores[activePlayer] >= 100) {
            score0El.textContent = scores[0];
            score1El.textContent = scores[1];
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            playing = false;
        } else {
            // switch player
            switchPlayer();
            score0El.textContent = scores[0];
            score1El.textContent = scores[1];
        }
    }
});

btnNew.addEventListener('click', init);
