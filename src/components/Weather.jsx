import React, { useRef, useState } from "react";
import axios from "axios";
import "./Weather.css";  
// icons
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': drizzle_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  };

  const getCityName = async () => {
    const cityName = inputRef.current.value;
    setLoading(true);

    if (cityName === "") {
      alert("Please enter a city name.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=b3e2a26018fb51842da913e433a300d5`);
      const data = res.data;

      if (data.cod !== 200) {
        alert(`Error: ${data.message}`);
        return;
      }

      const icons = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icons,
      });
    } catch (error) {
      setWeatherData(null);
      console.error(error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather">
      <div className="weather-header">
        <h2>WeatherNow</h2>
        <div className="search-bar">
          <input type="text" placeholder="Enter city name..." ref={inputRef} />
          <img src={search_icon} alt="search icon" onClick={getCityName} />
        </div>
      </div>

      {loading ? <p>Loading...</p> : weatherData ? (
        <div className="weather-card">
          <div className="weather-icon">
            <img src={weatherData.icon} alt="Weather Icon" />
          </div>
          <h1 className="temperature">{weatherData.temperature}°C</h1>
          <p className="weather-description">{weatherData.location}</p>

          <div className="details-section">
            <div className="col">
              <img src={humidity_icon} alt="humidity icon" />
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>

            <div className="col">
              <img src={wind_icon} alt="wind icon" />
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Weather;
