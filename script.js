function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate angles for clock hands
    const hourAngle = (hours % 12) * 30 + minutes / 2;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    // Rotate hands to the correct angles
    document.getElementById('hour-hand').style.transform = `rotate(${hourAngle}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minuteAngle}deg)`;
    document.getElementById('second-hand').style.transform = `rotate(${secondAngle}deg)`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to set clock immediately
updateClock();
