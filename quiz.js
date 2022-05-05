"use strict";

const choices = document.body.querySelectorAll(".choice");
const choicesContainer = Array.from(
  document.querySelectorAll(".choice-container")
);
const questionHead = document.querySelector("#question-header");
const questionBox = document.querySelector("#question");
let currentQuestion;
let questionIndex = 0;
let questionNumber = 0;
let acceptAnswer;

let questions = [
  {
    question: "What is the name for the Jewish New Year?",
    choice1: "Hanukkah",
    choice2: "Yom Kippur",
    choice3: "Kwanza",
    choice4: "Rosh Hashanah",
    answer: "Rosh Hashanah",
  },
  {
    question: "How many blue stripes are there on the U.S. flag?",
    choice1: "6",
    choice2: "7",
    choice3: "13",
    choice4: "0",
    answer: "0",
  },
  {
    question: "Which one of these characters is not friends with Harry Potter?",
    choice1: "Ron Weasley",
    choice2: "Neville Longbottom",
    choice3: "Draco Malfoy",
    choice4: "Hermione Granger",
    answer: "Draco Malfoy",
  },
];

/**
 * Initialize the Quiz and starter variables
 */
function startQuiz() {
  questionNumber = 1;
  questionIndex = 0;
  acceptAnswer = true;
  nextQuestion();
}

/**
 * Update Element text, reset choice container styles, set the new currentQuestion
 */
function nextQuestion() {
  //show "Game Finished" screen if there's no more questions, disable clicking event for all choices,
  if (questionIndex > questions.length - 1) {
    choicesContainer.forEach((elem) => {
      elem.removeEventListener("click", checkAnswer);
    });
    return;
  }

  //grab current question within question array
  currentQuestion = questions[questionIndex];

  //update webpage elements
  questionBox.innerText = currentQuestion.question;
  questionHead.innerText = "Question " + questionNumber;

  for (let i = 0; i < choices.length; i++) {
    choices[i].innerText = currentQuestion["choice" + (i + 1)];
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

  if (answer === currentQuestion.answer) {
    answerContainer.classList.add("correct");
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

choicesContainer.forEach((elem) => {
  elem.addEventListener("click", checkAnswer);
});

startQuiz();
