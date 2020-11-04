"use strict";

const questions = document.querySelectorAll(".question");
const answers = document.querySelectorAll(".answer");

questions.forEach((question, index) => {
  question.addEventListener("click", function () {
    answers[index].classList.toggle("displayAnswer");
  });
});
