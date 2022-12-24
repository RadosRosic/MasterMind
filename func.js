const btns = Array.from(document.getElementsByClassName("btn"));
const btnDel = document.getElementById("btnDel");
const btnTry = document.getElementById("btnTry");
const currentRoundText = document.getElementById("current-round");
const main = document.getElementById("main");

btns.forEach((e) => {
  e.addEventListener("click", select);
});
btnDel.addEventListener("click", del);
btnTry.addEventListener("click", guess);

let round = 1;
let won = false;
currentRoundText.textContent = `Current round: ${round}`;

const combination = [];
let first, second, third, fourth;
first = randomNumber();
second = randomNumber();
third = randomNumber();
fourth = randomNumber();
combination.push(first, second, third, fourth);

const playerGuess = [];
const result = [];

function randomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

console.log(combination);

function guess() {
  if (won === false && playerGuess.length === 4) {
    const activeBox = document.getElementById(`hintBox${round}`);
    console.log(combination, playerGuess);

    if (playerGuess.join("") === combination.join("")) {
      currentRoundText.textContent = "You won!";
      main.style.backgroundColor = "aqua";
      won = true;
    }

    const combinationCopy = [...combination]; // make a true copy of combination array, needed for splicing
    for (let i = 0; i < playerGuess.length; i++) {
      if (playerGuess[i] === combinationCopy[i]) {
        result.push("!");
        combinationCopy.splice(i, 1, 0); // replace el with 0
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
      img.style.width = "65px";
      img.style.margin = "0 12px";

      activeBox.append(img);
    });

    if (won === true) {
      return;
    }

    result.length = 0;
    playerGuess.length = 0;
    round++;

    if (round === 7 && won === false) {
      main.style.backgroundColor = "red";
      currentRoundText.textContent = "You lost :(";
      return;
    }
    if (won === false) {
      currentRoundText.textContent = `Current round: ${round}`;
    }
  }
}

function select(e) {
  if (playerGuess.length < 4) {
    const activeBox = document.getElementById(`guessBox${round}`);
    const img = document.createElement("img");
    img.style.width = "65px";
    img.style.margin = "10px";

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
      // activeBox.textContent = activeBox.textContent.slice(0, -1);
    }
  }
}
