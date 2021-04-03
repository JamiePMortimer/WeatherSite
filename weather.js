// API Key List

const API = {
  key: '3c6b6453b9930344c0199f22529f0a0e',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const URLIcon = 'http://openweathermap.org/img/wn/'

const Open = {
  key: '69adfaa55e574e9bb954810d342d6fe7',
  base: 'https://api.opencagedata.com/geocode/v1/json?q=',
};

// Variables List

const city = document.querySelector('.output-location__city');
const searchInput = document.querySelector('.input__search-box');
const marker = document.querySelector('.here i');

let lat = '';
let lng = '';
let activeMenu = 'current';

// Weather Objects

const weatherType = {
  all: 'current,minutely,hourly,daily,alerts',
  tomorrow: 'current,minutely,daily,alerts',
  week: 'current,minutely,hourly,alerts',
};

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

//Cookie Check

if (document.cookie.split('WON_Place=').length > 1) {
  getWeather(
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('WON_Place='))
      .split('=')[1]
  );
}

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

// GeoCoding Functions

function forwardGeo(location, callback) {
  fetch(`${Open.base}${location}&key=${Open.key}&no_annotations=1`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      lat = response.results[0].geometry.lat;
      lon = response.results[0].geometry.lng;
      callback({ lat: lat, lon: lon });
    });
}

function reverseGeo(lat, lon, callback) {
  fetch(`${Open.base}${lat}+${lon}&key=${Open.key}&pretty=1&no_annotations=1`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (!response.results[0].components.city) {
        let geoCountry = response.results[0].components.country_code.toUpperCase();
        let geoPlace = response.results[0].components.town;
        callback(`${geoPlace}, ${geoCountry}`);
      } else {
        let geoCountry = response.results[0].components.country_code.toUpperCase();
        let geoPlace = response.results[0].components.city;
        callback(`${geoPlace}, ${geoCountry}`);
      }
    });
}

// Weather Functions

function getWeather(location, lat, lon) {
  if (!lat || !lon) {
    fetch(`${API.base}weather?q=${location}&units=metric&appid=${API.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResult);
  } else {
    fetch(
      `${API.base}/onecall?lat=${lat}&lon=${lon}&exclude=${weatherType.tomorrow}&units=metric&appid=${API.key}`
    )
      .then((weather) => {
        return weather.json();
      })
      .then(hourResult);
  }
}

// Outputs

function displayResult(weather) {
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

function hourResult(weather) {
  console.log(weather)
  hourContainer.classList.remove('hide');
  for (let i = 0; i < 24; i++) {
    const weatherDiv = document.createElement('div');
    hourlys[i].innerText = (new Date(weather.hourly[i].dt * 1000)).getHours() +':00';
    hourlys[i].append(weatherDiv);
    hourlys[i].firstElementChild.classList.add('tomDiv');
    hourlys[i].firstElementChild.innerHTML = `<img src="${URLIcon}${weather.hourly[i].weather[0].icon}.png"></img>`;
  }
}
