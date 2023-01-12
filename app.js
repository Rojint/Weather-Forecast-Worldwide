let now = new Date();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let monthNames = months[now.getMonth()];
let monthNumbers = now.getMonth();

let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayNames[now.getDay()];

let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();
let dayNumber = now.getDate();
let time = now.toString().substr(16, 5);

let currentDate = `${day}, ${monthNames} ${dayNumber} </br> ${time}`;

let dateBox = document.querySelector("#date");
dateBox.innerHTML = currentDate;

// let imgContainer = document.getElementById("#img-container");

// if (Number(hour) >= 17) {
//   imgContainer.style.backgroundImage = "url('img/skynight2blur.jpg')";
// }

// _____API_____

let apiKey = "0f0a1fdebac7341b2c3o08605ff7bt89";
let searchInput = document.querySelector("#search-box");
let cityElement = document.querySelector("#city-name");
let tempElement = document.querySelector("#temp");
let weatherDescription = document.querySelector("#description");
let iconElement = document.querySelector("#icon");
let windElement = document.querySelector("#wind");
let feelLikeElement = document.querySelector("#feels-like");
let humidityElement = document.querySelector("#humidity");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" id="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-md-2">
        <p class="mb-0 mt-4">${formatDay(forecastDay.time)}</p>
        <img class="weather-icon"
        
         src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
           forecastDay.condition.icon
         }.png"
          alt=""
        />
        <p class="max-min" data-bs-toggle="tooltip" data-bs-title="Maximum Temperature"> 
        ${Math.round(forecastDay.temperature.maximum)}° 
         </p>
        <p class="max-min min" data-bs-toggle="tooltip" data-bs-title="Minimum Temperature"> ${Math.round(
          forecastDay.temperature.minimum
        )}° </p>
        </div>
      
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  tempElement.innerHTML = `${Math.round(response.data.temperature.current)}°C`;
  weatherDescription.innerHTML = response.data.condition.description;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  windElement.innerHTML = `${response.data.wind.speed}Km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  feelLikeElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°`;
  getForecast(response.data.coordinates);
}

function search(event) {
  event.preventDefault();
  if (searchInput.value) {
    let city = searchInput.value;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => showTemp(response));
    cityElement.innerHTML = city.toUpperCase();
  }
}

let searchBox = document.querySelector("#search-form");
searchBox.addEventListener("submit", search);

window.onload = function (e) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Mahabad&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => showTemp(response));
  cityElement.innerHTML = "Mahabad";
};
