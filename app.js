const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a02276d2ec788a78ac748aa319792031";
const searchInput = document.querySelector(".header__search-input");
const searchBtn = document.querySelector(".header__btn");

const getCurrentWeatherCity = async (city) => {
  const getApi = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await getApi.json();
  console.log(data);
};
const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("لطفا نام شهر خود را وارد کنید.");
  }
  const wetherCity = await getCurrentWeatherCity(cityName);
  console.log(wetherCity);
};
searchBtn.addEventListener("click", searchHandler);
