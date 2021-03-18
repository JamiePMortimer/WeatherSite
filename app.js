// API Key List

const API = {
  key: '3c6b6453b9930344c0199f22529f0a0e',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const Open = {
  key: '69adfaa55e574e9bb954810d342d6fe7',
  base: 'https://api.opencagedata.com/geocode/v1/json?q=',
};

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

if (document.cookie.split('; ').length > 1) {
  getResults(
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('WON_place='))
      .split('=')[1]
  );
}
// GeoCoding Functions

function forwardGeo (location) {
  fetch(`${Open.base}${location}&key=${Open.key}&no_annotations=1`)
  .then((response) => {
return response.json()})
.then( response => {
  lat = response.results[0].geometry.lat;
  lon = response.results[0].geometry.lng;
})}

// 51.5073219, -0.1276474

function reverseGeo (lat, lon) {
  fetch(`${Open.base}${lat}+${lon}&key=${Open.key}&pretty=1&no_annotations=1`)
  .then((response) =>{
    return response.json()})
  .then( response => {
    console.log(response);
  })
}