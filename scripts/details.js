import { displayEventDetails, fetchEvents, getEventById } from '../modules/funciones.js';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayNoEventMessage() {
    document.getElementById('event-details').innerHTML = '<p>No event ID provided</p>';
}

function loadEventDetails() {
    const eventId = getQueryParam('id');

    if (!eventId) {
        displayNoEventMessage();
        return;
    }

    getEventById(eventId)
        .then(event => {
            if (event) {
                displayEventDetails(event);
            } else {
                document.getElementById('event-details').innerHTML = '<p>Event not found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching event details:', error);
            document.getElementById('event-details').innerHTML = '<p>Failed to load event details. Please try again later.</p>';
        });
}

document.addEventListener('DOMContentLoaded', loadEventDetails);
