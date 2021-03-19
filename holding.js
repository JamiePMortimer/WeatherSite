// API Key List

const API = {
  key: '3c6b6453b9930344c0199f22529f0a0e',
  base: 'https://api.openweathermap.org/data/2.5/',
};

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

// if (document.cookie.split('; ').length > 1) {
//   getResults(
//     document.cookie
//       .split('; ')
//       .find((row) => row.startsWith('WON_place='))
//       .split('=')[1]
//   );
// }

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

function forwardGeo(location) {
  fetch(`${Open.base}${location}&key=${Open.key}&no_annotations=1`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      lat = response.results[0].geometry.lat;
      lon = response.results[0].geometry.lng;
    });
}

function reverseGeo(lat, lon) {
  fetch(`${Open.base}${lat}+${lon}&key=${Open.key}&pretty=1&no_annotations=1`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (!response.results[0].components.city) {
        let geoCountry = response.results[0].components.country_code.toUpperCase();
        let geoPlace = response.results[0].components.town;
        console.log(`Twon: ${geoPlace}`)
        return `${geoPlace}, ${geoCountry}`;
      } else {
        let geoCountry = response.results[0].components.country_code.toUpperCase();
        let geoPlace = response.results[0].components.city;
        console.log(`City: ${geoPlace}`)
        return `${geoPlace}, ${geoCountry}`;
      }
    });
}
