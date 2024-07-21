function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
//setInterval(updateClock, 1000);

// Initialize the clock
//updateClock();

// Nof hayalon
// latitude=34.991321
// longitude=31.871215 
// elev=
// tzid= 

function updateShabbatHour() {
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geo=pos&latitude=34.991321&longitude=31.871215&c=on&b=10&M=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        const shabbatHour = data.items.find( record => record.title_orig === "Candle lighting").date.substring(11, 16);
        document.getElementById('shabbat-hour').textContent = `הדלקת נרות:${shabbatHour}`;
        const motzash = data.items.find( record => record.title_orig === "Havdalah").date.substring(11, 16);
        document.getElementById('motzash').textContent = `מוצ״ש:${motzash}`;
        

        console.log('This is a debug message');
        console.log('Shabbat hour:', shabbatHour);
    })
    .catch(error => {
        console.error('Error fetching the Shabbat hour:', error);
    });
}

updateShabbatHour();