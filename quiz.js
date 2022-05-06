"use strict";

const url = "https://opentdb.com/api.php?amount=10&type=multiple";
const choices = document.body.querySelectorAll(".choice");
const choicesContainer = Array.from(
  document.querySelectorAll(".choice-container")
);
const questionHead = document.querySelector("#question-header");
const questionBox = document.querySelector("#question");
const scoreSheet = document.querySelector("#score-sheet");
document.querySelector("#restart-button").addEventListener("click", startQuiz);
let currentQuestion;
let questionIndex;
let questionNumber;
let acceptAnswer;
let correctCount;
let questions;

/**
 * Initialize the Quiz and starter variables
 */
function startQuiz() {
  questionNumber = 1;
  questionIndex = 0;
  acceptAnswer = true;
  correctCount = 0;

  scoreSheet.innerHTML = `Score: ${correctCount}`;

  //add event listeners
  choicesContainer.forEach((elem) => {
    elem.addEventListener("click", checkAnswer);
  });

  nextQuestion();
}

/**
 * Update Element text, reset choice container styles, set the new currentQuestion
 */
function nextQuestion() {
  let answers;

  //show "Game Finished" screen if there's no more questions, disable clicking event for all choices,
  if (questionIndex > questions.length - 1) {
    choicesContainer.forEach((elem) => {
      elem.removeEventListener("click", checkAnswer);
    });

    return;
  }

  //grab current question within question array
  currentQuestion = questions[questionIndex];
  console.log(currentQuestion);

  //update webpage elements
  questionBox.innerHTML = currentQuestion.question;
  questionHead.innerText = "Question " + questionNumber;
  scoreSheet.innerHTML = `Score: ${correctCount}`;

  //Randomize answer order, update webpage elements
  answers = [...currentQuestion.incorrect_answers];
  answers.push(currentQuestion.correct_answer);

  for (let i = 0; i < choices.length; i++) {
    let randomIndex = Math.floor(Math.random() * answers.length);
    let randomAnswer = answers[randomIndex];
    answers.splice(randomIndex, 1);

    choices[i].innerHTML = randomAnswer;
  }

  acceptAnswer = true;
}

/**
 * check user's answer, update question counter variables
 */
function checkAnswer(event) {
  if (!acceptAnswer) {
    return;
  }
  acceptAnswer = false;

  let answerContainer = event.target.closest(".choice-container");
  let answer = answerContainer.querySelector(".choice").innerText;

  if (answer === currentQuestion.correct_answer) {
    answerContainer.classList.add("correct");
    correctCount++;
  } else {
    answerContainer.classList.add("incorrect");
  }

  questionNumber++;
  questionIndex++;

  setTimeout(nextQuestion, 1500);
  setTimeout(reset, 1500, answerContainer);
}

/**
 * remove modified classes from previous questions
 */
function reset(container) {
  container.classList.remove("correct");
  container.classList.remove("incorrect");
}

/**
 * return the resulting questions fetched from call to OpenTriviaDatabase
 */
async function generateQuestions() {
  const response = await fetch(url);
  const data = await response.json();

  questions = data.results;
}

//generate questions, then begin the quiz
generateQuestions().then(() => {
  startQuiz();
});
