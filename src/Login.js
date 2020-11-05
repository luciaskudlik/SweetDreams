"use strict";

class Login {
  constructor() {
    this.emailInput = document.querySelector("#login-email");
    this.passwordInput = document.querySelector("#login-password");
    this.messageContainer = document.querySelector(".message-container");
    this.loginButton = document.querySelector("#login-button");
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    const users = db.getAllUsers();

    const user = users.find(function (userObj) {
      if (userObj.email === email && userObj.password === password) {
        return true;
      }
    });

    //Create Error or welcome message plus styling:
    const p = document.createElement("p");

    if (!user) {
      this.messageContainer.style.display = "block";
      this.messageContainer.innerHTML = "";
      p.innerHTML = "Email or password are incorrect!";
      p.classList.add("error-message");
      p.style.fontSize = "15px";
      this.messageContainer.appendChild(p);
    } else {
      this.messageContainer.style.backgroundColor = "white";
      this.messageContainer.style.padding = "5px";
      p.style.color = "#EE836C";
      p.style.padding = "10px";
      p.style.fontSize = "40px";
      p.style.border = "3px solid #91d8d8";
      this.messageContainer.style.display = "block";
      this.messageContainer.innerHTML = "";
      p.innerHTML = `Welcome back, ${user.name}! We are directing you to the main page ...`;
      this.messageContainer.appendChild(p);
      this.redirect();
    }
  };

  redirect = () => {
    setTimeout(function () {
      location.assign("index.html");
    }, 4000);
  };
}

const login = new Login();

window.addEventListener("load", function () {
  login.loginButton.addEventListener("click", login.handleSubmit);
});
