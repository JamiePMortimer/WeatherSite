const API2 = {
  key: "69adfaa55e574e9bb954810d342d6fe7",
  base: "https://api.opencagedata.com/geocode/v1/json?q=",
  test: "https://api.opencagedata.com/geocode/v1/json?q=Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+Brasil&key=69adfaa55e574e9bb954810d342d6fe7&pretty=1"
}


function geoResults(){
  fetch(`${API2.test}`)
  .then(location => {
    console.log(location);})
  // }).then(displayResults);
  }

geoResults();