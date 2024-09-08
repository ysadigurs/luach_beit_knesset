// Nof hayalon coordinates 31°52′07″N 34°59′20″E from Wikiepedia convert to approximately 31.8686°N latitude and 34.9889°E longitude.
// Same as Lod
// Attempts: 
// After removing keys

<!-- Row with the date, clock, daf yomi -->
<!-- <div class="row mt-4 gx-5"> -->
    <!-- date + temperature -->
    <!-- <div class="col-md-4 col-1"> -->
        <!-- <div class="card custom-card mr-lg-5"> -->
            <!-- <div class="card-body no-border" style="text-align: center;"> -->
                <!-- <span id="today"></span> -->
                <!-- CORS issue - disable temperature
                <span>,</span>                           
                <span id="temperature"></span>
                -->
            <!-- </div> -->
        <!-- </div> -->
    <!-- </div> -->
    <!-- clock -->
    <!-- <div class="col-md-4 col-12"> -->
        <!-- <div class="card custom-card mr-lg-5"> -->
            <!-- <div class=card-body style="text-align: center;"><span id="digital-clock"></span></div> -->
        <!-- </div> -->
    <!-- </div> -->
    <!-- daf yomi -->
    <!-- <div class="col-md-4 col-12 no-border"> -->
        <!-- <div class="card custom-card mr-lg-5 ml-lg-5"> -->
            <!-- <div class=card-body style="text-align: center;"><span id="daf_yomi"></span></div> -->
        <!-- </div> -->
    <!-- </div> -->
<!-- </div> -->


function displayWeather () {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=31.8686&lon=34.9889&units=metric&appid={APPID}")
    .then(response => {
        const result = response.json();
        document.getElementById('temperature').textContent = `${result.main.temp}` + " מעלות ";
     
        console.log('Request made with credentials: include');
    })
    .catch (error => {
        console.error("temperature error:", error);
    });
}