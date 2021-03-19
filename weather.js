





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





// function geoSuccess(pos) {
//   const lat = pos.coords.latitude;
//   const lon = pos.coords.longitude;
//   console.log(`lat:${lat} & lon${lon}`);
// }
// API Calls

function getWeather(location, lat, lon) {
  if (activeMenu === 'current') {
    fetch(`${API.base}weather?q=${location}&units=metric&appid=${API.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResult);
  } else {}





    // fetch(`${Open.base}${location}&key=${Open.key}&no_annotations=1`)    
    // .then((location) => {
    //   return location.json();
    // }).then(location => fetch())


    // )

  //   fetch(
  //     `${APIs.base}onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${APIs.key}`
  //   )
  //     .then((weather) => {
  //       return weather.json();
  //     })
  //     .then(dothisthing);
  // }

  function latLon(location) {
    lat = location.results[0].geometry.lat;
    lon = location.results[0].geometry.lng;

  }
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
