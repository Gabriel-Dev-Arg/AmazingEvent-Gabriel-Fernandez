document.addEventListener('DOMContentLoaded', () => {
    fetch('https://aulamindhub.github.io/amazing-api/events.json')
        .then(response => response.json())
        .then(data => {
            const events = data.events;
            const currentDate = new Date("2023-03-10");
            const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
            const pastEvents = events.filter(event => new Date(event.date) <= currentDate);

            console.log('Upcoming Events:', upcomingEvents);
            console.log('Past Events:', pastEvents);

            const eventWithHighestAssistance = pastEvents.reduce((prev, current) =>
                (current.assistance / current.capacity) > (prev.assistance / prev.capacity) ? current : prev);
            const eventWithLowestAssistance = pastEvents.reduce((prev, current) =>
                (current.assistance / current.capacity) < (prev.assistance / prev.capacity) ? current : prev);
            const eventWithLargestCapacity = events.reduce((prev, current) => current.capacity > prev.capacity ? current : prev);

            document.getElementById('highest-assistance-data').textContent = `${eventWithHighestAssistance.name} (${((eventWithHighestAssistance.assistance / eventWithHighestAssistance.capacity) * 100).toFixed(2)}%)`;
            document.getElementById('lowest-assistance-data').textContent = `${eventWithLowestAssistance.name} (${((eventWithLowestAssistance.assistance / eventWithLowestAssistance.capacity) * 100).toFixed(2)}%)`;
            document.getElementById('largest-capacity-data').textContent = `${eventWithLargestCapacity.name} (${eventWithLargestCapacity.capacity})`;

            const upcomingStatsContainer = document.getElementById('upcoming-events-stats');
            const upcomingCategories = groupByCategory(upcomingEvents);
            console.log('Upcoming Categories:', upcomingCategories); 
            populateCategoryStats(upcomingStatsContainer, upcomingCategories);

            const pastStatsContainer = document.getElementById('past-events-stats');
            const pastCategories = groupByCategory(pastEvents);
            console.log('Past Categories:', pastCategories); 
            populateCategoryStats(pastStatsContainer, pastCategories);

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});


function groupByCategory(events) {
    const categoryMap = {};
    events.forEach(event => {
        if (!categoryMap[event.category]) {
            categoryMap[event.category] = {
                revenue: 0,
                assistancePercentage: 0,
                totalCapacity: 0,
                totalAssistance: 0
            };
        }

        const categoryStats = categoryMap[event.category];
        categoryStats.revenue += event.price * (event.assistance || event.estimate);
        categoryStats.totalCapacity += event.capacity;
        categoryStats.totalAssistance += event.assistance || event.estimate;
    });

    for (const category in categoryMap) {
        const stats = categoryMap[category];
        stats.assistancePercentage = ((stats.totalAssistance / stats.totalCapacity) * 100).toFixed(2);
    }

    console.log('Grouped Categories:', categoryMap); 
    return categoryMap;
}


function populateCategoryStats(container, categories) {
    container.innerHTML = ''; 
    for (const category in categories) {
        const row = document.createElement('tr');
        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        const revenueCell = document.createElement('td');
        revenueCell.textContent = `$${categories[category].revenue.toFixed(2)}`;
        const percentageCell = document.createElement('td');
        percentageCell.textContent = `${categories[category].assistancePercentage}%`;

        row.appendChild(categoryCell);
        row.appendChild(revenueCell);
        row.appendChild(percentageCell);
        container.appendChild(row);
    }
    console.log('Table Populated with Categories:', container.innerHTML); 
}
