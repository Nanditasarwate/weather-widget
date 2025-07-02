let currentTempC = null;
let isCelsius = true;
let API_KEY = "7560ad0621b83388964d3107a08157ef";

function fetchWeather(city = "Mumbai") {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const location = `${data.name}, ${data.sys.country}`;
      const main = data.weather[0].main.toLowerCase();

      currentTempC = temp;

      document.getElementById("temperature").textContent = `${Math.round(temp)} °C`;
      document.getElementById("description").textContent = capitalize(description);
      document.getElementById("location").textContent = location;

      const icon = selectIcon(main);
      document.getElementById("weatherIcon").src = icon;
    })
    .catch(err => {
      console.error("Weather fetch failed", err);
      document.getElementById("description").textContent = "Weather not found";
      document.getElementById("temperature").textContent = "--";
      document.getElementById("location").textContent = "";
      document.getElementById("weatherIcon").src = "Images/cloudy.jpg";
    });
}

function getCityWeather() {
  const city = document.getElementById("cityName").value.trim();
  if (city !== "") {
    fetchWeather(city);
  }
}

function toggleTemp(unit) {
  if (currentTempC === null) return;
  isCelsius = unit === 'c';
  const temp = isCelsius
    ? `${Math.round(currentTempC)} °C`
    : `${Math.round((currentTempC * 9) / 5 + 32)} °F`;
  document.getElementById("temperature").textContent = temp;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function selectIcon(condition) {
  if (condition.includes("cloud")) return "Images/cloudy.jpg";
  if (condition.includes("rain")) return "Images/rainy.jpg";
  if (condition.includes("drizzle")) return "Images/pixel drizzle rain weather.jpg";
  if (condition.includes("thunder")) return "Images/thunderstorm.png";
  if (condition.includes("snow")) return "Images/snow.png";
  if (condition.includes("fog") || condition.includes("mist") || condition.includes("haze"))
    return "Images/fog.png";
  if (condition.includes("clear")) return "Images/sunny.jpg";
  return "Images/cloudy.jpg";
}

// Default load
fetchWeather();
