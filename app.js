const apiKey = '1b7c3175ba86e1c5ee7ae3e0cbab40cc';
const units = 'metric'; 

const cityInput = document.getElementById('cityInput');
const fetchWeatherButton = document.getElementById('fetchWeatherButton');

const getWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.cod !== "200") {
            alert(`Error: ${data.message}`);
            return;
        }

        const timeLabels = data.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
        const temperatures = data.list.map(item => item.main.temp);

        createWeatherGraph(timeLabels, temperatures, city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

const createWeatherGraph = (labels, data, city) => {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line', 
        data: {
            labels: labels,
            datasets: [{
                label: `Temperature in ${city} (°C)`,
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
};

fetchWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim(); 
    if (city) {
        getWeatherData(city); 
    } else {
        alert('Please enter a city name.');
    }
});
