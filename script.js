let currentUser = null;
let bookingData = {
    bus: [],
    hotel: [],
    flight: []
};

// DOM Elements
const sections = {
    login: document.getElementById('loginSection'),
    mainMenu: document.getElementById('mainMenuSection'),
    busBooking: document.getElementById('busBookingSection'),
    hotelBooking: document.getElementById('hotelBookingSection'),
    flightBooking: document.getElementById('flightBookingSection'),
    payment: document.getElementById('paymentSection'),
    weather: document.getElementById('weatherSection')
};

// Event Listeners
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('busBookingForm').addEventListener('submit', handleBusBooking);
document.getElementById('hotelBookingForm').addEventListener('submit', handleHotelBooking);
document.getElementById('flightBookingForm').addEventListener('submit', handleFlightBooking);
document.getElementById('paymentForm').addEventListener('submit', handlePayment);
document.getElementById('weatherForm').addEventListener('submit', handleWeatherCheck);

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (in real app, this would connect to a backend)
    if (username && password) {
        currentUser = username;
        showSection('mainMenu');
    } else {
        alert('Please enter both username and password');
    }
}

// Section Navigation
function showSection(sectionName) {
    Object.values(sections).forEach(section => section.classList.add('hidden'));
    sections[sectionName].classList.remove('hidden');
}

function showBookingSection(type) {
    showSection(`${type}Booking`);
}

function showWeatherSection() {
    showSection('weather');
}

function logout() {
    currentUser = null;
    showSection('login');
}

// Booking Handlers
function handleBusBooking(e) {
    e.preventDefault();
    const from = document.getElementById('busFrom').value;
    const to = document.getElementById('busTo').value;
    const date = document.getElementById('busDate').value;
    const seats = parseInt(document.getElementById('busSeats').value);

    if (seats > 10) {
        alert('Maximum 10 seats allowed per booking');
        return;
    }

    // Check for overlapping bookings
    const hasOverlap = bookingData.bus.some(booking => 
        booking.date === date && booking.from === from && booking.to === to
    );

    if (hasOverlap) {
        alert('This route is already booked for the selected date');
        return;
    }

    // Calculate price (example: $20 per seat)
    const totalAmount = seats * 20;
    
    // Store booking data
    bookingData.bus.push({ from, to, date, seats, totalAmount });
    
    // Show payment section
    document.getElementById('amount').value = `$${totalAmount}`;
    showSection('payment');
}

function handleHotelBooking(e) {
    e.preventDefault();
    const location = document.getElementById('hotelLocation').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const rooms = parseInt(document.getElementById('hotelRooms').value);

    if (rooms > 10) {
        alert('Maximum 10 rooms allowed per booking');
        return;
    }

    // Check for overlapping bookings
    const hasOverlap = bookingData.hotel.some(booking => 
        booking.location === location && 
        ((checkIn >= booking.checkIn && checkIn < booking.checkOut) ||
         (checkOut > booking.checkIn && checkOut <= booking.checkOut))
    );

    if (hasOverlap) {
        alert('This hotel is already booked for the selected dates');
        return;
    }

    // Calculate price (example: $100 per room per night)
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalAmount = rooms * nights * 100;
    
    // Store booking data
    bookingData.hotel.push({ location, checkIn, checkOut, rooms, totalAmount });
    
    // Show payment section
    document.getElementById('amount').value = `$${totalAmount}`;
    showSection('payment');
}

function handleFlightBooking(e) {
    e.preventDefault();
    const from = document.getElementById('flightFrom').value;
    const to = document.getElementById('flightTo').value;
    const date = document.getElementById('flightDate').value;
    const seats = parseInt(document.getElementById('flightSeats').value);

    if (seats > 10) {
        alert('Maximum 10 seats allowed per booking');
        return;
    }

    // Check for overlapping bookings
    const hasOverlap = bookingData.flight.some(booking => 
        booking.date === date && booking.from === from && booking.to === to
    );

    if (hasOverlap) {
        alert('This flight is already booked for the selected date');
        return;
    }

    // Calculate price (example: $100 per seat)
    const totalAmount = seats * 100;
    
    // Store booking data
    bookingData.flight.push({ from, to, date, seats, totalAmount });
    
    // Show payment section
    document.getElementById('amount').value = `$${totalAmount}`;
    showSection('payment');
}

// Payment Handler
function handlePayment(e) {
    e.preventDefault();
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Simple validation (in real app, this would connect to a payment gateway)
    if (cardNumber.length === 16 && expiryDate.match(/^\d{2}\/\d{2}$/) && cvv.length === 3) {
        alert('Payment successful!');
        showSection('mainMenu');
    } else {
        alert('Invalid payment details');
    }
}

// Weather Handler
async function handleWeatherCheck(e) {
    e.preventDefault();
    const location = document.getElementById('weatherLocation').value;
    const weatherResult = document.getElementById('weatherResult');

    try {
        // Using OpenWeatherMap API (you'll need to replace with your API key)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            weatherResult.innerHTML = `
                <h3>Weather in ${data.name}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            weatherResult.innerHTML = '<p class="error">Location not found</p>';
        }
    } catch (error) {
        weatherResult.innerHTML = '<p class="error">Error fetching weather data</p>';
    }
}
