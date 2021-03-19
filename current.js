// Input functions

function weatherQuery(e) {
  if (e.keyCode == 13) {
    getWeather(searchInput.value);
  }
}

searchInput.addEventListener('keypress', weatherQuery);

marker.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(success =>{
    console.log(success)
    reverseGeo(success.coords.latitude, success.coords.longitude)
  })
});



////JUNK CODE \\\\\\////JUNK CODE \\\\\\////JUNK CODE \\\\\\////JUNK CODE \\\\\\////JUNK CODE \\\\\\


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



function geoSuccess(pos) {
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