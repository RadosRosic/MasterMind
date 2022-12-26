const btns = Array.from(document.getElementsByClassName("btn"));
const btnDel = document.getElementById("btnDel");
const btnTry = document.getElementById("btnTry");
const currentRoundText = document.getElementById("current-round");
const main = document.getElementById("main");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const btnInfo = document.getElementById("btnInfo");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnRestart = document.getElementById("btnRestart");
const btnsSelectSection = document.getElementById("btnsSelectSection");
const solution = document.getElementById("solution");

btns.forEach((e) => {
  e.addEventListener("click", select);
});
btnDel.addEventListener("click", del);
btnTry.addEventListener("click", guess);

let round = 1;
let won = false;

const combination = [];
const playerGuess = [];
const result = [];

startGame();
console.log(combination);

function randomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function guess() {
  if (!won && playerGuess.length === 4) {
    const activeBox = document.getElementById(`hintBox${round}`);
    console.log(combination, playerGuess);

    if (playerGuess.join("") === combination.join("")) {
      currentRoundText.textContent = "You won!";
      main.style.backgroundColor = "aqua";
      won = true;
    }

    const combinationCopy = [...combination];
    for (let i = 0; i < playerGuess.length; i++) {
      if (playerGuess[i] === combinationCopy[i]) {
        result.push("!");
        combinationCopy.splice(i, 1, 0);
      }
    }

    for (let i = 0; i < playerGuess.length; i++) {
      if (combinationCopy.includes(playerGuess[i])) {
        result.push("?");
        combinationCopy.splice(combinationCopy.indexOf(playerGuess[i]), 1, 0);
      }
    }

    combinationCopy.forEach((el) => (el ? result.push("X") : null));

    result.forEach((el) => {
      const img = document.createElement("img");

      if (el === "!") {
        img.src = `./img/right.svg`;
      }
      if (el === "?") {
        img.src = `./img/almost.svg`;
      }
      if (el === "X") {
        img.src = `./img/wrong.svg`;
      }

      activeBox.append(img);
    });

    if (won) {
      return;
    }

    result.length = 0;
    playerGuess.length = 0;
    round++;

    if (round === 7 && !won) {
      main.style.backgroundColor = "red";
      currentRoundText.textContent = "You lost :(";
      btnsSelectSection.classList.add("display-none");
      solution.classList.remove("display-none");
      combination.forEach((e) => {
        const img = document.createElement("img");
        img.src = `./img/symbol${e}.svg`;
        solution.append(img);
      });
      return;
    }
    if (!won) {
      currentRoundText.textContent = `Guesses remaining: ${7 - round}`;
    }
  }
}

function select(e) {
  if (playerGuess.length < 4) {
    const activeBox = document.getElementById(`guessBox${round}`);
    const img = document.createElement("img");

    img.src = `./img/symbol${e.target.value}.svg`;
    activeBox.append(img);
    playerGuess.push(Number(e.target.value));
  }
}

function del() {
  if (won === false) {
    const activeBox = document.getElementById(`guessBox${round}`);
    if (playerGuess.length > 0) {
      playerGuess.pop();
      activeBox.removeChild(activeBox.lastChild);
    }
  }
}

btnInfo.addEventListener("click", showModal);

btnCloseModal.addEventListener("click", hideModal);

modal.addEventListener("click", hideModal);

modalContent.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideModal();
  }
});

btnRestart.addEventListener("click", () => {
  console.log(combination);
  startGame();
});

function showModal() {
  modal.classList.remove("display-none");
}

function hideModal() {
  modal.classList.add("display-none");
}

function startGame() {
  btnsSelectSection.classList.remove("display-none");
  solution.classList.add("display-none");
  solution.innerHTML = "";

  let first, second, third, fourth;
  const boxes = Array.from(document.getElementsByClassName("box"));
  boxes.forEach((e) => (e.innerHTML = ""));
  round = 1;
  won = false;
  currentRoundText.textContent = `Guesses remaining: ${7 - round}`;

  first = randomNumber();
  second = randomNumber();
  third = randomNumber();
  fourth = randomNumber();
  combination.length = 0;
  playerGuess.length = 0;
  result.length = 0;
  combination.push(first, second, third, fourth);
  main.style.backgroundColor = "whitesmoke";
}
