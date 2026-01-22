const temperature = 45;
const windSpeed = 10;

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

//this part was AI, thanks AI
const calculateWindChill = (t, v) => (35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16)).toFixed(1);


const windChillDisplay = document.querySelector("#windchill");

if (temperature <= 50 && windSpeed > 3) {
    const wc = calculateWindChill(temperature, windSpeed);
    windChillDisplay.textContent = `${wc} °F`;
} else {
    windChillDisplay.textContent = "N/A";
}