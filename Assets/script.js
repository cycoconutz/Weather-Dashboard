var searchFormEl = document.querySelector('#search-form');
var inputEl = document.querySelector('#input');
var displayEl = document.querySelector('#display-container');
var displayHeaderEl = document.querySelector('#display-header');
var forecastEl = document.querySelector('#forecast');
var currentDate = moment().format("LL")
var api = "826f768fd9f365ffb041a6709f34bfbc";

var formSubmitHandler = function (event) {
    event.preventDefault();
    var location = inputEl.value.trim();
    console.log(location);
    getWeather(location);
    getForecast(location);
};

var getWeather = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + api +'&units=imperial';  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayWeather(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
};

var getForecast = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + api +'&units=imperial';  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayForecast(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
};

var displayWeather = function (cityWeather) {
    var cityName = cityWeather.name;
    var weatherIcon = cityWeather.weather[0].icon;
    var displayWeather = document.createElement('h3')
    var iconURL = document.createElement('img')
    var weatherTemp = Math.round(cityWeather.main.temp) + '°'
    var weatherWind = cityWeather.wind.speed + ' MPH'
    var displayWind = document.createElement('h3')
    var weatherHumid = cityWeather.main.humidity + '%'
    var displayHumid = document.createElement('h3')


    displayWeather.textContent = "Temp: " + weatherTemp;
    displayWind.textContent = "Wind: " + weatherWind;
    displayHumid.textContent = "Humity " + weatherHumid;


    iconURL.classList = 'media'
    iconURL.src = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
    displayHeaderEl.textContent = cityName + " " + currentDate;
    displayHeaderEl.appendChild(iconURL);
    displayHeaderEl.appendChild(displayWeather);
    displayHeaderEl.appendChild(displayWind);
    displayHeaderEl.appendChild(displayHumid);
    
}



var displayForecast = function (cityForecast){
    forecastEl.innerHTML = "";
    for (i=6; i<=38; i+8){
        var icon = cityForecast.list[i].weather[0].icon;
        var unixDate = cityForecast.list[i].dt
        var date = moment.unix(dayOneDate).format('l');
        var temp = "Temp: " + cityForecast.list[i].main.temp + "°"


    }

{/* <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Dark card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> */}

  // var dayTwoDate = cityForecast.list[14].dt
    // var dateUnixTwo = moment.unix(dayTwoDate).format('l');
    // var dayThreeDate = cityForecast.list[22].dt
    // var dateUnixThree = moment.unix(dayThreeDate).format('l');
    // var dayFourDate = cityForecast.list[30].dt
    // var dateUnixFour = moment.unix(dayFourDate).format('l');
    // var dayFiveDate = cityForecast.list[38].dt
    // var dateUnixFive = moment.unix(dayFiveDate).format('l');


}

searchFormEl.addEventListener('submit', formSubmitHandler);
  
