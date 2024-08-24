"use strict";

const timeBtns = document.querySelectorAll(".time-btn");
const introBtns = document.querySelector(".intro-btns");
const btns = document.querySelectorAll(".btn");
const inputField = document.querySelector(".input-field");
const submitBtn = document.querySelector(".submit");
const game = document.querySelector(".game");
const timer = document.querySelector(".count-down");
const btnContainer = document.querySelector(".buttons");
const operators = document.querySelector(".math-operators");
const instructionBtn = document.querySelector(".instructions-btn");
const arrowBtn = document.querySelector(".arrow-btn");
const intro = document.querySelector(".intro");
const target = document.querySelector(".target-number");
const targetContainer = document.querySelector(".target");
const gameCompleted = document.querySelector(".completed");
const viewScoreBtn = document.querySelector(".view-score-btn");
const results = document.querySelector(".results");
const feedbackContainer = document.querySelector(".feedback-container");
const scoreNumber = document.querySelector(".score-number");
const tryAgainBtn = document.querySelector(".try-again");
const sections = document.querySelector(".sections");
const instructionsSectionBox = document.querySelector(
  ".instructions-sections-container"
);

const clearBtn = document.querySelector(".clear-btn");

const instructionsBtnContainer = document.querySelector(".instructions");
const instructionsContainer = document.querySelector(".instructions-container");
const playBtn = document.querySelector(".play-btn");
const instructionsSections = document.querySelectorAll(".section");

const hardLevelTime = 360;
const easyLevelTime = 10;
let numSetCounter = 0;
let inputSum = "";
let playerScore = 0;
let level = "Easy";
let data;

// Numbers for the game WITHOUT a timer
const hardLevelData = [
  { number: 47, setOfNumbers: [17, 29, 11, 5, 8, 3] },
  { number: 64, setOfNumbers: [23, 17, 7, 18, 12, 2] },
  { number: 79, setOfNumbers: [19, 33, 10, 4, 9, 6] },
  { number: 90, setOfNumbers: [25, 12, 20, 5, 18, 10] },
  { number: 102, setOfNumbers: [27, 30, 15, 12, 7, 11] },
  { number: 115, setOfNumbers: [40, 22, 9, 18, 15, 11] },
  { number: 129, setOfNumbers: [32, 25, 20, 11, 18, 23] },
  { number: 138, setOfNumbers: [39, 24, 18, 10, 8, 10] },
  { number: 150, setOfNumbers: [45, 25, 12, 7, 9, 14] },
  { number: 163, setOfNumbers: [50, 20, 8, 30, 12, 10] },
];
// Numbers for the game WITH a timer
const easyLevelData = [
  { number: 17, setOfNumbers: [8, 15, 23, 5, 12, 1] },
  { number: 26, setOfNumbers: [7, 19, 30, 2, 14, 11] },
  { number: 31, setOfNumbers: [9, 20, 13, 5, 8, 24] },
  { number: 45, setOfNumbers: [11, 33, 7, 8, 22, 10] },
  { number: 52, setOfNumbers: [17, 29, 8, 35, 4, 9] },
  { number: 39, setOfNumbers: [12, 27, 15, 22, 9, 18] },
  { number: 48, setOfNumbers: [7, 28, 9, 17, 3, 14] },
  { number: 54, setOfNumbers: [25, 7, 12, 18, 5, 20] },
  { number: 62, setOfNumbers: [10, 15, 25, 30, 8, 5] },
  { number: 77, setOfNumbers: [14, 31, 22, 9, 10, 28] },
];

const feedback = {
  score0:
    "You didn’t score any points this time. Review your strategies and try again. Practice will help you improve!",
  lessThan5:
    "You scored a few points—good effort! Keep practicing and analyzing where to improve, and your scores will rise.",
  between5And6:
    "Nice job! Scoring 5 or 6 points shows potential. Focus on refining your strategies and calculations to get even better.",
  score7And8:
    "Great work! Scoring 7 or 8 points is impressive. With a bit more practice, you’ll be reaching top scores soon.",
  score9:
    "Fantastic! Scoring 9 points shows you're almost perfect. Keep honing your skills to achieve a flawless score.",
  score10:
    "Perfect score of 10! You’ve mastered the challenge with precision. Excellent problem-solving and consistency!",
};

const renderFeedBack = function (feedback) {
  const html = `
          <p class="intro-paragraph">
            ${feedback}
          </p>
  `;

  feedbackContainer.insertAdjacentHTML("afterbegin", html);
};

// TIMER

// RESABLE FUNCTIONS

const timerNumCalc = function (data) {
  if (numSetCounter === data.length) return;
  // const currentSet = data[numSetCounter].setOfNumbers;
  const currentSet = data[numSetCounter].setOfNumbers;

  target.textContent = data[numSetCounter].number;

  const btnEls = currentSet.map((num) => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = num;
    btnContainer.append(btn);

    return btn;
  });

  return btnEls;
};

// console.log(timerNumCalc(easyLevelData));

const clearMainContainer = function () {
  btnContainer.innerHTML = "";
  intro.classList.toggle("hidden-xaxis");
  game.classList.toggle("hidden");
  // game.classList.add();
  setTimeout(() => {
    intro.classList.toggle("hidden");
    game.classList.remove("hidden-xaxis");
  }, 500);
};

////////////////////////////////////////////////////////////////////////////////////////////////

const inputFieldValue = function (btnActivity) {
  data = level === "Easy" ? easyLevelData : hardLevelData;
  // console.log(data);
  if (numSetCounter === data.length) return;

  timerNumCalc(data).forEach((el) =>
    el.addEventListener("click", function (e) {
      e.target.style.backgroundColor = "#f8f5f3";
      const target = e.target.textContent;
      inputSum += String(target);

      inputField.value = inputSum;
      e.target.disabled = btnActivity;
    })
  );
};

introBtns.addEventListener("click", function (e) {
  const targetIntroBtn = e.target;
  const targetContent = targetIntroBtn.textContent === "Hard" ? "Hard" : "Easy";

  level = targetContent;
  instructionsBtnContainer.classList.toggle("hidden");
  const gameTimeInSecs = level === "Easy" ? easyLevelTime : hardLevelTime;
  arrowBtn.style.animationPlayState = "paused";

  clearMainContainer();

  inputFieldValue(true);

  countDown(gameTimeInSecs);
});

btns.forEach((el) => {
  el.addEventListener("click", function (e) {
    const target = e.target.textContent;
    inputSum += String(target);
    inputField.value = inputSum;
  });
});

submitBtn.addEventListener("click", function () {
  let results;
  try {
    results = eval(inputField.value);
  } catch (err) {
    alert(
      "Your input is invalid. Clear the input field and try then try again"
    );

    return;
  }
  if (!inputField.value) {
    alert("The input field is empty!");
    return;
  }

  if (results !== Number(target.textContent)) {
    numSetCounter++;

    const incorrectAnswer =
      typeof results === "number" ? results : inputField.value;
    alert(`${incorrectAnswer} is not the target`);
    inputField.value = "";
    inputSum = "";
    playerScore = playerScore;
  } else {
    playerScore++;
    numSetCounter++;
  }

  // Refactor CHIEF

  btnContainer.innerHTML =
    inputField.value =
    inputSum =
    target.textContent =
      "";

  inputFieldValue();
});

const countDown = function (timeInSeconds) {
  let time = timeInSeconds;
  const myInterval = setInterval(function () {
    let munites = Math.floor(time / 60);
    let seconds = time % 60;

    time = time - 1;

    timer.textContent = `${String(munites).padStart(2, 0)}:${String(
      seconds
    ).padStart(2, 0)}`;

    if (
      (munites === 0 && seconds === 0) ||
      playerScore === data.length ||
      numSetCounter === data.length
    ) {
      inputField.value = "";
      inputSum = "";
      game.classList.toggle("hidden-xaxis");
      scoreNumber.textContent = playerScore;

      setTimeout(function () {
        game.classList.toggle("hidden");
        gameCompleted.classList.toggle("hidden");

        setTimeout(() => {
          gameCompleted.classList.toggle("hidden-xaxis");
        }, 500);
      }, 1200);
      clearInterval(myInterval);
      timer.textContent = "00:00";
    }
  }, 1000);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

instructionBtn.addEventListener("click", function () {
  instructionsContainer.classList.toggle("hidden");
});

playBtn.addEventListener("click", function () {
  instructionsContainer.classList.toggle("hidden");
});

viewScoreBtn.addEventListener("click", function () {
  console.log("CLICK");
  gameCompleted.classList.add("hidden-xaxis");
  gameCompleted.classList.toggle("hidden");
  results.classList.toggle("hidden");

  setTimeout(() => {
    results.classList.toggle("hidden-xaxis");
  });

  feedbackContainer.innerHTML = "";

  if (playerScore === 0) renderFeedBack(feedback.score0);
  if (playerScore > 0 && playerScore < 5) renderFeedBack(feedback.lessThan5);
  if (playerScore > 4 && playerScore < 7) renderFeedBack(feedback.between5And6);
  if (playerScore > 6 && playerScore < 9) renderFeedBack(feedback.score7And8);
  if (playerScore === 9) renderFeedBack(feedback.score9);
  if (playerScore === 10) renderFeedBack(feedback.score10);
});

tryAgainBtn.addEventListener("click", function () {
  numSetCounter = 0;
  playerScore = 0;
  arrowBtn.style.animationPlayState = "running";
  results.classList.toggle("hidden");
  intro.classList.toggle("hidden");
  instructionsBtnContainer.classList.toggle("hidden");

  setTimeout(function () {
    intro.classList.toggle("hidden-xaxis");
    results.classList.toggle("hidden-xaxis");
  }, 100);
});

const options = {
  root: instructionsSectionBox,
  threshold: 0.3,
};

const animateSection = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden-instructions");
  entry.target.classList.add("reveal-instructions");
  observer.unobserve(entry.target);
};

const observer = new IntersectionObserver(animateSection, options);

instructionsSections.forEach((section) => {
  observer.observe(section);
  section.classList.add("hidden-instructions");
});

clearBtn.addEventListener("click", function () {
  inputField.value = inputSum = "";

  btnContainer.innerHTML = inputField.value = inputSum = "";
  inputFieldValue(true);
});
