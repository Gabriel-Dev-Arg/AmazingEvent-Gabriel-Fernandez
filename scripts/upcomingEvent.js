import { renderEvents, createNavChecks, fetchEventsData, filterFutureEvents } from '../modules/funciones.js';

const futureEventsContainer = document.getElementById("future-events-container");
const check = document.getElementById("checked");

function init() {
  fetchEventsData()
    .then(data => {
      createNavChecks(data.events, check); 
      const filteredEvents = filterFutureEvents(data); 
      renderEvents(filteredEvents, futureEventsContainer);

      document.getElementById('searchButton').addEventListener('click', () => {
        const updatedFilteredEvents = filterFutureEvents(data);
        renderEvents(updatedFilteredEvents, futureEventsContainer);
      });

      document.querySelectorAll(".form-check-input").forEach(checkbox => 
        checkbox.addEventListener('change', () => {
          const updatedFilteredEvents = filterFutureEvents(data);
          renderEvents(updatedFilteredEvents, futureEventsContainer);
        })
      );
    })
    .catch(error => console.error('Error initializing page:', error));
}

init();
