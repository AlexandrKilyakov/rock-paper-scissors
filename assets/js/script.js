const selectors = {
  field: "[data-role='field']",
  information: "[data-role='information']",
  characters: "[data-role='characters']",
  counterPlayer: "[data-counter='player']",
  counterComputer: "[data-counter='computer']",
  cartPlayer: "[data-role='player']",
  cartComputer: "[data-role='computer']",
  result: "[data-result]",
  resultName: "[data-text='result']",
  resultText: "[data-text='description']",
  btnStart: "[data-click='start']",
  btnResult: "[data-click='continue']",
};

const field = document.querySelector(selectors.field);
const btnStart = document.querySelector(selectors.btnStart);
const information = document.querySelector(selectors.information);
const counterPlayer = document.querySelector(selectors.counterPlayer);
const counterComputer = document.querySelector(selectors.counterComputer);
const characters = document.querySelector(selectors.characters);
const cartPlayer = document.querySelector(selectors.cartPlayer);
const cartComputer = document.querySelector(selectors.cartComputer);
const resultPopup = document.querySelector(selectors.result);
const resultName = document.querySelector(selectors.resultName);
const resultText = document.querySelector(selectors.resultText);
const btnResult = document.querySelector(selectors.btnResult);

const active = "active";

const TEXT_WIN = "You win!";
const TEXT_LOSE = "You lose!";
const TEXT_NOBODY = "Friendship won!";
const ELEMENTS = ["rock", "paper", "scissors"];
const OPTIONS = {
  rock: {
    scissors: {
      result: TEXT_WIN,
      text: "Stone wins over scissors",
    },
    paper: {
      result: TEXT_LOSE,
      text: "Stone loses to paper",
    },
  },
  paper: {
    rock: {
      result: TEXT_WIN,
      text: "Paper beats stone",
    },
    scissors: {
      result: TEXT_LOSE,
      text: "Paper loses to scissors",
    },
  },
  scissors: {
    paper: {
      result: TEXT_WIN,
      text: "Scissors beat paper",
    },
    rock: {
      result: TEXT_LOSE,
      text: "Scissors lose to stone",
    },
  },
};

let numberPlayer = 0;
let numberComputer = 0;

btnStart.addEventListener("click", () => {
  information.classList.add(active);
});

btnResult.addEventListener("click", () => {
  if (winnerCheck()) {
    btnResult.classList.add("restart");
    restart();
  }
  game();
});

characters.addEventListener("click", ({ target }) => {
  let unit = target.closest("[data-unit]");

  if (!unit) return;

  cartPlayer.dataset.unit = unit.dataset.unit;
  cartComputer.dataset.unit = getComputerChoice();

  field.addEventListener("transitionend", fieldCartsAddActive);

  field.classList.add(active);
});

function flipCartsAddActive() {
  cartPlayer.removeEventListener("transitionend", flipCartsAddActive);

  setTimeout(() => {
    resultPopup.classList.add(active);
  }, 500);
}

function fieldCartsAddActive() {
  field.removeEventListener("transitionend", fieldCartsAddActive);

  setTimeout(() => {
    cartPlayer.addEventListener("transitionend", flipCartsAddActive);
    cartPlayer.classList.add(active);
    cartComputer.classList.add(active);

    let result = playRound(cartPlayer.dataset.unit, cartComputer.dataset.unit);

    resultName.textContent = result["name"];
    resultText.textContent = result["text"];
    resultPopup.dataset.result = result["short"];

    if (winnerCheck()) {
      btnResult.dataset.click = "restart";
      resultText.innerHTML += `<br>The stats for the match are shown below.`;
      resultText.innerHTML += `<br>You: ${numberPlayer}`;
      resultText.innerHTML += `<br>Computer: ${numberComputer}`;
    }
  }, 500);
}

function fieldCartsRemoveActive() {
  field.removeEventListener("transitionend", fieldCartsRemoveActive);
  cartPlayer.classList.remove(active);
  cartComputer.classList.remove(active);
}

function getRandomNumber(min = 0, max = 3) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getComputerChoice() {
  return ELEMENTS[getRandomNumber()];
}

function playRound(playerSelection, computerSelection) {
  const result = {
    name: "",
    text: "",
    short: "",
  };

  if (playerSelection == computerSelection) {
    result["name"] = TEXT_NOBODY;
    result["text"] = "Friendship won!";
    result["short"] = "friendship";
  } else {
    result["name"] = OPTIONS[playerSelection][computerSelection]["result"];
    result["text"] = OPTIONS[playerSelection][computerSelection]["text"];

    if (result["name"] == TEXT_WIN) {
      counterPlayer.textContent = ++numberPlayer;
      result["short"] = "win";
    } else if (result["name"] == TEXT_LOSE) {
      counterComputer.textContent = ++numberComputer;
      result["short"] = "lose";
    }
  }

  return result;
}

function winnerCheck(max = 5) {
  return numberPlayer >= max || numberComputer >= max;
}

function game() {
  field.addEventListener("transitionend", fieldCartsRemoveActive);
  field.classList.remove(active);
  resultPopup.classList.remove(active);
  btnResult.classList.remove("restart");
}

function restart() {
  numberPlayer = 0;
  numberComputer = 0;
  counterPlayer.textContent = numberPlayer;
  counterComputer.textContent = numberComputer;
  btnResult.dataset.click = "continue";
}
