const formEL = document.querySelector("#form");
const cityInput = document.querySelector(".city-name-input");
const messageEL = document.querySelector(".message");
const resultBox = document.querySelector(".result");
const submitBtn = document.querySelector(".submit-btn");
const tempNumber = document.querySelector(".temp-number");
const windSpeed = document.querySelector(".wind-speed-number");
const cityName = document.querySelector(".city-name");
const weatherCondition = document.querySelector(".weather-conditions");

const getConditionText = (code) => {
  if (code === 0) {
    return "Clear";
  } else if (code <= 3) {
    return "Cloudy";
  } else if (code <= 48) {
    return "Fog";
  } else if (code <= 67) {
    return "Rain";
  } else if (code <= 77) {
    return "Snowfall";
  } else if (code <= 82) {
    return "Rain showers";
  } else if (code <= 86) {
    return "Snow showers";
  } else if (code <= 99) {
    return "Thunderstorm";
  } else {
    return "Unknown";
  }
};

const getWeather = async (city) => {
  if (city === "") {
    messageEL.classList.add("message-error");
    messageEL.textContent = "Please enter a city name!";
    resultBox.classList.add("hidden");
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
      resultBox.classList.add("hidden");
      messageEL.textContent = "City not found.";
      messageEL.classList.add("message-error");
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

    weatherCondition.textContent = getConditionText(
      weatherData.current.weather_code
    );
    resultBox.classList.remove("hidden");

    messageEL.textContent = "";
  } catch (error) {
    messageEL.classList.add("message-error");
    messageEL.textContent = "Something went wrong, please try again.";
    console.error(error);
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
