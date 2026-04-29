const locationSelect = document.querySelector('#location');
const getDataBtn = document.querySelector('#get-data');
const errorDiv = document.querySelector('#error-message');

getDataBtn.addEventListener('click', () => {
    errorDiv.textContent = '';

    const coords = locationSelect.value.split(',');
    const lat = coords[0];
    const lng = coords[1];

    fetchSunData(lat, lng, 'today');
    fetchSunData(lat, lng, 'tomorrow');
});

function fetchSunData(lat, lng, day) {
    const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${day}`;

    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            updateUI(data.results, day);
        })
        .catch(error => {
            errorDiv.textContent = "Error: Could not retrieve data."; 
            console.error(error);
        });
}

function updateUI(results, day) {
    const prefix = (day === 'today') ? 'today' : 'tmrw';

    document.getElementById(`${prefix}-date`).textContent = results.date;
    document.getElementById(`${prefix}-sunrise`).textContent = results.sunrise;
    document.getElementById(`${prefix}-sunset`).textContent = results.sunset;
    document.getElementById(`${prefix}-dawn`).textContent = results.dawn;
    document.getElementById(`${prefix}-dusk`).textContent = results.dusk;
    document.getElementById(`${prefix}-solar-noon`).textContent = results.solar_noon;
    document.getElementById(`${prefix}-day-length`).textContent = results.day_length;
    document.getElementById(`${prefix}-time-zone`).textContent = results.timezone;
}