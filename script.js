const config = {
    "shacharit_shabat_1": "06:25",
    "shacharit_shabat":"08:00",
    "mincha_gdola_shabat": "13:30",
    "shacharit_chol_1":"05:40",
    "shacharit_chol_2":"06:20",
    "shacharit_chol_3":"07:30", 
    "mincha_gdola_chol": "13:30"   
};

function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}


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
/* 
 * Replaced by Leibovitz times
 *
function displayZmanim() {
    fetch('https://www.hebcal.com/zmanim?cfg=json&geonameid=8199379')
    .then(response => response.json())
    .then(data => {
        document.getElementById('chatzotNight').textContent = `${data.times.chatzotNight.substr(11, 5)}`;
        document.getElementById('alotHaShachar').textContent = `${data.times.alotHaShachar.substr(11, 5)}`;
        document.getElementById('misheyakir').textContent = `${data.times.misheyakir.substr(11, 5)}`;
        document.getElementById('sunrise').textContent = `${data.times.sunrise.substr(11, 5)}`;
        document.getElementById('sofZmanShmaMGA').textContent = `${data.times.sofZmanShmaMGA.substr(11, 5)}`;
        document.getElementById('sofZmanShma').textContent = `${data.times.sofZmanShma.substr(11, 5)}`;
        document.getElementById('sofZmanTfilla').textContent = `${data.times.sofZmanTfilla.substr(11, 5)}`;
        document.getElementById('chatzot').textContent = `${data.times.chatzot.substr(11, 5)}`;
        document.getElementById('minchaGedola').textContent = `${data.times.minchaGedola.substr(11, 5)}`;
        document.getElementById('minchaKetana').textContent = `${data.times.minchaKetana.substr(11, 5)}`;
        document.getElementById('plagHaMincha').textContent = `${data.times.plagHaMincha.substr(11, 5)}`;
        document.getElementById('sunset').textContent = `${data.times.sunset.substr(11, 5)}`;
        document.getElementById('tzeit7083deg').textContent = `${data.times.tzeit7083deg.substr(11, 5)}`;
        
    })
    .catch(error => {
        console.error('Error fetching the Zmanim:', error);
    });
}
*/

function parseDateDDMMYYYY(dateStr) {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
}

function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with leading zero
    const year = date.getFullYear(); // Get year

    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
}

function getCurrentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentDayName = daysOfWeek[currentDayIndex];
    return currentDayName;
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

let parasha_date = null;

// Get Parasha date from Hebcal
// Retrieve Parasha record from Leibovitz
function displayLeibovitzZmanim() { 
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=28&c=on&M=on&F=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        // Hebcal parasha loazi date and daily daf yomi       
        parasha_date = formatDateToDDMMYYYY(new Date(data.items.find( record => record.category === "parashat").date));
        const today = getTodayDate();
        document.getElementById('daf_yomi').textContent = `${data.items.find( record => (record.category === "dafyomi" && record.date === today)).hebrew}`;
  
        // weekly leibovitz times
        fetch("https://ysadigurs.github.io/luach_beit_knesset/weekly.json")
        .then(response => response.json())
        .then(data => {
            // Get week record
            const item =  data.find( record => (record["date"] === parasha_date));
            
            // Shabat times
            document.getElementById('parasha').textContent = `${item["parasha"]}`;            
            document.getElementById('shabbat-hour').textContent = `${item["adlaka"].substr(0, 5)}`;
            // mincha erev shabat is 13 minutes after adlaka
            document.getElementById('mincha_erev').textContent = addMinutesToTime(`${item["adlaka"].substr(0, 5)}`, 13);
            document.getElementById('mincha_ktana_shabat').textContent = `${item["minchashabat"].substr(0, 5)}`; 
            document.getElementById('motzash').textContent = `${item["motzash"].substr(0, 5)}`;
            
            // Zmanim (weekly)
            document.getElementById('chatzotNight').textContent = `${item["hazot"].substr(0, 5)}`;  
            document.getElementById('alotHaShachar').textContent = `${item["alot"].substr(0, 5)}`;
            document.getElementById('misheyakir').textContent = `${item["tzitzit"].substr(0, 5)}`;
            document.getElementById('sunrise').textContent = `${item["netz"].substr(0, 5)}`;
            document.getElementById('sofZmanShmaMGA').textContent = `${item["kshmamagen"].substr(0, 5)}`;
            document.getElementById('sofZmanShma').textContent = `${item["kshmaagra"].substr(0, 5)}`;
            document.getElementById('sofZmanTfilla').textContent = `${item["tfilaagra"].substr(0, 5)}`;
            document.getElementById('chatzot').textContent = `${item["hazot"].substr(0, 5)}`;                      
            document.getElementById('minchaGedola').textContent = `${item["minchagdola"].substr(0, 5)}`;
            //document.getElementById('plagHaMincha').textContent = `${item["minchahol"]}`; -- missing plag mincha
            document.getElementById('sunset').textContent = `${item["shkia"].substr(0, 5)}`;
            document.getElementById('tzeit').textContent = `${item["tzeet"].substr(0, 5)}`;
            
            // Tfila Hol
            // Change to next week on Fridays.
            const currentDay = getCurrentDay();
            if (currentDay === "Friday" || currentDay === "Saturday") {

                const nextItem =  data.find( record => (record["date"] === addDays(parasha_date, 7).toLocaleDateString()));
                document.getElementById('mincha_ktana_chol').textContent = `${nextItem["minchahol"].substr(0, 5)}`; 
                document.getElementById('arvit_chol').textContent = `${nextItem["arvithol"].substr(0, 5)}`; 

            }
            else {
                document.getElementById('mincha_ktana_chol').textContent = `${item["minchahol"].substr(0, 5)}`; 
                document.getElementById('arvit_chol').textContent = `${item["arvithol"].substr(0, 5)}`; 
            }

        })
        .catch(error => {
            console.error('Error fetching the leibovitz file', error);
        });

        console.log('displayShabbatHours() ends');        
    })
    .catch(error => {
        console.error('Error fetching the Leiboviz hour:', error);
    });
}

function displayShabbatStatic() {
    document.getElementById('shacharit_shabat_1').textContent = `${config.shacharit_shabat_1}`;
    document.getElementById('shacharit_shabat').textContent = `${config.shacharit_shabat}`;
    document.getElementById('mincha_gdola_shabat').textContent = `${config.mincha_gdola_shabat}`;
}

function displayConfig() {
    fetch("https://ysadigurs.github.io/luach_beit_knesset/config.json")
    .then(response => response.json())
    .then(data => {
        // Read json data
        document.getElementById('dvar_tora').textContent = `${data["dvarTora"]}`;
        document.getElementById('shiur_tfila_time').textContent = `${data["shiurAfterTfilaTime"]}`;
        document.getElementById('shiur_tfila').textContent = `${data["shiurAfterTfila"]}`;        
        document.getElementById('shiur_shabat_time').textContent = `${data["shiurShabatTime"]}`;
        document.getElementById('shiur_shabat').textContent = `${data["shiurShabatTitle"]}`;
        document.getElementById('shiur_daf_yomi').textContent = `${data["shiurDafYomiTime"]}`;
        document.getElementById('odaha_1').textContent = `${data["odaha1"]}`;
        document.getElementById('odaha_2').textContent = `${data["odaha2"]}`;
    })
    .catch(error => {
        console.error('Error fetching config.json', error);
    });   
    
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function displayChol() {
    const today = getTodayDate();
    fetch(`https://www.hebcal.com/converter?cfg=json&g2h=1&strict=1&date=${today}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('today').textContent = `${data.hebrew}`;
    })
    .catch(error => {
        console.error('Error fetching today:', error);
    });
    document.getElementById('shacharit_chol_1').textContent = `${config.shacharit_chol_1}`;
    document.getElementById('shacharit_chol_2').textContent = `${config.shacharit_chol_2}`;
    document.getElementById('shacharit_chol_3').textContent = `${config.shacharit_chol_3}`;    
    document.getElementById('mincha_gdola_chol').textContent = `${config.mincha_gdola_chol}`;    
     
}


function displayChagim() {    
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=32&c=on&M=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        document.getElementById('chagim_1').textContent = `${data.items.find( record => record.category === "holiday").hebrew}`;
    })
    .catch(error => {
        console.error('Error fetching the chagim 1', error);
    });
}


const scrollableColumn = document.getElementById('scrollable-column');
let scrollTop = 0;

function autoScroll() {
    const maxScrollTop = scrollableColumn.scrollHeight - scrollableColumn.clientHeight;

    scrollTop += 1; // Scroll down by 1px per interval

    if (scrollTop > maxScrollTop) {
            scrollTop = 0; // Reset scroll position to top
    }
    scrollableColumn.scrollTo(0, scrollTop);

}

// Nof hayalon coordinates 31°52′07″N 34°59′20″E from Wikiepedia convert to approximately 31.8686°N latitude and 34.9889°E longitude.
// Same as Lod
// Attempts: 
// 1. https://api.weatherapi.com/v1/current.json?key=***REMOVED***&q=31.8686,34.9889&aqi=no - CORS error
// 2. with proxy: http://localhost:3000/api/v1/current.json?key=***REMOVED***&q=31.8686,34.9889&aqi=no - Connection refused
// 3. https://api.open-meteo.com/v1/forecast?latitude=31.8686&longitude=34.9889&current_weather=true


function displayWeather () {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=31.8686&longitude=34.9889&current_weather=true" , {
        method: 'GET', // Use the appropriate HTTP method
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json' // Optional: Only necessary if you're sending a request body
          // Add other headers as needed
        }
    })   
    .then(response => {
        const result = response.json();
        document.getElementById('temperature').textContent = `${result.current_weather.temperature}` + " מעלות ";
     
        console.log('Request made with no-cors mode');
    })
    .catch (error => {
        console.error("temperature error:", error);
    });
}

function initApp () {
    // Reload the page every 60 seconds (60000 milliseconds)
    setInterval(() => {location.reload();}, 5*60000);
    setInterval(updateClock, 1000);
    updateClock();
    displayLeibovitzZmanim(); 
    // displayZmanim();   - Replaced by Leibovitz
    displayShabbatStatic();
    displayConfig();
    displayChol();
    displayChagim();
    displayWeather();
    //setInterval(() => {autoScroll();}, 50);

}

initApp();
