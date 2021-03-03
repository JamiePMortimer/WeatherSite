const API2 = {
  key: '69adfaa55e574e9bb954810d342d6fe7',
  base: 'https://api.opencagedata.com/geocode/v1/json?q='
};

function geoResults(location) {
  fetch(`${API2.base}${location}&key=${API2.key}`).then((location) => {
    console.log(location.json());
  });
  // }).then(displayResults);
}

geoResults('London');
