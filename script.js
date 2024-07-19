function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    
    const hourDeg = (hour % 12) * 30 + (minute / 2);
    const minuteDeg = minute * 6;
    const secondDeg = second * 6;
    
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

// Update clock every second
//setInterval(updateClock, 1000);
//updateClock(); // Initial call to set the clock

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