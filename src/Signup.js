"use strict";

class Signup {
  constructor() {
    // store all of the input elements
    this.nameInput = document.querySelector("#name");
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.repeatPasswordInput = document.querySelector("#repeat-password");
    this.isVegan = document.querySelector("#vegan");
    this.isGlutenFree = document.querySelector("#glutenfree");
    this.hasNone = document.querySelector("#none");
    this.buttonInput = document.querySelector("#signup-button");
    this.errorsWrapper = document.querySelector(".message-container");
  }

  // handle the email input
  handleEmailInput = (event) => {
    const emailInput = event.target;
    const email = emailInput.value;

    validator.validateValidEmail(email);
    validator.validateUniqueEmail(email);

    this.setErrorMessages();
  };

  // handle the password input
  handlePasswordInput = (event) => {
    const passwordInput = event.target;
    //const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    //const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    //validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  // handle the repeat-password input
  // password confirmation
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
      p.style.color = "red";
      p.style.fontFamily = "Arial";
      p.style.border = "2px solid red";
      p.style.padding = "10px";
      p.style.margin = "10px";
      p.textContent = str;
      //this.errorsWrapper.style.display = "block";
      this.errorsWrapper.appendChild(p);
    });
  };

  // handle the sending of the data ( on submit )
  saveData = (event) => {
    event.preventDefault();

    // get the value from all of the inputs
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const vegan = this.isVegan.checked;
    const glutenFree = this.isGlutenFree.checked;
    const none = this.hasNone.checked;

    // create the new user
    const newUser = new User(name, email, password, vegan, glutenFree, none);

    // Save the user in the database
    db.saveNewUser(newUser);

    // empty the form
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
    this.buttonInput.addEventListener("click", this.saveData);
  };
}

const signup = new Signup();

// Add event listeners once the page and all the resources are loaded

window.addEventListener("load", signup.addListeners);
