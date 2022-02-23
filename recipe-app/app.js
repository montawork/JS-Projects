// select from DOM
const mealsElm = document.querySelector('.meals');
const searchInput = document.getElementById('search-tearm');
const searchBtn = document.querySelector('.search-btn');
const popupSection = document.querySelector('.popup-section');
const closeBtn = document.querySelector('.close-btn');
const info = document.querySelector('.info');

// invoke functions
getRandomMeal();

// event listener
searchBtn.addEventListener('click', displaySearchMeals);

// random meal
async function getRandomMeal() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );
  const meal = await response.json();
  const { strMeal, strMealThumb, strInstructions } = meal.meals[0];
  mealsElm.innerHTML = `
 <div class="meal">
 <div class="meal-header">
   <span class="random"> Random Recipe </span>
   <img class="random-img" src=${strMealThumb} alt="" />
 </div>
 <div class="meal-body">
   <h4 class="random-recipe-title">${strMeal}</h4>
   <svg
     xmlns="http://www.w3.org/2000/svg"
     class="h-6 w-6 rate"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor"
   >
     <path
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-width="2"
       d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
     />
   </svg>
 </div>
</div>
 `;

  // show more info
  const mealTarget = document.querySelector('.meal img');
  mealTarget.addEventListener('click', () => {
    popupSection.style.visibility = 'visible';
    closeBtn.addEventListener(
      'click',
      () => (popupSection.style.visibility = 'hidden')
    );
    // get all ingredients
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal.meals[0]['strIngredient' + i]) {
        ingredients.push(
          `${meal.meals[0]['strIngredient' + i]} - ${
            meal.meals[0]['strMeasure' + i]
          }`
        );
      }
    }
    info.innerHTML = `
      <h3>${strMeal}</h3>
      <img
        src=${strMealThumb}
        alt=""
      />
      <h4>Instructions</h4>
      <p>
        ${strInstructions}
      </p>
      <h4>Ingredients</h4>
      <ul>
      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
      `;
  });
  // add to favorite meals
  addToFav();
}

// search meal by name
async function searchMeal(mealName) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  const { meals } = await response.json();
  return meals;
}

// display search result
async function displaySearchMeals() {
  const inputValue = searchInput.value;
  const meals = (await searchMeal(inputValue)) || [];

  let mealsResult = [];
  mealsResult = meals.map(({ strMeal, strMealThumb }) => {
    return `
    <div class="meal">
    <div class="meal-header">
      <img class="random-img" src=${strMealThumb} alt="" />
    </div>
    <div class="meal-body">
      <h4 class="random-recipe-title">${strMeal}</h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 rate"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
   </div>
    `;
  });
  mealsElm.innerHTML = mealsResult.join('');
  searchInput.value = '';
  // add to favorite meals
  addToFav();
  // show more info
  showInfo(meals);
}

// add to favorite meals
function addToFav() {
  const rates = document.querySelectorAll('.meal-body svg');
  rates.forEach((rate) =>
    rate.addEventListener('click', () => {
      rate.classList.toggle('active');
      console.log(rate.parentElement.firstElementChild.textContent);
      console.log(rate.parentElement.previousElementSibling.lastElementChild);
    })
  );
}

// show more info
function showInfo(meals) {
  const allMeals = [...document.querySelectorAll('.meal img')];
  allMeals.forEach((meal, index) => {
    const targetMeal = meals[index];
    const { strMeal, strMealThumb, strInstructions } = targetMeal;
    // get all ingredients
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (targetMeal['strIngredient' + i]) {
        ingredients.push(
          `${targetMeal['strIngredient' + i]} - ${targetMeal['strMeasure' + i]}`
        );
      }
    }
    meal.addEventListener('click', () => {
      popupSection.style.visibility = 'visible';
      closeBtn.addEventListener(
        'click',
        () => (popupSection.style.visibility = 'hidden')
      );
      info.innerHTML = `
      <h3>${strMeal}</h3>
      <img
        src=${strMealThumb}
        alt=""
      />
      <h4>Instructions</h4>
      <p>
        ${strInstructions}
      </p>
      <h4>Ingredients</h4>
      <ul>
      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
      `;
    });
  });
}
