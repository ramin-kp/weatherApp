import fetchingData from "./utils/HttpReq.js";
const searchInput = document.querySelector(".header__search-input");
const searchBtn = document.querySelector(".header__btn");
const showWeatherCity = document.querySelector(".weather");
const showWeatherForecast = document.querySelector(".forecast");
const searchLocationIcon = document.querySelector(".header__img");
const cityWeatherInfo = (data) => {
  const dataInfoJsx = `
  <div class="weather__city">
    <h1>${data.name} , ${data.sys.country}</h1>
  </div>
  <div class="weather__title">
  <img class="weather__img" src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }.png" alt="weather icon" />
  <h3 class="weather__main">${data.weather[0].main}</h3>
  <h3 class="weather__temp">${Math.round(data.main.temp)} °C</h3>
  </div>
  <div class="weather__indicator">
    <h3 class="weather__humidity">رطوبت: <span class="weather__humidity-text">%${
      data.main.humidity
    }</span></h3>
    <h3 class="weather__speed">باد: <span class="weather__speed-text">${
      data.wind.speed
    }m/s</span></h3>
  </div>

    `;
  showWeatherCity.classList.add("weather--show");
  showWeatherCity.innerHTML = dataInfoJsx;
};
const weekDay = (data) => {
  const weekIndex = new Date(data * 1000).getDay();
  const day = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
  ];
  return day[weekIndex];
};
const setDataForecast = async (data) => {
  showWeatherForecast.innerHTML = "";
  const forecastWeather = await data.list.filter((item) =>
    item.dt_txt.endsWith("12:00:00")
  );
  forecastWeather.forEach((item) => {
    const forecastWeatherJsx = `<div class="forecast__box">
        <img class="forecast__img" src="https://openweathermap.org/img/wn/${
          item.weather[0].icon
        }.png" alt="" />
        <h3 class="forecast__day">${weekDay(item.dt)}</h3>
        <h3 class="forecast__temp">${Math.round(item.main.temp)} °C</h3>
        <h3 class="forecast__main">${item.weather[0].main}</h3>
        </div>`;
    showWeatherForecast.innerHTML += forecastWeatherJsx;
  });
};
const searchHandler = async () => {
  const cityName = searchInput.value;
  console.log("cityName", typeof cityName);
  if (!cityName) {
    alert("لطفا نام شهر خود را وارد کنید.");
  }
  const weatherCityData = await fetchingData("current", cityName);
  console.log("weatherCityData",weatherCityData)
  cityWeatherInfo(weatherCityData);

  const getForecastWeatherByName = await fetchingData("forecast", cityName);
  console.log("getForecastWeatherByName",getForecastWeatherByName)
  setDataForecast(getForecastWeatherByName);
};
const resolveCallback = async (position) => {
  const getCurrentWeatherLocation = await fetchingData(
    "current",
    position.coords
  );
  cityWeatherInfo(getCurrentWeatherLocation);

  const getForecastWeatherByLocation = await fetchingData(
    "forecast",
    position.coords
  );
  setDataForecast(getForecastWeatherByLocation);
};

const rejectCallback = (err) => {
  console.log(err);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(resolveCallback, rejectCallback);
  } else {
    alert("مرورگر شما از لوکیشن ساپورت نمی کند.");
  }
};
searchBtn.addEventListener("click", searchHandler);
searchLocationIcon.addEventListener("click", locationHandler);
