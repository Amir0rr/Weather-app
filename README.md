# Weather-app

A responsive weather app built with HTML, CSS and JavaScript. Search for any city and see its current temperature, weather conditions and wind speed.

🔗 **Live Demo:** https://amir0rr.github.io/Weather-app/

![Desktop preview](images/screenshots/desktop.PNG)

## Features

- Search weather by city name
- Shows current temperature, weather conditions and wind speed
- Loading message while data is being fetched
- Clear messages for empty input, unknown cities and network errors
- Search button is disabled during a request to prevent duplicate requests
- Dark theme with a responsive layout (desktop, tablet, mobile)

## Built With

- HTML5
- CSS3 (Flexbox, media queries)
- JavaScript (DOM manipulation, events, fetch api, async/await, try/catch/finally)

## Data Source

Weather data is provided by [Open-Meteo](https://open-meteo.com/) (free API, CC BY 4.0 licence). This project was built for learning purposes and non-commercial use only.

## What I Learned

- Sending requests to APIs with `fetch`, `async` and `await`
- Chaining two API requests (geocoding first, then forecast)
- Working with JSON data and reading values from nested objects
- Handling errors with `try`, `catch` and `finally`, and checking `response.ok`
- Showing loading and error states in the UI
- Converting weather codes to readable text with a helper function
- Using the browser DevTools (Console and Network) to debug requests

## Run Locally

```bash
git clone https://github.com/Amir0rr/Weather-app.git
```

Then open `index.html` in your browser.
