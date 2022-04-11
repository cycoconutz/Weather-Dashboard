var searchFormEl = document.querySelector('#search-form');
var inputEl = document.querySelector('#input');
var displayEl = document.querySelector('#display-container');
var displayHeaderEl = document.querySelector('#display-header');
var forecastEl = document.querySelector('#forecast-header');
var currentDate = moment().format("LL");
var buttonParent = document.querySelector('#border');
var searchHistoryEl = document.querySelector('#search-history')
var api = "826f768fd9f365ffb041a6709f34bfbc";
var savedCity = [];
//Runs on Search Button Click
var formSubmitHandler = function (event) {
    event.preventDefault();
    var location = inputEl.value.trim();
    console.log(location);
    getWeather(location);
    getForecast(location);
    populateHistory(location);
};
//Creates and Populates History Buttons
var populateHistory = function (city) {
    var newButt = document.createElement("button");
    newButt.setAttribute("class", "btn btn-secondary col-12 w-100 mb-3");
    newButt.textContent = city;
    savedCity.unshift(city);
    searchHistoryEl.prepend(newButt);
    if (savedCity.length > 10) {
        savedCity.splice(10);
        var badChild = document.querySelector('#search-history :nth-child(10)');
        badChild.remove();
    }
    localStorage.setItem("savedCity", JSON.stringify(savedCity));
}

// Fetches Weather Data
var getWeather = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + api + '&units=imperial';
    console.log(apiUrl)
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
// Fetches Forecast Data
var getForecast = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + api + '&units=imperial';
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
// Creates and Populates Current Weather area
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


// Creates and Populates 5-Day Forecast Cards
var displayForecast = function (cityForecast) {
    forecastEl.innerHTML = "";

    for (i = 6; i <= 38; i = i + 8) {
        var icon = cityForecast.list[i].weather[0].icon;
        var unixDate = cityForecast.list[i].dt
        var date = moment.unix(unixDate).format('l');
        var temp = "Temp: " + cityForecast.list[i].main.temp + "°"
        var wind = "Wind: " + cityForecast.list[i].wind.speed + "MPH"
        var humid = "Humidity: " + cityForecast.list[i].main.humidity + "%";


        var card = document.createElement('div');
        card.classList = 'card text-white bg-dark col-4 '
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

//Event Listener for Submit Button
searchFormEl.addEventListener('submit', formSubmitHandler);

function init() {
    savedCity = JSON.parse(localStorage.getItem("savedCity"));
    if (savedCity === []) {
        return
    }
    if (!savedCity) {
        savedCity = [];
        return
    }
    for (i = 0; i < savedCity.length; i++) {
        var newButt = document.createElement("button");
        newButt.setAttribute("class", "btn btn-secondary col-12 w-100 mb-3");
        newButt.textContent = savedCity[i];
        searchHistoryEl.appendChild(newButt);
    }
}

init();
