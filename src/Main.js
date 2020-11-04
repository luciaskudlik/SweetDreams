"use strict";

function showDessert() {
  const resultSection = document.getElementById("searchresult");
  resultSection.style.display = "block";
  resultSection.innerHTML = "";
  const searchBar = document.getElementById("searchbar");
  const searchWord = searchBar.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const searchResults = data.meals;
      const idArray = searchResults.map((searchResult) => {
        return searchResult.idMeal;
      });
      searchResults.forEach((result, index) => {
        const newSearchResult = document.createElement("div");
        newSearchResult.classList.add("newSearchResult");
        const resultHeading = result.strMeal;
        newSearchResult.innerHTML = resultHeading;
        const newSearchImage = document.createElement("img");
        newSearchImage.setAttribute("src", result.strMealThumb);
        const parentNode = document.getElementById("searchresult");
        newSearchImage.classList.add("dessertImages");
        parentNode.appendChild(newSearchResult);
        newSearchResult.appendChild(newSearchImage);
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idArray[index]}`
        ) //Meal details API
          .then((response) => {
            console.log("RESPONSE:", response);
            return response.json();
          })
          .then((data) => {
            console.log("DATA:", data);
            const recipeCard = document.createElement("p");
            recipeCard.classList.add("recipe-instructions");
            recipeCard.innerHTML = data.meals[0].strInstructions;
            //console.log(instructionsCard);
            newSearchResult.appendChild(recipeCard);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  const hideButton = document.getElementById("hidebutton");

  hideButton.style.display = "block";
}

function hideResults() {
  const resultSection = document.getElementById("searchresult");
  resultSection.style.display = "none";
  const hideButton = document.getElementById("hidebutton");
  hideButton.style.display = "none";
}

const searchButton = document.getElementById("searchbutton");
searchButton.addEventListener("click", showDessert);

const hideButton = document.getElementById("hidebutton");
hideButton.addEventListener("click", hideResults);

//=====================================================

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
      //console.log(dessertPic);
      //console.log("EVENT TARGET:", event.target);
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
