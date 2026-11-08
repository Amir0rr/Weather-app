import {
  formEL,
  cityInput,
  messageEL,
  resultBox,
  submitBtn,
  tempNumber,
  windSpeed,
  cityName,
  weatherCondition,
} from "../common.js";
import renderConditionText from "./condition.js";
import renderError from "./Error.js";

const getWeather = async (city) => {
  if (city === "") {
    renderError("Please enter a city name!");
    return;
  }
  messageEL.classList.remove("message-error");
  messageEL.textContent = "Loading...";
  resultBox.classList.add("hidden");
  submitBtn.disabled = true;

  try {
    const geoUri =
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(city) +
      "&count=1";
    const geoResponse = await fetch(geoUri);
    if (!geoResponse.ok) {
      throw new Error("Geocoding request failed");
    }
    const geoData = await geoResponse.json();

    if (geoData.results === undefined) {
      renderError("City not found.");
      return;
    }

    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    const prediction =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&current=temperature_2m,wind_speed_10m,weather_code";
    const weatherResponse = await fetch(prediction);
    if (!weatherResponse.ok) {
      throw new Error("Weather request failed");
    }
    const weatherData = await weatherResponse.json();
    cityName.textContent = geoData.results[0].name;
    tempNumber.textContent = weatherData.current.temperature_2m;
    windSpeed.textContent = weatherData.current.wind_speed_10m;

    weatherCondition.textContent = renderConditionText(
      weatherData.current.weather_code
    );
    resultBox.classList.remove("hidden");

    messageEL.textContent = "";
  } catch (error) {
    renderError("Something went wrong, please try again.");
  } finally {
    submitBtn.disabled = false;
  }
};

const submitHandler = (event) => {
  event.preventDefault();
  const inputValue = cityInput.value.trim();
  getWeather(inputValue);
};

formEL.addEventListener("submit", submitHandler);

export default getWeather;
