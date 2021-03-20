

///////////////////////////////////

// Current Location Weather








// function resLoc(location) {
//   const ctry = location.results[0].components.country_code.toUpperCase();
//   if (!location.results[0].components.city) {
//     getWeather(`${location.results[0].components.town}, ${ctry}`);
//     document.cookie = `WON_place=${location.results[0].components.town}`;
//     document.cookie = `WON_country=${ctry}`;
//   } else {
//     getWeather(`${location.results[0].components.city}, ${ctry}`);
//     document.cookie = `WON_place=${location.results[0].components.city}`;
//     document.cookie = `WON_country=${ctry}`;
//   }
// }





function latLon(location) {
  lat = location.results[0].geometry.lat;
  lon = location.results[0].geometry.lng;
}


// Dom Amends

function dothisthing(weather) {
let weatherDeets = {
  locationCity: '',
  locationCountry: '',
  temp: Math.round(
    (Math.round(weather.daily[1].temp.min) +
      Math.round(weather.daily[1].temp.max)) /
      2
  ),
  weatherDesc: weather.daily[1].weather[0].main,
  tempMin: Math.round(weather.daily[1].temp.min),
  tempMax: Math.round(weather.daily[1].temp.max),
  weatherDate: datebuilder(new Date(weather.daily[1].dt * 1000)),
};
document.querySelector('.output-location__city');
// .textContent = `${weather.name}, ${weather.sys.country}`;
const tempNow = weatherDeets.temp;
const tempmaxNow = weatherDeets.tempMax;
const tempminNow = weatherDeets.tempMin;
document.querySelector('.temp').innerHTML = `${tempNow}<span>°C</span>`;
document.querySelector(
  '.hi-lo'
).textContent = `${tempminNow}°C / ${tempmaxNow}°C`;
document.querySelector(
  '.weather'
).textContent = `${weatherDeets.weatherDesc}`;
document.querySelector('.output-location__date').innerText =
  weatherDeets.weatherDate;
}

//To Refactor

// function resLoc(location) {
//   const ctry = location.results[0].components.country_code.toUpperCase();
//   if (!location.results[0].components.city) {
//     getWeather(`${location.results[0].components.town}, ${ctry}`);
//     document.cookie = `WON_place=${location.results[0].components.town}`;
//     document.cookie = `WON_country=${ctry}`;
//   } else {
//     getWeather(`${location.results[0].components.city}, ${ctry}`);
//     document.cookie = `WON_place=${location.results[0].components.city}`;
//     document.cookie = `WON_country=${ctry}`;
//   }
// }




