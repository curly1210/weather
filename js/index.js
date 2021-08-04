const DEFAULT_KEY = "9e51e1c8a0b8f0ceb771dc038c2e3f71";
const DEFAULT_VALUE = "--";

const searchInput = document.querySelector("#search-input");
const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");

const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const speed = document.querySelector(".speed");

searchInput.addEventListener("change", (e) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${DEFAULT_KEY}&units=metric&lang=vi`
  ).then(async (res) => {
    const data = await res.json();
    console.log(data);
    if (data.message === "city not found") {
      cityName.innerHTML = 'không tìm thấy thành phố';
      weatherState.innerHTML = DEFAULT_VALUE;
      temperature.innerHTML = DEFAULT_VALUE;
      sunrise.innerHTML = DEFAULT_VALUE;
      sunset.innerHTML = DEFAULT_VALUE;
      humidity.innerHTML = DEFAULT_VALUE;
      speed.innerHTML = DEFAULT_VALUE;
    } else {
      cityName.innerHTML = data.name;
      weatherState.innerHTML = data.weather[0].description;
      weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      temperature.innerHTML = Math.round(data.main.temp);

      sunrise.innerHTML =
        moment.unix(data.sys.sunrise).format("H:mm") ;
      sunset.innerHTML =
        moment.unix(data.sys.sunset).format("H:mm") ;
      humidity.innerHTML = data.main.humidity ;
      speed.innerHTML = (data.wind.speed * 3.6).toFixed(2)  ;
    }

    // if(data.message === 'city not found') {
    //     sunrise.innerHTML =  DEFAULT_VALUE;
    //     sunset.innerHTML =  DEFAULT_VALUE;
    //     humidity.innerHTML = DEFAULT_VALUE;
    //     speed.innerHTML =  DEFAULT_VALUE;
    // }
  });
});
