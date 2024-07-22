
let config;

function readConfig() {
    fetch('config.json')
    .then(response => response.json())
    .then(data => {
        config = data;
        console.log('Configuration:', config);
    })
    .catch (error => {
        console.error('Error fetching config', error);
    });
}



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

function addMinutesToTime(timeStr, minutesToAdd) {
    // Parse the input time string
    let [hours, minutes] = timeStr.split(':').map(Number);
  
    // Create a Date object representing the time
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
  
    // Add the specified minutes
    date.setMinutes(date.getMinutes() + minutesToAdd);
  
    // Format the new time back into a string
    let newHours = date.getHours().toString().padStart(2, '0');
    let newMinutes = date.getMinutes().toString().padStart(2, '0');
    return `${newHours}:${newMinutes}`;
  }
  

function updateShabbatHours() {
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=32&c=on&M=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        const shabbatHour = data.items.find( record => record.title_orig === "Candle lighting").date.substring(11, 16);
        document.getElementById('shabbat-hour').textContent = `הדלקת נרות:${shabbatHour}`;
        const motzash = data.items.find( record => record.title_orig === "Havdalah").date.substring(11, 16);
        document.getElementById('motzash').textContent = `מוצ״ש:${motzash}`;
        document.getElementById('mincha_erev').textContent = `מנחה ער״ש:${addMinutesToTime(shabbatHour, 12)}`;
        console.log('This is a debug message');
        console.log('Shabbat hour:', shabbatHour);
    })
    .catch(error => {
        console.error('Error fetching the Shabbat hour:', error);
    });
}

function displayShabbatConfig() {
    document.getElementById('shacharit_shabat_minian_1').textContent = `שחרית מנין ראשון:${config.shacharit_shabat_minian_1}`;
    document.getElementById('shacharit_shabat').textContent = `שחרית:${config.shacharit_shabat}`;
}

function displayShiurim() {
    document.getElementById('shiur_daf_yomi').textContent = `דף יומי:${config.shiur_daf_yomi}`;
    document.getElementById('dvar_tora').textContent = `דבר תורה:${config.dvar_tora}`;
    document.getElementById('shiur_tfila').textContent = `שיעור אחרי תפילה:${config.shiur_tfila}`;
    document.getElementById('shiur_shabat').textContent = `שיעור שבת:${config.shiur_shabat}`;
}

function initApp () {
    readConfig();
    updateShabbatHours();
    displayShabbatConfig();
    displayShiurim();
}

initApp();