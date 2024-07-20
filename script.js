const API_KEY = "be97c59d086b45bc695da756bae3e968";
const weatherInfo = document.getElementById('weatherInfo');

document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput.trim() === '') {
        alert('Please enter a city name');
        return;
    }

    const units = 'metric';

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=${units}`;

    axios.get(URL)
        .then(response => {
            const data = response.data;
            displayWeatherInfo(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p class="text-red-600">Error fetching weather data. Please try again.</p>';
        });
});

function displayWeatherInfo(data) {
    const card = document.createElement('div');
    card.classList.add('bg-gray-800', 'text-white', 'p-6', 'rounded-md', 'shadow-md');

    // Sett bakgrunnsbilde basert på temperatur
    let backgroundImage = '';
    if (data.main.temp < 8) {
        backgroundImage = 'url("2.jpg")';
    } else if (data.main.temp > 20) {
        backgroundImage = 'url("1.jpg")';
    }

    card.style.backgroundImage = backgroundImage;

    card.innerHTML = `
        <h2 class="text-2xl font-semibold mb-2">Location: ${data.name}, ${data.sys.country}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <p class="text-lg">Temperature: ${data.main.temp}°C</p>
                <p class="text-lg">Weather: ${data.weather[0].description}</p>
            </div>
            <div>
                <p class="text-lg">Humidity: ${data.main.humidity}%</p>
                <p class="text-lg">Wind Speed: ${data.wind.speed} m/s</p>
                <p class="text-lg">Visibility: ${data.visibility / 1000} km</p>
            </div>
        </div>
    `;

    weatherInfo.innerHTML = '';
    weatherInfo.appendChild(card);
}
