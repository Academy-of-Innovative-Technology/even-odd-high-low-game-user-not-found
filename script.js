
// Game state variables
let secretNumber = 0; // The random number to guess (0-1000)
let tries = 0; // Number of guesses in current round
let wins = 0; // Total wins count
let losses = 0; // Total losses count
let rounds = 0; // Total rounds played
let streak = 0; // Current win streak
let retries = 0; // Number of retries after wins/losses
let gameActive = false; // Whether game is currently running

// Get references to HTML elements
const guessInput = document.getElementById('guess'); // Number input field
const buttons = document.querySelectorAll('button'); // All buttons
const submitBtn = buttons[0]; // Submit guess button
const retryBtn = buttons[1]; // Retry button
const giveUpBtn = buttons[2]; // Give up button
const resetBtn = buttons[3]; // Reset all button
const triesDisplay = document.getElementById('tries'); // Displays try count
const hintDisplay = document.getElementById('hint'); // Displays hint text
const winsDisplay = document.getElementById('wins'); // Displays wins
const lossesDisplay = document.getElementById('losses'); // Displays losses
const roundsDisplay = document.getElementById('rounds'); // Displays rounds
const streakDisplay = document.getElementById('streak'); // Displays streak
const retriesDisplay = document.getElementById('retries'); // Displays retries
const parityCheckbox = document.getElementById('parity'); // Even/odd checkbox
const resultText = document.getElementById('resultText'); // Main result message
const lastHint = document.getElementById('lastHint'); // Secondary hint message
const confetti = document.getElementById('confetti'); // Win animation
const resultImg = document.getElementById('resultImg'); // Result image

// Initialize/restart the game
function initGame() {
  secretNumber = Math.floor(Math.random() * 1001); // Pick random number 0-1000
  tries = 0; // Reset tries
  gameActive = true; // Enable game
  triesDisplay.textContent = '0'; // Reset display
  hintDisplay.textContent = 'Tries this round'; // Reset hint
  resultText.textContent = 'Game started! Make your guess (0-1000)'; // Welcome message
  lastHint.textContent = ''; // Clear last hint
  guessInput.value = ''; // Clear input
  guessInput.disabled = false; // Enable input
  submitBtn.disabled = false; // Enable submit button
  confetti.style.display = 'none'; // Hide confetti
}

// Handle guess submission
function submitGuess() {
  if (!gameActive) { // If game ended
    initGame(); // Start new game
    return; // Exit function
  }

  const guess = parseInt(guessInput.value); // Convert input to number

  if (isNaN(guess) || guess < 0 || guess > 1000) { // Validate input
    resultText.textContent = 'Please enter a valid number between 0 and 1000'; // Error message
    return; // Exit function
  }

  tries++; // Increment tries
  triesDisplay.textContent = tries; // Update display

  if (guess === secretNumber) { // If correct
    winGame(); // Handle win
  } else { // If wrong
    const hint = guess < secretNumber ? 'higher' : 'lower'; // Determine hint
    const parityHint = parityCheckbox.checked  // If checkbox is checked
      ? ` (Secret is ${secretNumber % 2 === 0 ? 'EVEN' : 'ODD'})` // Add even/odd hint
      : ''; // No hint
    
    resultText.textContent = `Wrong! Try ${hint}`; // Show hint
    lastHint.textContent = `Your guess: ${guess}${parityHint}`; // Show guess + parity
  }

  guessInput.value = ''; // Clear input
  guessInput.focus(); // Refocus input
}

// Handle winning the game
function winGame() {
  gameActive = false; // Disable game
  wins++; // Increment wins
  rounds++; // Increment rounds
  streak++; // Increment streak
  
  winsDisplay.textContent = wins; // Update wins display
  roundsDisplay.textContent = rounds; // Update rounds display
  streakDisplay.textContent = streak; // Update streak display
  
  resultText.textContent = `🎉 Correct! The number was ${secretNumber}!`; // Success message
  lastHint.textContent = `You won in ${tries} tries!`; // Show tries count
  
  confetti.style.display = 'block'; // Show confetti
  setTimeout(() => confetti.style.display = 'none', 3000); // Hide after 3 seconds
  
  guessInput.disabled = true; // Disable input
  submitBtn.disabled = true; // Disable submit
}

// Start new game after win/loss
function retryGame() {
  if (!gameActive && rounds > 0) { // If game ended and rounds exist
    retries++; // Increment retries
    retriesDisplay.textContent = retries; // Update display
    initGame(); // Start new game
  }
}

// Handle giving up
function giveUp() {
  if (gameActive) { // If game is running
    gameActive = false; // End game
    losses++; // Increment losses
    rounds++; // Increment rounds
    streak = 0; // Reset streak
    
    lossesDisplay.textContent = losses; // Update losses display
    roundsDisplay.textContent = rounds; // Update rounds display
    streakDisplay.textContent = streak; // Update streak display
    
    resultText.textContent = `You gave up! The number was ${secretNumber}`; // Show answer
    lastHint.textContent = `Better luck next time!`; // Encouraging message
    
    guessInput.disabled = true; // Disable input
    submitBtn.disabled = true; // Disable submit
  }
}

// Reset all statistics
function resetAll() {
  wins = 0; // Reset wins
  losses = 0; // Reset losses
  rounds = 0; // Reset rounds
  streak = 0; // Reset streak
  retries = 0; // Reset retries
  
  winsDisplay.textContent = '0'; // Update wins display
  lossesDisplay.textContent = '0'; // Update losses display
  roundsDisplay.textContent = '0'; // Update rounds display
  streakDisplay.textContent = '0'; // Update streak display
  retriesDisplay.textContent = '0'; // Update retries display
  
  initGame(); // Start fresh game
}

// Connect buttons to functions
submitBtn.addEventListener('click', submitGuess); // Submit on click
retryBtn.addEventListener('click', retryGame); // Retry on click
giveUpBtn.addEventListener('click', giveUp); // Give up on click
resetBtn.addEventListener('click', resetAll); // Reset on click

guessInput.addEventListener('keypress', (e) => { // Listen for key press
  if (e.key === 'Enter') { // If Enter key pressed
    submitGuess(); // Submit guess
  }
});

// Start first game when page loads
initGame();
