const jsonData = {
    dvarTora: dvarTora,
    shiurAfterTfilaFlag: shiurAfterTfilaFlag,
    shiurShabatTime: shiurShabatTime,
    shiurShabatTitle: shiurShabatTitle,
    chagim: chagimFlag,
    odaha1: odaha1,
    odaha2: odaha2
};

function storeConfig() {
    const dvarTora = document.getElementById("dvarTora").value;
    const shiurAfterTfilaFlag = document.getElementById("shiurAfterTfilaFlag").checked;
    const shiurShabatTime = document.getElementById("shiurShabatTime").value;
    const shiurShabatTitle = document.getElementById("shiurShabatTitle").value;
    const chagim = document.getElementById("chagim").value;
    const odaha1 = document.getElementById("odaha1").value;
    const odaha2 = document.getElementById("odaha2").value;

    // Write JSON data to a file
    fs.writeFile('config.json', JSON.stringify(jsonData), (err) => {
        if (err) {
            console.error('Error writing config file:', err);            
        }
        else {
            console.log('Successful writting config.json file');  
        }        
    });

}

document.addEventListener('DOMContentLoaded', (event) => {
    fetch("https://ysadigurs.github.io/luach_beit_knesset/config.json")
    .then(response => response.json())
    .then(data => {
        // Read json data
        document.getElementById('dvarTora').value = data["dvarTora"];
        document.getElementById('shiurAfterTfilaFlag').value = data["shiurAfterTfilaFlag"];
        document.getElementById('shiurShabatTime').value = data["shiurShabatTime"];
        document.getElementById('shiurShabatTitle').value = data["shiurShabatTitle"];
        document.getElementById('chagimFlag').value = data["chagimFlag"];
        document.getElementById('odaha1').value = data["odaha1"];
        document.getElementById('odaha2').value = data["odaha2"];        
    })
    .catch(error => {
        console.error('Error fetching the config file', error);
    });
});
