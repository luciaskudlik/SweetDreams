"use strict";

class Login {
  constructor() {
    this.emailInput = document.querySelector("#login-email");
    this.passwordInput = document.querySelector("#login-password");
    this.messageContainer = document.querySelector(".message-container");
    this.loginButton = document.querySelector("#login-button");
  }

  // handle the login (when user clicks the Login button)
  handleSubmit = (event) => {
    // prevent the reload of the page ( form subit button reloads the page)
    event.preventDefault();

    // get the values from the inputs
    const email = this.emailInput.value; // sergi
    const password = this.passwordInput.value; //  126

    // Get the users from db (localStorage)
    const users = db.getAllUsers();

    // Check the password and email exist in the db (localStorage) -
    // arr.find() - returns the first element that matches the experssion

    // [ {uros  123},  {sergi  123}, {  tasha   123}   ]

    const user = users.find(function (userObj) {
      if (userObj.email === email && userObj.password === password) {
        return true;
      }
    });

    // empty the container so that the messages don't add up
    //this.messageContainer.innerHTML = "";
    const p = document.createElement("p");
    p.style.color = "#EE836C";
    p.style.padding = "10px";

    // set the message
    if (!user) {
      this.messageContainer.innerHTML = "";
      p.innerHTML = "Email or password are incorrect!";
      p.style.color = "red";
      p.style.fontFamily = "Arial";
      this.messageContainer.appendChild(p);
    } else {
      this.messageContainer.innerHTML = "";
      p.innerHTML = `Welcome back, ${user.name}, we've missed you!`;
      this.messageContainer.appendChild(p);

      //p.classList.add("correct-message");
      // Redirect to the dashboard page
      this.redirect();
    }

    this.messageContainer.appendChild(p);
  };

  redirect = () => {
    setTimeout(function () {
      location.assign("dashboard.html");
    }, 2000);

    // setTimeout( () => location.assign("dashboard.html"), 2000)
  };
}

const login = new Login();

window.addEventListener("load", function () {
  login.loginButton.addEventListener("click", login.handleSubmit);
});
