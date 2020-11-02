"use strict";

class Validator {
  constructor() {
    this.invalidEmailError = "Your email address is wrong!!!!";
    this.emailExistsError =
      "We already have someone signed up with us with that exact email adress!!";
    this.passwordError =
      "Dude, think of a password with 10 characters, it's not that hard.";
    this.repeatPasswordError =
      "Wrong! The Password has to be the same in both fields!";

    this.errors = {
      emailExistsError: this.emailExistsError,
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    };
  }

  validateValidEmail = (email) => {
    if (this.emailSyntaxIsValid(email)) {
      delete this.errors.invalidEmailError;
    } else {
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  };

  emailSyntaxIsValid = (email) => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    const emailIsValid = emailRegEx.test(email);
    return emailIsValid;
  };

  validateUniqueEmail = (newEmail) => {
    const users = db.getAllUsers();
    //const emailExists = users.some((user) => {
    //  return user.email === email;
    //});
    //console.log(emailExists);

    let emailUnique = true;

    users.forEach((userObj) => {
      if (userObj.email === newEmail) {
        emailUnique = false;
      }
    });

    if (emailUnique) {
      delete this.errors.emailExistsError;
    } else {
      this.errors.emailExistsError = this.emailExistsError;
    }
  };

  validatePassword = (password) => {
    if (password.length >= 10) {
      delete this.errors.passwordError;
    } else {
      this.errors.passwordError = this.passwordError;
    }
  };

  validateRepeatPassword = (password, repeatPassword) => {
    if (password === repeatPassword) {
      delete this.errors.repeatPasswordError;
    } else {
      this.errors.repeatPasswordError = this.repeatPasswordError;
    }
  };

  getErrors = () => {
    return this.errors;
  };
}

const validator = new Validator();
