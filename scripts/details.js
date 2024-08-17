import data from '../modules/data.js';

function getEventById(id) {
    return data.events.find(event => event._id === id);
}

function displayEventDetails(event) {
    const eventDetailsContainer = document.getElementById('event-details');
    if (event) {
        eventDetailsContainer.innerHTML = `
            <div class="mt-5 align-items-center card m-1 d-flex col-8 col-sm-8 col-lg-8 flex-sm-column flex-md-column flex-lg-row flex-column justify-content-center col-12">
                <img class="card-imagen col-8 col-lg-6 col-sm-8 col-md-8" src="${event.image}">
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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const eventId = getQueryParam('id');
    if (eventId) {
        const event = getEventById(eventId);
        displayEventDetails(event);
    } else {
        document.getElementById('event-details').innerHTML = '<p>No event ID provided</p>';
    }
});
