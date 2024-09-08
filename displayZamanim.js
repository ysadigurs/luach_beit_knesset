/* 
 * Replaced by Leibovitz times
 */
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
    
    console.log('displayZmanim() ends');        
 
}