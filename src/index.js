/* Not used in avanced exercises: When the page is loaded

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let cityToSearch = prompt("Enter a city").toLowerCase();
let cities = Object.keys(weather);

let message = `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityToSearch}`;

if (cities.includes(cityToSearch)) {
  let tempInCelsius = Math.round(weather[cityToSearch].temp);
  let tempInFahrenheit = Math.round(weather[cityToSearch].temp * 1.8 + 32);
  message = `It is currently ${tempInCelsius}°C(${tempInFahrenheit}ºF) in ${cityToSearch} with a humidity of ${weather[cityToSearch].humidity}%`;
}

alert(message);
*/

/* Not used in avanced exercises: When the user clicks on the form button
let searchForm = document.querySelector(".search-form");

function changeCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let newCity = document.querySelector("#city-input");
  currentCity.innerHTML = newCity.value;
}

searchForm.addEventListener("submit", changeCity);
*/

// Writting the time and location with JS

let currentTime = new Date();
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

let daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = daysOfTheWeek[currentTime.getDay()];
let date = currentTime.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];
let year = currentTime.getFullYear();

let currentHour = document.querySelector("#current-hour");
currentHour.innerHTML = `${hour}:${formattedMinutes}`;

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${day} ${date} ${month} ${year}`;

// When click on C or F change the temperature to celsius or fahrenheit

let temperature = document.querySelector("#current-temperature");
let isCelsius = true;

function toggleUnit(e) {
  e.preventDefault();
  if (isCelsius) {
    temperature.innerHTML = Math.round(temperature.innerHTML * 1.8 + 32);
  } else {
    temperature.innerHTML = Math.round((temperature.innerHTML - 32) * (5 / 9));
  }
  isCelsius = !isCelsius;

  let currentSelectedUnit = document.getElementById("currently-selected-unit");
  let secondaryUnit = document.getElementById("secondary-unit");
  var temp = currentSelectedUnit.innerHTML;
  currentSelectedUnit.innerHTML = secondaryUnit.innerHTML;
  secondaryUnit.innerHTML = temp;
}

let secondaryUnit = document.getElementById("secondary-unit");
secondaryUnit.addEventListener("click", toggleUnit);

// Search form: When the user search for a city, change the name and show the temperature.
// Current day and the next 5 days

let icon = {
  "01d": "sunny",
  "01n": "sunny",
  "02d": "partly_cloudy_day",
  "02n": "partly_cloudy_day",
  "03d": "cloud",
  "03n": "cloud",
  "04d": "filter_drama",
  "04n": "filter_drama",
  "09d": "rainy_heavy",
  "10d": "rainy_light",
  "11d": "thunderstorm",
  "13d": "ac_unit",
  "50d": "foggy",
};

function searchCity(event) {
  event.preventDefault();
  let citytoSearch = document.getElementById("city-input").value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citytoSearch}&units=${units}&appid=${apiKey}`;
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${citytoSearch}&units=${units}&appid=${apiKey}`;

  axios.get(url).then(handleWeatherResponse);
  axios.get(urlForecast).then(handleForeastResponse);
}

function handleWeatherResponse(response) {
  let citytoShow = document.getElementById("current-city");
  let temperaturetoShow = document.getElementById("current-temperature");
  let temperature = Math.round(response.data.main.temp);
  citytoShow.innerHTML = response.data.name;
  temperaturetoShow.innerHTML = `${temperature}`;

  let currentDayIcon = document.getElementById("icon-day-0");
  let iconClass = icon[response.data.weather[0].icon];
  currentDayIcon.innerText = iconClass;
}

function handleForeastResponse(response) {
  let day1 = document.getElementById("day-1");
  let day2 = document.getElementById("day-2");
  let day3 = document.getElementById("day-3");
  let day4 = document.getElementById("day-4");
  let day5 = document.getElementById("day-5");

  let iconDay1 = document.getElementById("icon-day-1");
  let correctIconDay1 = icon[response.data.list[7].weather[0].icon];
  iconDay1.innerText = correctIconDay1;
  let iconDay2 = document.getElementById("icon-day-2");
  let correctIconDay2 = icon[response.data.list[15].weather[0].icon];
  iconDay2.innerText = correctIconDay2;
  let iconDay3 = document.getElementById("icon-day-3");
  let correctIconDay3 = icon[response.data.list[23].weather[0].icon];
  iconDay3.innerText = correctIconDay3;
  let iconDay4 = document.getElementById("icon-day-4");
  let correctIconDay4 = icon[response.data.list[31].weather[0].icon];
  iconDay4.innerText = correctIconDay4;
  let iconDay5 = document.getElementById("icon-day-5");
  let correctIconDay5 = icon[response.data.list[39].weather[0].icon];
  iconDay5.innerText = correctIconDay5;

  let temperatureDay1 = document.getElementById("temperature-day-1");
  let maxtempDay1 = Math.round(response.data.list[7].main.temp_max);
  let mintempDay1 = Math.round(response.data.list[7].main.temp_min);
  temperatureDay1.innerHTML = `${maxtempDay1}ºC | ${mintempDay1}ºC`;
  let temperatureDay2 = document.getElementById("temperature-day-2");
  let temperatureDay3 = document.getElementById("temperature-day-3");
  let temperatureDay4 = document.getElementById("temperature-day-4");
  let temperatureDay5 = document.getElementById("temperature-day-5");


}

let searchForm = document.getElementById("form");
searchForm.addEventListener("submit", searchCity);


// My location button: Getting the weather from the current location
function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(url).then(handleWeatherResponse);
  });
}

let locationButton = document.getElementById("location-button");
locationButton.addEventListener("click", retrievePosition);
