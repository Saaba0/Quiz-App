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
  nextQuestion();
}

/**
 * Update Element text, set the new currentQuestion
 */
function nextQuestion() {
  /**
   * if there's no more questions, disable clicking event for all choices
   */
  if (questionIndex > questions.length - 1) {
    choicesContainer.forEach((elem) => {
      elem.removeEventListener("click", userAnswer);
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
}

/**
 * check user's answer, update question counter variables
 */
function checkAnswer(answer) {
  if (answer === currentQuestion.answer) {
    console.log("Got it");
  } else {
    console.log("Nah");
  }

  questionNumber++;
  questionIndex++;

  //check if there's any more questions to ask
  if (questionIndex > questions.length - 1) {
    console.log("Game Over");
  } else {
    nextQuestion();
  }
}

function userAnswer(event) {
  console.log(event.target);
  let elem = event.target.closest(".choice-container");
  checkAnswer(elem.querySelector(".choice").innerText);
}

choicesContainer.forEach((elem) => {
  elem.addEventListener("click", userAnswer);
});

startQuiz();
