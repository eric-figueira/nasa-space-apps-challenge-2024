import { quizData } from "./constants";

const questionTitle = document.getElementById("question-title");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");

const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const D = document.getElementById("D");
const answersElements = [A, B, C, D];

const green = "#59E351";
const red = "#FB7575";

const game = {};

function informCorrect(element) {
  var audio = new Audio('./assets/audios/correct.mp3');
  audio.volume = 0.15;
  audio.play();

  element.style.backgroundColor = green;

  // confetti
  const pos = element.getBoundingClientRect();
  const x = (pos.left + pos.width / 2) / window.innerWidth;
  const y = (pos.top + pos.height / 2) / window.innerHeight;

  confetti({
    particleCount: 100,
    spread: 50,
    origin: { x: x, y: y },
  });

}

function informError(element) {
  var audio = new Audio('./assets/audios/buzzer.mp3');
  audio.volume = 0.15;
  audio.play();

  element.style.backgroundColor = red;
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
    message = "Oops!";
  } else if (score / numberOfQuestions < 0.7) {
    message = "Good!";
  } else if (score / numberOfQuestions < 0.9) {
    message = "Almost there!";
  } else {
    message = "Excelent!";
  }

  document.getElementById("score-title").innerHTML = message;
  document.getElementById("score-result").innerHTML = `You got ${score} out ${numberOfQuestions} questions right.`;
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