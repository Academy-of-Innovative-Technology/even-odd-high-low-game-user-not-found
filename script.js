
let secretNumber = 0;
let tries = 0;
let wins = 0;
let losses = 0;
let rounds = 0;
let streak = 0;
let retries = 0;
let gameActive = false;


const guessInput = document.getElementById('guess');
const buttons = document.querySelectorAll('button');
const submitBtn = buttons[0];
const retryBtn = buttons[1];
const giveUpBtn = buttons[2];
const resetBtn = buttons[3];
const triesDisplay = document.getElementById('tries');
const hintDisplay = document.getElementById('hint');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const roundsDisplay = document.getElementById('rounds');
const streakDisplay = document.getElementById('streak');
const retriesDisplay = document.getElementById('retries');
const parityCheckbox = document.getElementById('parity');
const resultText = document.getElementById('resultText');
const lastHint = document.getElementById('lastHint');
const confetti = document.getElementById('confetti');
const resultImg = document.getElementById('resultImg');


function initGame() {
  secretNumber = Math.floor(Math.random() * 1001);
  tries = 0;
  gameActive = true;
  triesDisplay.textContent = '0';
  hintDisplay.textContent = 'Tries this round';
  resultText.textContent = 'Game started! Make your guess (0-1000)';
  lastHint.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  submitBtn.disabled = false;
  confetti.style.display = 'none';
}

// 

function submitGuess() {
  if (!gameActive) {
    initGame();
    return;
  }

  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 0 || guess > 1000) {
    resultText.textContent = 'Please enter a valid number between 0 and 1000';
    return;
  }

  tries++;
  triesDisplay.textContent = tries;

  if (guess === secretNumber) {
    winGame();
  } else {
    const hint = guess < secretNumber ? 'higher' : 'lower';
    const parityHint = parityCheckbox.checked 
      ? ` (Secret is ${secretNumber % 2 === 0 ? 'EVEN' : 'ODD'})` 
      : '';
    
    resultText.textContent = `Wrong! Try ${hint}`;
    lastHint.textContent = `Your guess: ${guess}${parityHint}`;
  }

  guessInput.value = '';
  guessInput.focus();
}

// When you guess the right answer you get +1 to your rounds, wins and streak and tells you how many tries it took.

function winGame() {
  gameActive = false;
  wins++;
  rounds++;
  streak++;
  
  winsDisplay.textContent = wins;
  roundsDisplay.textContent = rounds;
  streakDisplay.textContent = streak;
  
  resultText.textContent = `🎉 Correct! The number was ${secretNumber}!`;
  lastHint.textContent = `You won in ${tries} tries!`;
  
  confetti.style.display = 'block';
  setTimeout(() => confetti.style.display = 'none', 3000);
  
  guessInput.disabled = true;
  submitBtn.disabled = true;
}

// Pressing retry adds +1 to your retry and keeps your rounds the same.

function retryGame() {
  if (!gameActive && rounds > 0) {
    retries++;
    retriesDisplay.textContent = retries;
    initGame();
  }
}

// Give up button adds a loss and +1 to rounds and resets your streak back to 0 whilst telling you the correct answer.

function giveUp() {
  if (gameActive) {
    gameActive = false;
    losses++;
    rounds++;
    streak = 0;
    
    lossesDisplay.textContent = losses;
    roundsDisplay.textContent = rounds;
    streakDisplay.textContent = streak;
    
    resultText.textContent = `You gave up! The number was ${secretNumber}`;
    lastHint.textContent = `Better luck next time!`;
    
    guessInput.disabled = true;
    submitBtn.disabled = true;
  }
}

// Reset All button puts everything back to 0

function resetAll() {
  wins = 0;
  losses = 0;
  rounds = 0;
  streak = 0;
  retries = 0;
  
  winsDisplay.textContent = '0';
  lossesDisplay.textContent = '0';
  roundsDisplay.textContent = '0';
  streakDisplay.textContent = '0';
  retriesDisplay.textContent = '0';
  
  initGame();
}

// Event listeners
submitBtn.addEventListener('click', submitGuess);
retryBtn.addEventListener('click', retryGame);
giveUpBtn.addEventListener('click', giveUp);
resetBtn.addEventListener('click', resetAll);

guessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    submitGuess();
  }
});


initGame();
