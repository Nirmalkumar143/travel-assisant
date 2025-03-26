// Hostel Booking Logic
function hostelBooking() {
    alert("Redirecting to Hostel Booking Page...");
}

// Bus Booking Logic
function busBooking() {
    alert("Redirecting to Bus Booking Page...");
}

// Flight Booking Logic
function flightBooking() {
    alert("Redirecting to Flight Booking Page...");
}

// Weather Check using OpenWeatherMap API
function checkWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "YOUR_API_KEY"; // Replace with your API key

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const weather = `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
                document.getElementById("weather-result").innerText = weather;
            })
            .catch(error => {
                document.getElementById("weather-result").innerText = "Error fetching weather data.";
            });
    } else {
        alert("Please enter a city name.");
    }
}

// Get User's Location
function findLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById("location-result").innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
        });
    } else {
        document.getElementById("location-result").innerText = "Geolocation is not supported by your browser.";
    }
}

