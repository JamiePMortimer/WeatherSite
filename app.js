
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
