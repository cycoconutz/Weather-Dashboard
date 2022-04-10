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

    for (i=6; i<=38; i=i+8){
        var icon = cityForecast.list[i].weather[0].icon;
        var unixDate = cityForecast.list[i].dt
        var date = moment.unix(unixDate).format('l');
        var temp = "Temp: " + cityForecast.list[i].main.temp + "°"
        var wind = "Wind: " + cityForecast.list[i].wind.speed + "MPH"
        var humid = "Humidity: " + cityForecast.list[i].main.humidity + "%";


        var card = document.createElement('div');
        card.classList = 'card text-white bg-dark mb-3 col-2'
        var cardHead = document.createElement('div');
        cardHead.classList = "card-header"
        cardHead.textContent = date;
        var cardIcon = document.createElement('img');
        cardIcon.classList = 'media';
        cardIcon.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        var cardTemp = document.createElement('h5');
        cardTemp.classList = 'card-title';
        cardTemp.textContent = temp;
        var cardWind = document.createElement('h5');
        cardWind.classList = 'card-title';
        cardWind.textContent = wind;
        var cardHumid = document.createElement('h5');
        cardHumid.classList = 'card-title';
        cardHumid.textContent = humid;

        forecastEl.appendChild(card);
        card.appendChild(cardHead);
        cardHead.appendChild(cardIcon);
        cardHead.appendChild(cardTemp);
        cardHead.appendChild(cardWind);
        cardHead.appendChild(cardHumid);
    }
};


searchFormEl.addEventListener('submit', formSubmitHandler);