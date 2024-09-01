import { renderEvents, createNavChecks, fetchEventsData, filterPastEvents } from '../modules/funciones.js';

const pastEventsContainer = document.getElementById("past-events-container");
const check = document.getElementById("checked");

function init() {
  fetchEventsData()
    .then(data => {
      createNavChecks(data.events, check); 
      const filteredEvents = filterPastEvents(data);
      renderEvents(filteredEvents, pastEventsContainer);

      document.getElementById('searchButton').addEventListener('click', () => {
        const updatedFilteredEvents = filterPastEvents(data);
        renderEvents(updatedFilteredEvents, pastEventsContainer);
      });

      document.querySelectorAll(".form-check-input").forEach(checkbox => 
        checkbox.addEventListener('change', () => {
          const updatedFilteredEvents = filterPastEvents(data);
          renderEvents(updatedFilteredEvents, pastEventsContainer);
        })
      );
    })
    .catch(error => console.error('Error initializing page:', error));
}

init();
