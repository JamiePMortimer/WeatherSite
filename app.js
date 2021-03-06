const API = {
  key: '3c6b6453b9930344c0199f22529f0a0e',
  base: 'https://api.openweathermap.org/data/2.5/',
};
const city = document.querySelector('.output-location__city');
const searchInput = document.querySelector('.input__search-box');
searchInput.addEventListener('keypress', weatherQuery);

function weatherQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchInput.value);
  }
}

// Current Weather API Request

function getResults(query) {
  fetch(`${API.base}weather?q=${query}&units=metric&appid=${API.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  document.querySelector(
    '.output-location__city'
  ).textContent = `${weather.name}, ${weather.sys.country}`;
  const tempNow = Math.round(weather.main.temp);
  const tempmaxNow = Math.round(+weather.main.temp_max);
  const tempminNow = Math.round(+weather.main.temp_min);
  document.querySelector('.temp').innerHTML = `${tempNow}<span>°C</span>`;
  document.querySelector(
    '.hi-lo'
  ).textContent = `${tempminNow}°C / ${tempmaxNow}°C`;
  document.querySelector('.weather').textContent = `${weather.weather[0].main}`;
}

// Current Location Weather

const marker = document.querySelector('.here i');
marker.addEventListener('click', () => {
  console.log('It works');
  navigator.geolocation.getCurrentPosition(geoSuccess);
});

function geoSuccess(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  fetch(
    `${API.base}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API.key}`
  )
    .then((weather) => {
      console.log( weather.json());
    })
    // .then(console.log(we));
}

// Date Functions

let dateNow = function () {
  let now = new Date();
  let date = document.querySelector('.output-location__date');
  date.innerText = datebuilder(now);
};

function datebuilder(d) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'thurs', 'Fri', 'Sat'];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month}, ${year} `;
}

dateNow();

// Burger Animation

const burger = document.querySelector('.navigation-burger');
const menu = document.querySelector('.side-menu');
const menuLinks = document.querySelectorAll('.menu-links li');
burger.addEventListener('click', () => {
  burger.classList.toggle('toggle');
  menu.classList.toggle('side-menu-active');
  menuLinks.forEach((e) => {
    e.classList.toggle('hide');
  });
});

/* 
Click the button
Requests current location - Lat Lng
Convert Lat Lng to location
Input location into Weather request
Pull back weather output

*/
