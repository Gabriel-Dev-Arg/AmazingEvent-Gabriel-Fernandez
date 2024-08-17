import data from '../modules/data.js';

let contenedor = document.getElementById("contenedor");
let check = document.getElementById("checked");


let navChecks = document.createElement("div");
navChecks.className = "bg-blue mb-4 text-white ";
navChecks.innerHTML = `
<div class="d-flex col-12 col-sm-12 fs-6 p-4 flex-wrap justify-content-between bg-blue text-white">
    <div class="d-flex gap-3 justify-content-center flex-row flex-wrap flex-lg-row flex-md-row flex-sm-row col-12 col-sm-12 col-md-8 "id="category-checkboxes">
    </div>
    <div class="d-flex col-12 col-lg col-md justify-content-center>
        <form class="d-flex d-flex col-6 col-lg col-md " role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchInput">
            <button class="btn bg-white" type="button" id="searchButton">
                <i class="bi bi-search fs-6"></i>
            </button>
        </form>
    </div>
</div>

`;

check.appendChild(navChecks);


const categories = [...new Set(data.events.map(event => event.category))];
const checkboxesContainer = document.getElementById("category-checkboxes");

categories.forEach((category, index) => {
    const checkbox = document.createElement("div");
    checkbox.className = "form-check";
    checkbox.innerHTML = `
        <input class="form-check-input bg-gray" type="checkbox" id="category${index}" value="${category}">
        <label class="form-check-label" for="category${index}">${category}</label>
        
        
    `;
    checkboxesContainer.appendChild(checkbox);
});

function filterEvents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll(".form-check-input:checked")).map(checkbox => checkbox.value);

    const filteredEvents = data.events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        return matchesSearch && matchesCategory;
    });

    renderEvents(filteredEvents);
}

function renderEvents(events) {
    contenedor.innerHTML = '';
    if (events.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center">
                <h3>Oops! No encontramos eventos que coincidan con tu búsqueda.</h3>
                <p>Intenta ajustar tus filtros o busca algo diferente.</p>
            </div>
        `;
    } else {
        events.forEach(event => {
            let tarjeta = document.createElement("div");
            tarjeta.className = "col-md-4 col-9 col-sm-6 col-lg-3 ";
            tarjeta.innerHTML = `
                <div class="card m-1 width_18rem">
                    <img class="card-img-top" src="${event.image}">
                    <div class="card-body">
                        <h5 class="card-title text-center">${event.name}</h5>
                        <p class="card-text h-parrafo">${event.description}</p>
                        <div class="d-flex justify-content-between">
                            <p><strong>Price:</strong> $${event.price}</p>
                            <a href="./pages/details.html?id=${event._id}" class="btn btn-primary">Details</a>
                        </div>
                    </div>
                </div>
            `;
            contenedor.appendChild(tarjeta);
        });
    }
}


document.getElementById('searchButton').addEventListener('click', filterEvents);
document.querySelectorAll(".form-check-input").forEach(checkbox => checkbox.addEventListener('change', filterEvents));


renderEvents(data.events);