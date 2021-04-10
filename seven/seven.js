const day = document.querySelectorAll('.day');
const dayContainer = document.querySelector('.day-container');

day.forEach((d) => {
  d.addEventListener('pointerenter', () => {
    d.firstElementChild.lastElementChild.classList.remove('hide')
  });
});
day.forEach((d) => {
  d.addEventListener('pointerleave', () => {
    d.firstElementChild.lastElementChild.classList.add('hide')
  });
});


function weatherQuery(e) {
  if (e.keyCode == 13) {
    forwardGeo(searchInput.value, (coords) => {
      document.querySelector('.output-location__city').textContent =
        coords.location;
      getWeather(weatherPage, '', coords.lat, coords.lon);
    });
    searchInput.value = '';
  }
}
searchInput.addEventListener('keypress', weatherQuery);

// Weather Outputs

function weatherResult(weather) {
  console.log(weather)
  dayContainer.classList.remove('hide');
  for (let i = 0; i < 7; i++) {
    let rainVol = weather.daily[i].rain
      ? weather.daily[i].rain.toFixed(1)
      : 0;
    let snowVol = weather.daily[i].snow ? weather.daily[i].snow : 0;
    const weatherDiv = document.createElement('div');
    day[i].innerText = days[new Date(weather.daily[i].dt * 1000).getDay()];
    day[i].append(weatherDiv);
    day[i].firstElementChild.classList.add('tomDiv');
    day[i].firstElementChild.innerHTML = `<img src="${URLIcon}${
      weather.daily[i].weather[0].icon
    }.png"></img>
    <div class="hide">
    <p class="weather-desc">Weather: ${
      weather.daily[i].weather[0].description
    }</p>
    
    <p>Min Temp: ${weather.daily[i].temp.min.toFixed(0)}°C  </p>
    <p>Max Temp: ${weather.daily[i].temp.max.toFixed(0)}°C  </p>
    <p class="rain">Rain: ${rainVol}mm</p>
    <p class="snow">Snow: ${snowVol}mm</p>
    </div>
    `;
  }
}



// marker.addEventListener('click', () => {
//   navigator.geolocation.getCurrentPosition((success) => {
//     reverseGeo(success.coords.latitude, success.coords.longitude, location =>{
//       document.cookie = `WON_Place=${location}`;
//       document.querySelector(
//         '.output-location__city'
//       ).textContent = location;
//       getWeather('',success.coords.latitude, success.coords.longitude);
//     }) ;
//   });
// });
