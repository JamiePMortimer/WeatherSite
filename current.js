// Input functions

function weatherQuery(e) {
  if (e.keyCode == 13) {
    getWeather('current', searchInput.value);
    searchInput.value = '';
  }
}

searchInput.addEventListener('keypress', weatherQuery);

marker.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition((success) => {
    reverseGeo(
      success.coords.latitude,
      success.coords.longitude,
      (location) => {
        document.cookie = `WON_Place=${location}`;
        getWeather('current', location);
      }
    );
  });
});
