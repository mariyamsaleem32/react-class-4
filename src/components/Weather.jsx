import React, { useRef, useState } from "react";
import "./Weather.css";
// import axios from "axios";
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import humidity_icon from '../Assets/humidity.png';

//-----------> images----------------------->
// import cloud_icon from '../Assets/cloud.png';
// import drizzle_icon from '../Assets/drizzle.png';
// import rain_icon from '../Assets/rain.png';
// import snow_icon from '../Assets/snow.png';
// import wind_icon from '../Assets/wind.png';

const Weather = () => {
const inputRef = useRef(null)
const [weatherData, setWeatherData] = useState([1]);
console.log('data',weatherData);


const getCityName =  () => {
let cityName = inputRef.current.value;
console.log('cityName',cityName);
}

return (
<div className="weather">

  <div className="search-bar">
<input type="text" placeholder="search" ref={inputRef} id="cityName" />
<img src={search_icon} alt="" onClick={getCityName} />
  </div>

  <img src={clear_icon} alt="" />
  <p className="temprature">16°C</p>
  <p className="location">London</p>

  <div className="weather-data">
    <div className="col">
      <img src={humidity_icon} alt="" />
    </div>
    <p>91 %</p>
    <span>Humidity</span>
  </div>

</div>
)
};

export default Weather;