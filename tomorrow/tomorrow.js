const hourlys = document.querySelectorAll('.hour');
const hourContainer = document.querySelector('.hourly-container')
hourlys.forEach((hour) => {
  hour.addEventListener('pointerenter', (event) => {
    hour.classList.add('poop');
    // thisfunction();
    console.log(event);
  });
});
hourlys.forEach((hour) => {
  hour.addEventListener('pointerleave', () => {
    hour.classList.remove('poop');
  });
});

function weatherQuery(e) {
  if (e.keyCode == 13) {
    forwardGeo(searchInput.value, coords => {
      getWeather('', coords.lat, coords.lon);
    });
    console.log(searchInput.value);
    searchInput.value = '';
  }
}
searchInput.addEventListener('keypress', weatherQuery);

function thisfunction() {

  hourlys.forEach((hour) => {
    hour.classList.add('hide');
  });
}
