var searchEl = document.querySelector('#search-btn');
var inputEl = document.querySelector('#input');
var dislpayEl = document.querySelector('#display-container');
var dislpayHeaderEl = document.querySelector('#display-header');
var forecastEl = document.querySelector('#forecast');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var location = inputEl.value.trim();
  
    if (location) {
      getWeather(location);
  
      dislpayHeaderEl.textContent = '';
      inputEl.value = '';
    } else {
      alert('Please enter another city');
    }
  };

searchEl.addEventListener('submit', formSubmitHandler);