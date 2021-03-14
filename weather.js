// API Key List

const APIs = {
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

let lat;
let lng;
let activeMenu = 'current';

// Input functions

function weatherQuery(e) {
  if (e.keyCode == 13) {
    getWeather(searchInput.value);
  }
}

searchInput.addEventListener('keypress', weatherQuery);

// marker.addEventListener('click', () => {
//   console.log('market event');
//   navigator.geolocation.getCurrentPosition(geoSuc,geoFail);
// });

// function geoFail(error){
//   console.log(error.message)
// }

// function geoSuc(pos) {
//   console.log(pos)
// }

marker.addEventListener('click', () => {
  console.log('It works');
  navigator.geolocation.getCurrentPosition(geoSuccess);
});

function geoSuccess(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
console.log(`lat:${lat} & lon${lon}`)
}
// API Calls

function getWeather(location, lat, lon) {
  if (activeMenu === 'current') {
    fetch(`${APIs.base}weather?q=${location}&units=metric&appid=${APIs.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResult);
  } else {
    fetch(
      `${APIs.base}onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${APIs.key}`
    )
      .then((weather) => {
        return weather.json();
      })
      .then(dothisthing);
  }
}

// Dom Amends

function dothisthing(weather) {
  console.log(weather);
  let weatherDeets = {
    locationCity: '',
    locationCountry: '',
    temp: Math.round(
      (Math.round(weather.daily[1].temp.min) +
        Math.round(weather.daily[1].temp.max)) /
        2
    ),
    weatherDesc: weather.daily[1].weather.main,
    tempMin: Math.round(weather.daily[1].temp.min),
    tempMax: Math.round(weather.daily[1].temp.max),
  };
  console.log(weatherDeets.temp);
}

//To Refactor



function geoSuccess(pos) {
  console.log('GeoSuccess - Start')
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  if (activeMenu === 'current') {
    fetch(`${Open.base}${lat}+${lon}&key=${Open.key}&pretty=1&no_annotations=1`)
      .then((location) => {
        return location.json();
      })
      .then(resLoc);
  } else {
    getWeather('', lat, lon);
  }
}

function resLoc(location) {
  const ctry = location.results[0].components.country_code.toUpperCase();
  if (!location.results[0].components.city) {
    getWeather(`${location.results[0].components.town}, ${ctry}`);
    document.cookie = `WON_place=${location.results[0].components.town}`;
    document.cookie = `WON_country=${ctry}`;
  } else {
    getWeather(`${location.results[0].components.city}, ${ctry}`);
    document.cookie = `WON_place=${location.results[0].components.city}`;
    document.cookie = `WON_country=${ctry}`;
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

// SPARE GEOCODE CODE SNIPPETS

// const API2 = {
//   key: '69adfaa55e574e9bb954810d342d6fe7',
//   base: 'https://api.opencagedata.com/geocode/v1/json?q=',
// };
// let lat;
// let lng;

// function findCoords(location) {
//   fetch(`${API2.base}${location}&key=${API2.key}&no_annotations=1`)
//     .then((location) => {
//       return location.json();
//     })
//     .then(displayResult);
// }

// function displayResult(location) {
//   lat = location.results[0].geometry.lat;
//   lng = location.results[0].geometry.lng;
// }

// END OF GEOCODE CODE SNIPPETS
