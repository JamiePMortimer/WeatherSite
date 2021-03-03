const API2 = {
  key: '69adfaa55e574e9bb954810d342d6fe7',
  base: 'https://api.opencagedata.com/geocode/v1/json?q='
};
let lat;
let lng;

function geoResults(location) {
  fetch(`${API2.base}${location}&key=${API2.key}`).then((location) => {
    return location.json();
  }).then(displayResult);
}

function displayResult (location){
  lat = location.results[0].geometry.lat;
  lng = location.results[0].geometry.lng;
  console.log(lat, lng)
}

geoResults('London, UK');
