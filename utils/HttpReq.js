const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a02276d2ec788a78ac748aa319792031";

const fetchingData = async (type, data) => {
  let url = null;
  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      }
      break;
    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
    default:
      url = `${BASE_URL}/weather?q=Tehran&appid=${API_KEY}&units=metric`;
      break;
  }
  const getApi = await fetch(url);
  const json = await getApi.json();
  return json;
};

// const getCurrentWeatherCity = async (city, callback) => {
//   const getApi = await fetch(
//     `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
//   );
//   const data = await getApi.json();
//   callback(data);
// };
// const getCurrentWeatherLocation = async (lat, lon, callback) => {
//   const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   const getApi = await fetch(url);
//   const data = await getApi.json();
//   callback(data);
// };

// const getForecastWeatherByLocation = async (lat, lon, callback) => {
//   const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   const getApi = await fetch(url);
//   const data = await getApi.json();
//   callback(data);
// };

// const getForecastWeatherByName = async (city) => {
//   const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
//   const getApi = await fetch(url);
//   const data = await getApi.json();
//   setDataForecast(data);
//   console.log(data);
// };
export default fetchingData;
