const API = {
  key: "3c6b6453b9930344c0199f22529f0a0e",
  base: "https://api.openweathermap.org/data/2.5/"
}
const city = document.querySelector('.output-location__city')
const searchInput = document.querySelector('.input__search-box');
searchInput.addEventListener('keypress', weatherQuery)

function weatherQuery (e) {
 if(e.keyCode == 13){
   getResults(searchInput.value)
 }
}

function getResults(query){
fetch(`${API.base}weather?q=${query}&units=metric&appid=${API.key}`)
.then(weather => {
  return weather.json();
}).then(displayResults);
}

function displayResults(weather){
  console.log(weather);
  document.querySelector('.output-location__city').textContent = `${weather.name}, ${weather.sys.country}`
  const tempNow = Math.round(+weather.main.temp)
  const tempmaxNow = Math.round(+weather.main.temp_max)
  const tempminNow = Math.round(+weather.main.temp_min)
  document.querySelector('.temp').textContent = `${tempNow}°C`
  document.querySelector('.hi-lo').textContent = `${tempmaxNow}°C / ${tempminNow}°C`
  document.querySelector('.weather').textContent = `${weather.weather[0].main}`
}