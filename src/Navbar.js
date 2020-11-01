// Burger-Menu-Icons Functionality

const toggleNavBar = () => {
  const listItems = document.querySelector(".menu");
  listItems.classList.toggle("fold-out-menu");
  const foldedOutMenu = document.createElement("div");
  foldedOutMenu.appendChild(listItems);
  const main = document.querySelector("main");
  document.body.insertBefore(foldedOutMenu, main);
};

const burgerMenuBar = document.querySelector(".burger-menu");
burgerMenuBar.addEventListener("click", toggleNavBar);
