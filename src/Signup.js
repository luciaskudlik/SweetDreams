"use strict";

class Signup {
  constructor() {
    this.nameInput = document.querySelector("#name");
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.repeatPasswordInput = document.querySelector("#repeat-password");
    this.isVegan = document.querySelector("#vegan");
    this.isGlutenFree = document.querySelector("#glutenfree");
    this.hasNone = document.querySelector("#none");
    this.signupButton = document.querySelector("#signup-button");
    this.errorsWrapper = document.querySelector(".message-container");
  }

  handleEmailInput = (event) => {
    const emailInput = event.target;
    const email = emailInput.value;

    validator.validateValidEmail(email);
    validator.validateUniqueEmail(email);

    this.setErrorMessages();
  };

  handlePasswordInput = (event) => {
    const passwordInput = event.target;
    const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  handleRepeatPasswordInput = (event) => {
    const repeatPasswordInput = event.target;
    const passwordInput = this.passwordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    //validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  setErrorMessages = () => {
    this.errorsWrapper.innerHTML = "";

    const errorsObj = validator.getErrors();

    const errorStringsArr = Object.values(errorsObj);

    errorStringsArr.forEach((str) => {
      const p = document.createElement("p");
      //p.classList.add("error-message");
      p.style.color = "red";
      p.style.backgroundColor = "white";
      p.style.fontFamily = "Arial";
      p.style.fontSize = "15px";
      p.style.fontWeight = "lighter";
      p.style.border = "2px solid red";
      p.style.padding = "10px";
      p.style.margin = "10px";
      p.textContent = str;
      this.errorsWrapper.style.display = "block";
      this.errorsWrapper.appendChild(p);
    });
  };

  saveData = (event) => {
    event.preventDefault();

    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const vegan = this.isVegan.checked;
    const glutenFree = this.isGlutenFree.checked;
    const none = this.hasNone.checked;

    const newUser = new User(name, email, password, vegan, glutenFree, none);

    db.saveNewUser(newUser);

    this.nameInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput.value = "";
    this.isVegan.checked = false;
    this.isGlutenFree.checked = false;
    this.hasNone.checked = false;
  };

  addListeners = () => {
    this.emailInput.addEventListener("input", this.handleEmailInput);
    this.passwordInput.addEventListener("input", this.handlePasswordInput);
    this.repeatPasswordInput.addEventListener(
      "input",
      this.handleRepeatPasswordInput
    );
    this.signupButton.addEventListener("click", this.saveData);
  };
}

const signup = new Signup();

window.addEventListener("load", signup.addListeners);
