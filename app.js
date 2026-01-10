// DOM selections
const startBtn = document.getElementById('start-btn');
const startScreen = document.querySelector('.start-screen');
const quizScreen = document.querySelector('.quiz-screen');
const endScreen = document.querySelector('.end-screen');

// Quiz state variables
let score = 0;
let currentQuestionIndex = 0;
let quizData = [];
let startTime;

// Event listener
startBtn.addEventListener('click', startQuiz);