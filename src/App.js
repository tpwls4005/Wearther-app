
//1. 앱이 실행되자마자 내가 있는 위치의 날씨 표기
//2. 날씨 정보 도씨 화씨 섭씨 날씨상태
//3. 5개의 버튼(도시)
//4. 도시버튼을 누를 때 마다 날씨 표기
//5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나옴
//6. 데이터를 들고 오는 동안 로딩 스피너가 나온다

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import WeatherButton from "./component/WeatherButton";
import WeatherBox from "./component/WeatherBox";
import { ClipLoader } from "react-spinners";

const cities = ["hanoi", "paris", "new york", "seoul"];
const API_KEY = `7cdabd45d60308f46182ce64db83c682`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [apiError, setAPIError] = useState("");

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
     if (city == null) {
       setLoading(true);
       getCurrentLocation();
     } else {
    setLoading(true);
    getWeatherByCity();
     }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <>
      <Container className="vh-100">
        {loading ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ClipLoader color="#f86c6b" size={150} loading={loading} />
          </div>
        ) : !apiError ? (
          <div class="main-container">
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </div>
        ) : (
          apiError
        )}
      </Container>
    </>
  );
};
export default App;