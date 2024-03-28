const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
// searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (window.location.pathname.includes("Main.html")) {
        getMealByCategory();
    } else if (window.location.pathname.includes("Side.html")) {
        getMealByCategory();
    } else if (window.location.pathname.includes("Dessert.html")) {
        getMealByCategory();
    } else if (window.location.pathname.includes("Breakfast.html")) {
        getMealByCategory();
    }
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes("Main.html")) {
            getMealByCategory();
        } else if (window.location.pathname.includes("Side.html")) {
            getMealByCategory();
        } else if (window.location.pathname.includes("Dessert.html")) {
            getMealByCategory();
        } else if (window.location.pathname.includes("Breakfast.html")) {
            getMealByCategory();
        }
    });
}



// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, no meals have been added!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

function getMealByCategory() {
    let categoryEle = document.getElementById('category');
    let categoryVal = categoryEle.textContent;
    let mealList = document.getElementById('meal');

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryVal}`)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, no meals have been added";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching meal data:', error);
        // Handle error here, e.g., display an error message to the user
    });
}



// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
const loadingScreen = document.getElementById('loading-screen');

// window.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     loadingScreen.parentNode.removeChild(loadingScreen);
//   }, 3500); 
// });

const closerecipieofday = document.getElementById('topplace2')
closerecipieofday.addEventListener('click', previousstate )
function previousstate (){
    selection.style.display = 'block';
    selected.style.display = 'none';
}

let selection = document.getElementById('selecttype')
let type = document.getElementById('type')
// let mealItem = document.getElementsByClassName('meal-item')
// let mealItem = document.getElementById('newmeal')
// mealItem.addEventListener('click', () => findSelectedCategory);
// selection.addEventListener('click', getMealRecipe);

// Get all elements with the class "newmeal"
let newMealButtons = document.querySelectorAll('.newmeal');

// Loop through each new meal button
newMealButtons.forEach(button => {
    // Add click event listener to each button
    button.addEventListener('click', function() {
        // Find the corresponding type element within the same meal-item div
        let typeElement = this.closest('.meal-item').querySelector('h3#type');
        let selectedCatVal = typeElement.textContent;

        // Hide selecttype section
        let selection = document.getElementById('selecttype');
        selection.style.display = 'none';

        // Display selectedtype section
        let selected = document.getElementById('selectedtype');
        selected.style.display = 'block';

        // Fetch data and populate selectedtype section
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCatVal}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                let mealList = document.getElementById('meal');
                let html = "";

                if (data.meals) {
                    data.meals.forEach(meal => {
                        html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                        `;
                    });
                    mealList.innerHTML = html;
                } else {
                    mealList.innerHTML = "Sorry, no meals have been added.";
                }
            })
            .catch(error => {
                console.error('Error fetching meal data:', error);
                // Handle error here, e.g., display an error message to the user
            });
    });
});


