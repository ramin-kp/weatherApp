import { showModal } from "./modal.js";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a02276d2ec788a78ac748aa319792031";

const fetchingData = async (type, data) => {
  if (!data) return;
  let url = null;
  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
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
  try {
    const getApi = await fetch(url);
    const json = await getApi.json();
    if (+json.cod === 200) {
      return json;
    } else {
      showModal("نام شهر وارد شده پیدا نشد.");
    }
  } catch (error) {
    showModal("نام شهر وارد شده پیدا نشد.");
  }
};

export default fetchingData;
