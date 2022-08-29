console.log("index.js is connected");
const foodURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=a"

function fetchMeals(URL) {
	fetch(URL)
		.then(res => res.json())
		.then(({meals}) => displayDish(meals));
}

fetchMeals(foodURL);

function searchMeals(URL, func) {
	fetch(URL)
		.then(res => res.json())
		.then(({meals}) => func(meals));

}

function displayDish(dataArr) {
	const cardGrid = document.getElementById("card-grid");
	cardGrid.innerHTML = "";
	dataArr.forEach(dish => {
		const {idMeal, strMealThumb, strMeal, strInstructions} = dish;
		const aDish = document.createElement("div");
		aDish.classList.add("col");
		cardInnerHtml = `
	  <div class="card">
	    <img src="${strMealThumb}" class="card-img-top" alt="...">
	    <div class="card-body">
	      <h5 class="card-title">${strMeal}</h5>
	      <p class="card-text text-justify">${strInstructions.slice(0, 100)}</p>
	      <!-- Button trigger modal -->
<button onclick="popDetailModal('${idMeal}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Details
</button>
	    </div>
	</div>
	`;
		aDish.innerHTML = cardInnerHtml;
		cardGrid.appendChild(aDish);
	});
}

//Triggers
function popDetailModal(idMeal) {
	const modalBody = document.getElementById("modal-body");
	modalBody.innerHTML = "";

	const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
	searchMeals(URL, showModalDishDetails);
}

function showSearchResult() {
	const cardGrid = document.getElementById("card-grid");
	cardGrid.innerHTML = "";

	const query = document.getElementById("search-box").value;
	console.log(query);

	const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
	searchMeals(URL, displayDish);

}

//Populator
function showModalDishDetails(mealSingleArr) {
	const modalBody = document.getElementById("modal-body");
	const modalTitle = document.getElementById("modalDishTitle");
	const {idMeal, strMealThumb, strMeal, strInstructions} = mealSingleArr[0];
	modalTitle.textContent = strMeal;
	cardInnerHtml = `
	  <div class="card">
	    <img src="${strMealThumb}" class="card-img-top" alt="...">
	    <div class="card-body">
	      <h5 class="card-title">${strMeal}</h5>
	      <p class="card-text text-justify">${strInstructions.slice(0, 100)}</p>
	    </div>
	</div>
	`;
	modalBody.innerHTML = cardInnerHtml;

}

