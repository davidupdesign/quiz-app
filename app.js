const startBtn = document.getElementById("start-btn");
const startScreen = document.querySelector(".start-screen");
const quizScreen = document.querySelector(".quiz-screen");
const endScreen = document.querySelector(".end-screen");

const questionP = document.querySelector("#question-p");

const answerBtns = document.querySelectorAll(".answer-btn");

const scoreP = document.getElementById("score");
const passFailMsg = document.getElementById("pass-fail-msg");

const timeSpent = document.getElementById("time-spent");

const progressBar = document.getElementById("progress-bar");

const tryAgainBtn = document.getElementById("try-again");

const API_URL =
  "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple";

let score = 0;
let currentQuestionIndex = 0;
let quizData = [];
let startTime;

startBtn.addEventListener("click", startQuiz);
answerBtns.forEach((answer) => {
  answer.addEventListener("click", selectAnswer);
});

function fetchQuestions() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      quizData = data.results;
    });
}

fetchQuestions();

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  startTime = Date.now();
  displayQuestion();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionP.innerHTML = currentQuestion.question;

  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ];
  const shuffledAnswers = shuffle(answers);

  shuffledAnswers.forEach((answer, index) => {
    answerBtns[index].textContent = answer;
  });

  progressBar.textContent = `Question ${currentQuestionIndex + 1}/${
    quizData.length
  }`;
}

function selectAnswer(e) {
  const clickedAnswer = e.target.textContent;
  const correctAnswer = quizData[currentQuestionIndex].correct_answer;

  if (clickedAnswer === correctAnswer) {
    console.log("correct");
    score++;
  } else {
    console.log("incorrect");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");

  scoreP.textContent = `You got ${score} out of ${quizData.length}`;

  if (score >= 3) {
    passFailMsg.textContent = "Passed!";
  } else {
    passFailMsg.textContent = "Failed";
  }

  const endTime = Date.now();
  const elapsedTime = Math.floor((endTime - startTime) / 1000);

  timeSpent.textContent = `Time spent: ${elapsedTime} secs `;

  tryAgainBtn.addEventListener("click", restartQuiz);
}

function restartQuiz() {
  score - 0;
  currentQuestionIndex = 0;

  endScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  fetchQuestions();
}
