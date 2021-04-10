const hourlys = document.querySelectorAll('.hour');
const hourContainer = document.querySelector('.hourly-container')
hourlys.forEach((hour) => {
  hour.addEventListener('pointerenter', () => {
    hour.firstElementChild.lastElementChild.classList.remove('hide')
  });
});
hourlys.forEach((hour) => {
  hour.addEventListener('pointerleave', () => {
    hour.firstElementChild.lastElementChild.classList.add('hide')
  });
});

function weatherQuery(e) {
  if (e.keyCode == 13) {
    forwardGeo(searchInput.value, coords => {
      document.querySelector(
        '.output-location__city'
      ).textContent = coords.location;
      getWeather(weatherPage,'', coords.lat, coords.lon);
    });
    searchInput.value = '';
  }
}
searchInput.addEventListener('keypress', weatherQuery);

marker.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition((success) => {
    reverseGeo(success.coords.latitude, success.coords.longitude, location =>{
      document.cookie = `WON_Place=${location}`;
      document.querySelector(
        '.output-location__city'
      ).textContent = location;
      getWeather(weatherPage,'',success.coords.latitude, success.coords.longitude);
    }) ;
  });
});

// Output Render

function weatherResult(weather) {
  console.log(weatherPage)
  hourContainer.classList.remove('hide');
  for (let i = 0; i < 24; i++) {
    let rainVol = weather.hourly[i].rain ? (weather.hourly[i].rain['1h']).toFixed(1) : 0;
    let snowVol = weather.hourly[i].snow ? weather.hourly[i].snow['1h'] : 0;
    const weatherDiv = document.createElement('div');
    hourlys[i].innerText =
      new Date(weather.hourly[i].dt * 1000).getHours() + ':00';
    hourlys[i].append(weatherDiv);
    hourlys[i].firstElementChild.classList.add('tomDiv');
    hourlys[i].firstElementChild.innerHTML = `<img src="${URLIcon}${
      weather.hourly[i].weather[0].icon
    }.png"></img>
    <div class="hide">
    <p class="weather-desc">Weather: ${
      weather.hourly[i].weather[0].description
    }</p>
    <p>Temp: ${weather.hourly[i].temp.toFixed(0)}°C  </p>
    <p class="rain">Rain: ${rainVol}mm</p>
    <p class="snow">Snow: ${snowVol}mm</p>
    </div>
    `;
  }
}