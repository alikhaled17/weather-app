(function() {
  
  var storedName = localStorage.getItem('name'),
      storedPass = localStorage.getItem('pass');
      storedStatus = localStorage.getItem('status');


  if(storedName != "" || storedPass != ""){
    if(storedStatus == 'true') {
      document.getElementById('welcome-msg').innerHTML = `| Welcome ${storedName.toUpperCase()} !`;
    } else {
      window.location.replace("./src/login.html");
    }
  } else {
    window.location.replace("./src/signup.html");
  }
})();

let deactive = document.querySelector("#diactivate span:nth-child(1)"),
    logout = document.querySelector("#diactivate span:nth-child(2)");

deactive.addEventListener('click', () => {
  localStorage.setItem('name', '');
  localStorage.setItem('pass', '');
  localStorage.setItem('status', '');  
  location.reload();
})


logout.addEventListener('click', () => {
  localStorage.setItem('status', 'false');
  location.reload();
})


let weather = {
  "apiKey": "4239506a5c4a1d3dff49bdfd88047f25",

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
      + city
      + "&units=metric&appid="
      + this.apiKey,
      // console.log(this.apiKey)
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;

    document.querySelector(".temp").innerText = temp + "°C";

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";

    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

    document.querySelector(".weather").classList.remove("loading");

    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Aswan");
