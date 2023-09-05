const TEXT_WIN = "You win!";
const TEXT_LOSE = "You lose!";
const TEXT_NOBODY = "Friendship won!";
const CHARACTERS = ["rock", "paper", "scissors"];
const OPTIONS = {
  rock: {
    scissors: TEXT_WIN,
    paper: TEXT_LOSE,
  },
  paper: {
    rock: TEXT_WIN,
    scissors: TEXT_LOSE,
  },
  scissors: {
    paper: TEXT_WIN,
    rock: TEXT_LOSE,
  },
};

// Get a random integer in a range
function getRandomNumber(min = 0, max = 3) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// Get computer choice
function getComputerChoice() {
  return CHARACTERS[getRandomNumber()];
}

// Game round
function playRound(playerSelection, computerSelection = getComputerChoice()) {
  return playerSelection == computerSelection
    ? TEXT_NOBODY
    : OPTIONS[playerSelection][computerSelection];
}

// Start game
function game(playerSelection) {
  console.log(playRound(playerSelection));
}

for (let i = 0; i < 5; i++) {
  game("rock");
}
