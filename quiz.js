"use strict";

//element Objects
let url = "https://opentdb.com/api.php?amount=10&type=multiple";
const choices = document.body.querySelectorAll(".choice");
const choicesContainer = Array.from(
  document.querySelectorAll(".choice-container")
);
const bodyContainer = document.querySelector(".header-container");
const questionHead = document.querySelector("#question-header");
const questionBox = document.querySelector("#question");
const scoreSheet = document.querySelector("#score-sheet");
const newQuizButton = document.querySelector("#new-quiz");
const modal = document.querySelector(".modal");
const userCategory = document.querySelector("#categories");
const userQuestionAmount = document.querySelector("#question-amount");
const submitButton = document.querySelector("#submit-quiz");
const overlay = document.querySelector("#overlay");

//event listeners
document.querySelector("#restart-button").addEventListener("click", startQuiz);
newQuizButton.addEventListener("click", newQuiz);
submitButton.addEventListener("click", newQuiz);

//global variables
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
  if (!acceptAnswer && acceptAnswer !== undefined) {
    return;
  }
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

    acceptAnswer = true;

    return;
  }

  //grab current question within question array
  currentQuestion = questions[questionIndex];

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

  //disable creating new quizzes until answer is settled
  newQuizButton.classList.add("disabled-button");
  newQuizButton.removeEventListener("click", newQuiz);

  let promise = new Promise((resolve) => {
    setTimeout(() => {
      nextQuestion();
      reset(answerContainer);
      resolve();
    }, 1500);
  });

  promise.then(() => {
    newQuizButton.classList.remove("disabled-button");
    newQuizButton.addEventListener("click", newQuiz);
  });
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
async function generateNewQuestions(url) {
  const response = await fetch(url);
  const data = await response.json();
  questions = data.results;
  console.log(data);
}

function newQuiz() {
  //show the selection menu again if user selects "New Quiz"
  if (modal.classList.contains("inactive")) {
    modal.classList.remove("inactive");
    overlay.classList.remove("inactive");
    //hide Quiz
    bodyContainer.classList.add("inactive");
    return;
  }

  let selectedCategory = userCategory.value;
  let userQuestions = userQuestionAmount.value;

  if (userQuestions > 0 && userQuestions <= 20) {
    let url = `https://opentdb.com/api.php?amount=${userQuestions}&category=${selectedCategory}&type=multiple`;
    generateNewQuestions(url).then(() => {
      startQuiz();
      overlay.classList.add("inactive");
      modal.classList.add("inactive");
      //Show Quiz
      bodyContainer.classList.remove("inactive");
    });
  }
}
