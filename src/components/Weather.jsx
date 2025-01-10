import React, { useRef, useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  // not recommended
  //   const [city, setCity] = useState("");

  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState([]);

  const getCityName = async () => {
    // not recommended
    // let userCityName = document.getElementById("cityName")
    // console.log(userCityName.value);
    // axios

    let cityName = inputRef.current.value;

    try {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=18196adb736a0ff23b9fa214ca394629&units=metric`
      );

      setWeatherData([res.data,...weatherData]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="cityName"> Enter your city name</label>
        {/* not recommended */}

        {/* <input
        type="text"
        onChange={(e) => {
          setCity(e.target.value);
          console.log(city);
        }}
        id="cityName"
      /> */}

        <input type="text" ref={inputRef} id="cityName" />
        <br />
        <button onClick={getCityName}>Get Weather</button>
      </div>

      {weatherData.length ? (
       weatherData.map((weatherData)=>(

        <div className="card">
        <p>cityName {weatherData?.name}</p>
        <p>country {weatherData?.sys?.country} </p>
        <p>temp {weatherData?.main?.temp}</p>
        <p>feels_like {weatherData?.main?.feels_like}</p>
        <p>humidity {weatherData?.main?.humidity}</p>
      </div>
       ))
      ) : (
        ""
      )}
    </>
  );
};

export default Weather;