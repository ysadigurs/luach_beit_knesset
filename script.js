
const config = {
    "shacharit_shabat_1": "06:25",
    "shiur_daf_yomi": "07:00",
    "shacharit_shabat":"08:00",
    "mincha_gdola_shabat": "13:30",
    "dvar_tora":"הרב גדעון",
    "shiur_tfila": "הרב בוכריס",
    "shiur_shabat": "הרב אלי, קנאים",
    "shacharit_chol_1":"05:40",
    "shacharit_chol_2":"06:20",
    "shacharit_chol_3":"07:30", 
    "mincha_gdola_chol": "13:30",
    "mincha_ktana_chol": "19:30"
};

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

function displayZmanim() {
    fetch('https://www.hebcal.com/zmanim?cfg=json&geonameid=8199379')
    .then(response => response.json())
    .then(data => {
        document.getElementById('chatzotNight').textContent = `חצות הלילה:${data.times.chatzotNight.substr(11, 16)}`;
        document.getElementById('alotHaShachar').textContent = `עלות השחר:${data.times.alotHaShachar.substr(11, 16)}`;
        document.getElementById('misheyakir').textContent = `זמן ציצית:${data.times.misheyakir.substr(11, 16)}`;
        document.getElementById('sunrise').textContent = `נץ החמה:${data.times.sunrise.substr(11, 16)}`;
        document.getElementById('sofZmanShmaMGA').textContent = `סוף זמן מג״א:${data.times.sofZmanShmaMGA.substr(11, 16)}`;
        document.getElementById('sofZmanShma').textContent = `סוף זמן ק״ש גר״א:${data.times.sofZmanShma.substr(11, 16)}`;
        document.getElementById('sofZmanTfilla').textContent = `סוף זמן תפילה:${data.times.sofZmanTfilla.substr(11, 16)}`;
        document.getElementById('chatzot').textContent = `חצות היום:${data.times.chatzot.substr(11, 16)}`;
        document.getElementById('minchaGedola').textContent = `מנחה גדולה:${data.times.minchaGedola.substr(11, 16)}`;
        document.getElementById('minchaKetana').textContent = `מנחה קטנה:${data.times.minchaKetana.substr(11, 16)}`;
        document.getElementById('plagHaMincha').textContent = `פלג המנחה:${data.times.plagHaMincha.substr(11, 16)}`;
        document.getElementById('sunset').textContent = `שקיעת החמה:${data.times.sunset.substr(11, 16)}`;
        document.getElementById('tzeit7083deg').textContent = `צאת הכוכבים:${data.times.tzeit7083deg.substr(11, 16)}`;
        
    })
    .catch(error => {
        console.error('Error fetching the Zmanim:', error);
    });
}

function displayShabbatHours() {
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=32&c=on&M=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        const shabbatHour = data.items.find( record => record.title_orig === "Candle lighting").date.substring(11, 16);
        document.getElementById('shabbat-hour').textContent = `הדלקת נרות:${shabbatHour}`;
        const motzash = data.items.find( record => record.title_orig === "Havdalah").date.substring(11, 16);
        document.getElementById('motzash').textContent = `מוצ״ש:${motzash}`;
        document.getElementById('mincha_erev').textContent = `מנחה ער״ש:${addMinutesToTime(shabbatHour, 12)}`;
        document.getElementById('parasha').textContent = `פרשת השבוע:${data.items.find( record => record.category === "parashat").hebrew}`;

        console.log('This is a debug message');
        console.log('Shabbat hour:', shabbatHour);
    })
    .catch(error => {
        console.error('Error fetching the Shabbat hour:', error);
    });
}

function displayShabbatStatic() {
    document.getElementById('shacharit_shabat_1').textContent = `שחרית מנין ראשון:${config.shacharit_shabat_1}`;
    document.getElementById('shacharit_shabat').textContent = `שחרית:${config.shacharit_shabat}`;
}

function displayShiurim() {
    document.getElementById('shiur_daf_yomi').textContent = `דף יומי:${config.shiur_daf_yomi}`;
    document.getElementById('dvar_tora').textContent = `דבר תורה:${config.dvar_tora}`;
    document.getElementById('shiur_tfila').textContent = `שיעור אחרי תפילה:${config.shiur_tfila}`;
    document.getElementById('shiur_shabat').textContent = `שיעור שבת:${config.shiur_shabat}`;
}


function displayChol() {
    document.getElementById('shacharit_chol_1').textContent = `מנין ראשון:${config.shacharit_chol_1}`;
    document.getElementById('shacharit_chol_2').textContent = `מנין שני:${config.shacharit_chol_2}`;
    document.getElementById('shacharit_chol_3').textContent = `מנין שלישי:${config.shacharit_chol_3}`;
    document.getElementById('mincha_gdola_chol').textContent = `מנחה גדולה:${config.mincha_gdola_chol}`;
    document.getElementById('mincha_ktana_chol').textContent = `מנחה קטנה:${config.mincha_ktana_chol}`;
    document.getElementById('arvit_chol').textContent = `ערבית:${addMinutesToTime(config.mincha_ktana_chol, 40)}`;  
}

function displayOdahot() {
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=32&c=on&M=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        document.getElementById('odaha_1').textContent = `${data.items.find( record => record.category === "holiday").hebrew}`;
        document.getElementById('odaha_2').textContent = `תחילת הצום${data.items.find( record => record.title_orig === "Fast begins").date.substring(11, 16)}`;
        document.getElementById('odaha_3').textContent = `סוף הצום${data.items.find( record => record.title_orig === "Fast ends").date.substring(11, 16)}`;
    })
    .catch(error => {
        console.error('Error fetching the Odahot:', error);
    });
}


function initApp () {
    displayZmanim();
    displayShabbatHours();
    displayShabbatStatic();
    displayShiurim();
    displayChol();
    displayOdahot();
}

initApp();