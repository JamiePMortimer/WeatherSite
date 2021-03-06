const API2 = {
  key: '69adfaa55e574e9bb954810d342d6fe7',
  base: 'https://api.opencagedata.com/geocode/v1/json?q=',
};
let lat;
let lng;

function findCoords(location) {
  fetch(`${API2.base}${location}&key=${API2.key}&no_annotations=1`)
    .then((location) => {
      return location.json();
    })
    .then(displayResult);
}

function displayResult(location) {
  lat = location.results[0].geometry.lat;
  lng = location.results[0].geometry.lng;
}

function findLocation(lat, lon) {
  fetch(`${API2.base}${lat}+${lon}&key=${API2.key}&pretty=1&no_annotations=1`)
    .then((location) => {
      return location.json();
    })
    .then(resLoc);
}

function resLoc(location) {
  const ctry = location.results[0].components.country_code.toUpperCase();
  if (!location.results[0].components.city) {
    getResults(`${location.results[0].components.town}, ${ctry}`);
  } else {
    getResults(`${location.results[0].components.city}, ${ctry}`);
  }
  console.log(location);
}
