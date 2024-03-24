import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 내가 있는 위치의 날씨 표기
//2. 날씨 정보 도씨 화씨 섭씨 날씨상태
//3. 5개의 버튼(도시)
//4. 도시버튼을 누를 때 마다 날씨 표기
//5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나옴
//6. 데이터를 들고 오는 동안 로딩 스피너가 나온다

function App() {
  const [weather, setWeather] = useState(null);
  const [city,setCity]=useState("");
  const [loading,setLoading]=useState(false);
  const cites=['paris','Tokyo','philippines','lisbon'];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat= position.coords.latitude;
      let lon= position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon);
    });
  };

  const getWeatherByCurrentLocation= async(lat,lon)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7cdabd45d60308f46182ce64db83c682&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity= async ()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7cdabd45d60308f46182ce64db83c682&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  useEffect(()=>{
    if(city==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city]);

  
  return (
    <div>
      {loading?(
         <div className="container">
      <ClipLoader
        color="#f88c6b"
        loading={loading}
        size={150}/>
        </div>
        ):(
        <div className="container">
      <WeatherBox weather={weather}/>
      <WeatherButton cites={cites} setCity={setCity}/>
    </div>
    )}
    
    </div>
  );
}

export default App;
