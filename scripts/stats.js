import { fetchDataAndProcess, groupByCategory, populateCategoryStats } from '../modules/funciones.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndProcess()
        .then(({ upcomingEvents, pastEvents }) => {

            const eventWithHighestAssistance = pastEvents.reduce((prev, current) =>
                (current.assistance / current.capacity) > (prev.assistance / prev.capacity) ? current : prev);
            const eventWithLowestAssistance = pastEvents.reduce((prev, current) =>
                (current.assistance / current.capacity) < (prev.assistance / prev.capacity) ? current : prev);
            const eventWithLargestCapacity = upcomingEvents.reduce((prev, current) => current.capacity > prev.capacity ? current : prev);

            document.getElementById('highest-assistance-data').textContent = `${eventWithHighestAssistance.name} (${((eventWithHighestAssistance.assistance / eventWithHighestAssistance.capacity) * 100).toFixed(2)}%)`;
            document.getElementById('lowest-assistance-data').textContent = `${eventWithLowestAssistance.name} (${((eventWithLowestAssistance.assistance / eventWithLowestAssistance.capacity) * 100).toFixed(2)}%)`;
            document.getElementById('largest-capacity-data').textContent = `${eventWithLargestCapacity.name} (${eventWithLargestCapacity.capacity})`;

            const upcomingStatsContainer = document.getElementById('upcoming-events-stats');
            const upcomingCategories = groupByCategory(upcomingEvents);
            populateCategoryStats(upcomingStatsContainer, upcomingCategories);

            const pastStatsContainer = document.getElementById('past-events-stats');
            const pastCategories = groupByCategory(pastEvents);
            populateCategoryStats(pastStatsContainer, pastCategories);
        })
        .catch(error => {
            console.error("Error processing data:", error);
        });
});
