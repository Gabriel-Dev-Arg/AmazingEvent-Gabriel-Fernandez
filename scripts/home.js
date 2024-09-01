// home.js
import { createNavChecks, renderEvents, getEventsData, filterEvents } from '../modules/funciones.js';

const contenedor = document.getElementById("contenedor");
const check = document.getElementById("checked");

let events = [];

function init() {
  getEventsData()
    .then(data => {
      events = data;
      console.log(events);

      createNavChecks(events, check); 
      
      renderEvents(events, contenedor); 
      
      document.getElementById('searchButton').addEventListener('click', () => filterEvents(events, contenedor));
      document.querySelectorAll(".form-check-input").forEach(checkbox => 
        checkbox.addEventListener('change', () => filterEvents(events, contenedor))
      );
    })
    .catch(error => {
      console.error('Error initializing page:', error);
    });
}

init();
