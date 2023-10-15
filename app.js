const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a02276d2ec788a78ac748aa319792031";
const searchInput = document.querySelector(".header__search-input");
const searchBtn = document.querySelector(".header__btn");
const showWeatherCity = document.querySelector(".weather");
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
const getCurrentWeatherCity = async (city, callback) => {
  const getApi = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await getApi.json();
  callback(data);
};
const getCurrentWeatherLocation = async (lat, lon, callback) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const getApi = await fetch(url);
  const data = await getApi.json();
  callback(data);
};
const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("لطفا نام شهر خود را وارد کنید.");
  }
  getCurrentWeatherCity(cityName, cityWeatherInfo);
};
const getGeoLocation = () => {};
const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getCurrentWeatherLocation(latitude, longitude, cityWeatherInfo);
    });
  } else {
    alert("مرورگر شما از لوکیشن ساپورت نمی کند.");
  }
};
searchBtn.addEventListener("click", searchHandler);
searchLocationIcon.addEventListener("click", locationHandler);
