// modules/funciones.js

export const apiUrl = 'https://aulamindhub.github.io/amazing-api/events.json';

export function getEventsData() {
  return fetch(apiUrl) 
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }
      return response.json();
    })
    .then(data => data.events)
    .catch(error => {
      console.error('Error fetching events:', error);
      return [];
    });
}

export function fetchEvents() {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.events);
}

export function getEventById(id) {
  return fetchEvents()
    .then(events => {
      console.log('Events fetched:', events);
      console.log('Searching for event with ID:', id);
      const event = events.find(event => String(event._id) === String(id));
      
      console.log('Event found:', event);
      return event;
    });
}

export function fetchEventsData() {
  return fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching events:', error);
      return { events: [], currentDate: new Date().toISOString() };
    });
}

export function createNavChecks(events, container) {
  if (!container) return;

  const categories = [...new Set(events.map(event => event.category))];
  const checkboxesContainer = document.createElement("div");
  checkboxesContainer.className = "bg-blue mb-4 text-white";
  checkboxesContainer.innerHTML = `
    <div class="d-flex col-12 col-sm-12 fs-6 p-4 flex-wrap justify-content-between bg-blue text-white">
        <div class="d-flex gap-3 justify-content-center flex-row flex-wrap flex-lg-row flex-md-row flex-sm-row col-12 col-sm-12 col-md-8" id="category-checkboxes">
        </div>
        <div class="d-flex col-12 col-lg col-md justify-content-center">
            <form class="d-flex d-flex col-6 col-lg col-md" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchInput">
                <button class="btn bg-white" type="button" id="searchButton">
                    <i class="bi bi-search fs-6"></i>
                </button>
            </form>
        </div>
    </div>
  `;
  container.appendChild(checkboxesContainer);

  const checkboxesContainerDiv = document.getElementById("category-checkboxes");
  categories.forEach((category, index) => {
    const checkbox = document.createElement("div");
    checkbox.className = "form-check";
    checkbox.innerHTML = `
      <input class="form-check-input bg-gray" type="checkbox" id="category${index}" value="${category}">
      <label class="form-check-label" for="category${index}">${category}</label>
    `;
    checkboxesContainerDiv.appendChild(checkbox);
  });
}

export function renderEvents(events, contenedor) {
  if (!contenedor) return;

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
      tarjeta.className = "custom-col"; // Clase personalizada
      tarjeta.innerHTML = `
        <div class="custom-card">
          <img class="custom-card-img" src="${event.image}">
          <div class="custom-card-body">
            <h5 class="custom-card-title">${event.name}</h5>
            <p class="custom-card-text">${event.description}</p>
            <div class="custom-card-footer">
              <p><strong>Price:</strong> $${event.price}</p>
              <a href="../pages/details.html?id=${event._id}" class="custom-card-btn">Details</a>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  }
}


export function displayEventDetails(event) {
  const eventDetailsContainer = document.getElementById('event-details');
  if (event) {
    eventDetailsContainer.innerHTML = `
      <div class="mt-5 align-items-center card m-1 d-flex col-8 col-sm-8 col-lg-8 flex-sm-column flex-md-column flex-lg-row flex-column justify-content-center col-12">
        <img class="card-imagen col-8 col-lg-6 col-sm-8 col-md-8" src="${event.image}" alt="${event.name}">
        <div class="card-body col-12 col-lg-6">
          <h5 class="card-title text-center">${event.name}</h5>
          <p class="card-text">${event.description}</p>
          <p><strong>Category:</strong> ${event.category}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Place:</strong> ${event.place}</p>
          <p><strong>Price:</strong> $${event.price}</p>
          <p><strong>Capacity:</strong> ${event.capacity}</p>
          ${event.assistance ? `<p><strong>Assistance:</strong> ${event.assistance}</p>` : `<p><strong>Estimated:</strong> ${event.estimate}</p>`}
        </div>
      </div>
    `;
  } else {
    eventDetailsContainer.innerHTML = '<p>Event not found</p>';
  }
}

export function filterEvents(events, contenedor) {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategories = Array.from(document.querySelectorAll(".form-check-input:checked")).map(checkbox => checkbox.value);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    return matchesSearch && matchesCategory;
  });

  renderEvents(filteredEvents, contenedor);
}

// Función para filtrar eventos pasados
export function filterPastEvents(data) {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategories = Array.from(document.querySelectorAll(".form-check-input:checked")).map(checkbox => checkbox.value);

  const currentDate = new Date(data.currentDate);

  const filteredEvents = data.events.filter(event => {
    const eventDate = new Date(event.date);

    const matchesSearch = event.name.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);

    return eventDate <= currentDate && matchesSearch && matchesCategory;
  });

  return filteredEvents;
}

export function filterFutureEvents(data) {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategories = Array.from(document.querySelectorAll(".form-check-input:checked")).map(checkbox => checkbox.value);

  const currentDate = new Date(data.currentDate);

  const filteredEvents = data.events.filter(event => {
    const eventDate = new Date(event.date);

    const matchesSearch = event.name.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);

    return eventDate > currentDate && matchesSearch && matchesCategory;
  });

  return filteredEvents;
}