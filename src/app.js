// When the page is loaded

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
  
  // When the user clicks on the form button
  let searchForm = document.querySelector(".search-form");
  
  function changeCity(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#current-city");
    let newCity = document.querySelector("#city-input");
    currentCity.innerHTML = newCity.value;
  }
  
  searchForm.addEventListener("submit", changeCity);
  
  // When click on C or F change the temperature to celsius or fahrenheit
  
  let temperature = document.querySelector("#current-temperature");
  let isCelsius = true;
  
  function toggleUnit(e) {
    e.preventDefault();
    if (isCelsius) {
      temperature.innerHTML = Math.round(temperature.innerHTML * 1.8 + 32);
    } else {
    temperature.innerHTML = Math.round((temperature.innerHTML - 32) * (5/9));
    }
    isCelsius = !isCelsius;
  
    let currentSelectedUnit = document.getElementById("currently-selected-unit");
    let secondaryUnit = document.getElementById("secondary-unit");
    var temp = currentSelectedUnit.innerHTML;
    currentSelectedUnit.innerHTML = secondaryUnit.innerHTML;
    secondaryUnit.innerHTML = temp;
  }
  
  let secondaryUnit = document.getElementById("secondary-unit");
  secondaryUnit.addEventListener('click', toggleUnit);