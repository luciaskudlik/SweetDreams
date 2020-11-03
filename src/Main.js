"use strict";

//API with all desserts:

fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const dessertArray = data.meals;
    const idArray = dessertArray.map((dessert) => {
      return dessert.idMeal;
    });
    dessertArray.forEach((dessert, index) => {
      const newDessertElement = document.createElement("div");
      const dessertTitle = dessert.strMeal;
      const imageSource = dessert.strMealThumb;
      const title = document.createElement("h3");
      const image = document.createElement("img");
      title.innerHTML = dessertTitle;
      image.setAttribute("src", imageSource);
      image.classList.add("dessertImages", "card");
      //image.classList.add("card");
      //image.id = "card";
      newDessertElement.appendChild(title);
      newDessertElement.appendChild(image);
      newDessertElement.classList.add("dessertElement");
      document.getElementById("recipes").appendChild(newDessertElement);

      //GETTING INSTRUCTIONS==================================

      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idArray[index]}`
      ) //Meal details API
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          const instructionsCard = document.createElement("div");
          //instructionsCars.id = idArray[index];
          instructionsCard.classList.add("instructions");
          instructionsCard.classList.add("hideInstructions");
          instructionsCard.innerHTML = data.meals[0].strInstructions;
          newDessertElement.appendChild(instructionsCard);
        })
        .catch((err) => {
          console.log(err);
        });

      //============================================================
    });
  })
  .then(() => {
    function turnCard(event) {
      console.log(dessertPic);
      console.log("EVENT TARGET:", event.target);
      const index = event.target.id;
      const instructionsCard = document.querySelectorAll(".instructions");
      instructionsCard[index].classList.toggle("hideInstructions");
    }

    const dessertPic = document.querySelectorAll(".card");
    dessertPic.forEach((dessert, index) => {
      dessert.id = index.toString();
      dessert.addEventListener("click", turnCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
