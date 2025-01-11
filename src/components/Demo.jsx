import React, { useRef, useState } from "react";
import axios from "axios";

const Demo = () => {
  // not recommended
  //   const [city, setCity] = useState("");

  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState([]);

  const getCityName = async () => {
    // not recommended
    // let userCityName = document.getElementById("cityName")
    // console.log(userCityName.value);

    let cityName = inputRef.current.value;

    try {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b3e2a26018fb51842da913e433a300d5&units=metric`
      );
      setWeatherData([res.data,...weatherData]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="weather-container">
      <div className="weather-header">Weather App</div>

        <label htmlFor="cityName"> Enter your city name</label>
        <input type="text" ref={inputRef} id="cityName" />
        <br />
        <button onClick={getCityName}>Get Weather</button>
      </div>

      {weatherData.length ? (
       weatherData.map((weatherData)=>(

        <div className="additional-info">
        <p>cityName {weatherData?.name}</p>
          <p>country {weatherData?.sys?.country} </p>
          <p>temp {weatherData?.main?.temp}</p>
          <p>feels_like {weatherData?.main?.feels_like}</p>
          <p>Humidity:{weatherData?.main?.humidity}%</p>
        </div>
       ))
      ) : (
        ""
      )}
    </>
  );
}

export default Demo;

