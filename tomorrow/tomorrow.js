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
      getWeather('', coords.lat, coords.lon);
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
      getWeather('',success.coords.latitude, success.coords.longitude);
    }) ;
  });
});
