const renderConditionText = (code) => {
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

export default renderConditionText;