const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  console.log("hello");
  let searchValue = searchInput.value;
  getDetailsApis(searchValue);
  console.log(searchValue);
});

let data = {};
async function getDetailsApis(country) {
  const api = await fetch(
    ` http://api.weatherapi.com/v1/forecast.json?key=f27355435cd34175b78144432241501&q=${country}&days=5`
  );
  let response = await api.json();
  data = response;
  console.log(data);
  displayData();
  //   console.log(data);
}
// getDetailsApis("syria");

function displayData() {
  console.log(data.forecast.forecastday);
  let cartona = "";
  console.log(data.forecast.forecastday);
  for (let i = 0; i < data.forecast.forecastday.length; i++) {
    const date = new Date(data.forecast.forecastday[i].date).toDateString();

    cartona += `
    
    <li class="card">
    <h3>(${date})</h3>
    <h6>Temp: ${data.forecast.forecastday[i].day.maxtemp_c}C</h6>
    <h6>Wind: ${data.forecast.forecastday[i].day.maxwind_kph}M/S</h6>
    <h6>Humidity: ${data.forecast.forecastday[i].day.totalprecip_in}%</h6>
</li>
    
    
    `;
  }
  document.getElementById("weather-cards").innerHTML = cartona;
  getCurrent();
}

function getCurrent() {
  const date = new Date(data.current.last_updated).toDateString();
  var currentDay = `
  
  
  
    <div class="details">
    <h2>${data.location.name} ( ${date})</h2>
    <h6>Temperature: ${data.current.temp_c}°C</h6>
    <h6>Wind: ${data.current.wind_mph}M/S</h6>
    <h6>Humidity: ${data.current.humidity}%</h6>
    </div>
     
    
    <img src="${data.current.condition.icon}" class= "image" alt="weather-icon">
   
    
    
    `;
  document.getElementById("weather-data").innerHTML = currentDay;
}

// event to use current Location

document.getElementById("locationBtn").addEventListener("click", function () {
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          function (error) {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  // Function to get weather details
  async function getDetailsApis(country) {
    try {
      const location = await getCurrentLocation();
      const api = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=f27355435cd34175b78144432241501&q=${location.latitude},${location.longitude}&days=5`
      );
      let response = await api.json();
      data = response;
      console.log(data);
      displayData();
    } catch (error) {
      console.error(
        "Error getting geolocation or weather details:",
        error.message
      );
    }
  }

  function displayData() {
    let cartona = "";
    console.log(data.forecast.forecastday);
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
      const date = new Date(data.forecast.forecastday[i].date).toDateString();

      cartona += `
      
      <li class="card">
      <h3>(${date})</h3>
      <h6>Temp: ${data.forecast.forecastday[i].day.maxtemp_c}C</h6>
      <h6>Wind: ${data.forecast.forecastday[i].day.maxwind_kph}M/S</h6>
      <h6>Humidity: ${data.forecast.forecastday[i].day.totalprecip_in}%</h6>
  </li>
      
      
      `;
    }
    document.getElementById("weather-cards").innerHTML = cartona;
    getCurrent();
  }

  getDetailsApis();
});
