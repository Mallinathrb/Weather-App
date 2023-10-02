let weather = {
  apiKey: "2fca79f5d08e4d34d1949ac76c8385bf",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No weather found. Please check the city name.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        this.showError(error.message);
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + '°C';
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText =
      'Wind speed: ' + speed + ' km/h';
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?weather," + name + "')";
  },
  search: function () {
    const selectedCity = document.querySelector('.search-bar').value;
    this.fetchWeather(selectedCity);
  },
  showError: function (message) {
    alert(message); // You can modify this to display the error in the UI if needed.
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    weather.search();
  }
});

weather.fetchWeather('bengaluru');
