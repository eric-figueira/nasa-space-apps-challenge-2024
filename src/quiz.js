import { quizData } from "./constants";

const questionTitle = document.getElementById("question-title");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");

const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const D = document.getElementById("D");
const answersElements = [A, B, C, D];

const game = {};

function informCorrect(element) {
  // play correct sound
  element.style.backgroundColor = "green";
}

function informError(element) {
  // play error sound
  element.style.backgroundColor = "red";
}

async function guess(event) {
  if (game.hasGuessed) {
    return;
  }

  game.hasGuessed = true;

  const guessed = event.target;
  const guessedAnswer = guessed.innerHTML;
  const question = quizData[game.currentQuestion - 1];
  
  if (guessedAnswer === question.answer) {
    game.score += 1;
    informCorrect(guessed);
  } else {
    informError(guessed);
  }

  await new Promise(r => setTimeout(r, 2000));

  game.hasGuessed = false,
  game.currentQuestion += 1;

  updateQuiz(game);
}

function showScore(game) {
  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";

  const score = game.score;
  const numberOfQuestions = game.numberOfQuestions;

  let message = "";
  if (score / numberOfQuestions <= 0.4) {
    message = "Poxa!";
  } else if (score / numberOfQuestions < 0.7) {
    message = "Bom!";
  } else if (score / numberOfQuestions < 0.9) {
    message = "Quase lá";
  } else {
    message = "Excelente!";
  }

  document.getElementById("score-title").innerHTML = message;
  document.getElementById("score-result").innerHTML = `Você acertou ${score} das ${numberOfQuestions} perguntas`;
}

function updateQuiz(game) {
  for (const element of answersElements) {
    element.style.backgroundColor = "#fff";
  }

  if (game.currentQuestion === quizData.length + 1) {
    showScore(game);
    return;
  }

  const question = quizData[game.currentQuestion - 1];

  questionTitle.innerHTML = `${game.currentQuestion}. ${question.question}`;

  for (let i = 0; i < 4; i++) {
    answersElements[i].innerHTML = question.answers[i];
    answersElements[i].addEventListener("click", guess);
  }
}

function start() {
  game.score = 0;
  game.hasGuessed = false;
  game.currentQuestion = 1;
  game.numberOfQuestions = quizData.length;

  updateQuiz(game);
}

window.addEventListener("load", start);