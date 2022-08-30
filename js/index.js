console.log("index.js is connected");
const phoneURL = "https://openapi.programming-hero.com/api/phones?search=a"

function fetchPhones(URL) {
	const cardGrid = document.getElementById("card-grid");
	const loadScreen = `
	<div class="col">
	    <div class="d-flex justify-content-center align-items-centery">
		<div class="loader"></div>
	    </div>
	</div>
	<div class="col">
	    <div class="d-flex justify-content-center align-items-centery">
		<div class="loader"></div>
	    </div>
	</div>
	<div class="col">
	    <div class="d-flex justify-content-center align-items-centery">
		<div class="loader"></div>
	    </div>
	</div>
	`;
	cardGrid.innerHTML = loadScreen;
	fetch(URL)
		.then(res => res.json())
		.then(data => {

			const cardGrid = document.getElementById("card-grid");
			displayPhone(data)
		});
}

fetchPhones(phoneURL);

function searchPhones(URL, func) {
	fetch(URL)
		.then(res => res.json())
		.then(data => func(data));
}

function displayPhone({data: dataArr}) {
	console.log(dataArr);
	const cardGrid = document.getElementById("card-grid");
	cardGrid.innerHTML = "";
	dataArr.forEach(phone => {
		const {phone_name, slug} = phone;
		const aDish = document.createElement("div");
		aDish.classList.add("col");
		cardInnerHtml = `
	  <div class="card">
	    <img src="./images/test.jpg" class="card-img-top" alt="Image of ${phone_name}">
	    <div class="card-body">
	      <h5 class="card-title">${phone_name}</h5>
	      <!-- Button trigger modal -->
<button onclick="popDetailModal('${slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Details
</button>
	    </div>
	</div>
	`;
		aDish.innerHTML = cardInnerHtml;
		const cardGrid = document.getElementById("card-grid");
		cardGrid.appendChild(aDish);
	});
}

//Triggers
function popDetailModal(phoneId) {
	const modalBody = document.getElementById("modal-body");
	const modalTitle = document.getElementById("modalDishTitle");
	const loadScreen = `
	<div class="col">
	    <div class="d-flex justify-content-center align-items-centery">
		<div class="loader"></div>
	    </div>
	</div>
	`;
	modalBody.innerHTML = loadScreen;
	modalTitle.textContent = "";

	const URL = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
	searchPhones(URL, showModalDishDetails);
}

function showSearchResult() {
	const cardGrid = document.getElementById("card-grid");
	const loadScreen = `
	<div class="col">
	    <div class="d-flex justify-content-center align-items-centery">
		<div class="loader"></div>
	    </div>
	</div>
	<div class="col">
	    <div class="d-flex justify-content-center align-items-centery">
		<div class="loader"></div>
	    </div>
	</div>
	<div class="col">
	    <div class="d-flex justify-content-center align-items-centery">
		<div class="loader"></div>
	    </div>
	</div>
	`;
	cardGrid.innerHTML = loadScreen;
	const query = document.getElementById("search-box").value;
	console.log(query);

	const URL = `https://openapi.programming-hero.com/api/phones?search=${query}`;
	searchPhones(URL, displayPhone);

}

//Populator
function showModalDishDetails({data}) {
	const modalBody = document.getElementById("modal-body");
	const modalTitle = document.getElementById("modalDishTitle");
	const {name, image, mainFeatures} = data;
	modalTitle.textContent = name;
	cardInnerHtml = `
	  <div class="card">
	    <img src="${image}" class="card-img-top" alt="...">
	    <div class="card-body">
	      <h5 class="card-title">${name}</h5>
	      <p class="card-text text-justify">${JSON.stringify(mainFeatures)}</p>
	    </div>
	</div>
	`;
	modalBody.innerHTML = cardInnerHtml;

}

