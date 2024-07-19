function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock
updateClock();

function updateShabbatHour() {
    fetch('https://www.hebcal.com/shabbat?cfg=json&geo=IL-Modiin&ue=off&M=on&lg=s&tgt=_top')
    .then(response => response.json())
    .then(data => {
        const shabbatHour = data.items[0].title;
        const shabbatHourElement = document.getElementById('shabbat-hour');
        shabbatHourElement.textContent = shabbatHour;
        console.log('This is a debug message');
        console.log('Shabbat hour:', shabbatHour);
    })
    .catch(error => {
        console.error('Error fetching the Shabbat hour:', error);
    });
}

updateShabbatHour();