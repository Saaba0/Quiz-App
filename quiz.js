"use strict";

const choices = document.body.querySelectorAll(".choice");
const choicesContainer = Array.from(
  document.querySelectorAll(".choice-container")
);

let questionNumber = 0;

let questions = [
  {
    question: "What is the name for the Jewish New Year?",
    choice1: "Hanukkah",
    choice2: "Yom Kippur",
    choice3: "Kwanza",
    choice4: "Rosh Hashanah",
    answer: "4",
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

function startQuiz() {
  questionNumber = 1;
  nextQuestion();
}

function nextQuestion() {}

choicesContainer.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    alert("cringe");
  });
});

startQuiz();
