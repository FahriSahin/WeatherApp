import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [weatherData , setWeatherData] = useState(null);
  const [forecastData , setForcastData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://api.weatherapi.com/v1/current.json?key=YOUR_APİ_KEY&q=41.01384, 28.94966&aqi=no&lang=tr&dt=2024-03-03');
        const res2 = await fetch('http://api.weatherapi.com/v1/forecast.json?key=YOUR_APİ_KEY&q=41.01384, 28.94966&days=7&aqi=no&alerts=no&lang=tr')
        if (!res.ok || !res2.ok){
          throw new Error("bir hata meydana geldi");
        }
        const data = await res.json();
        const data2 = await res2.json();
        setWeatherData(data);
        setForcastData(data2);
      } catch (error) {
        console.log(error);
      }
    }
  fetchData();
  }, [])
  
  if (!weatherData) {
    return <div>Loading...</div>;
  }
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    ]
    console.log(forecastData);
    const uvValueStyle = {
      left : `${weatherData.current.uv * 8 < 100 ? (weatherData.  current.uv * 8)+'%' : "92%"}`

    }
  return (
    <div className="App">
      <div className='currrentWeather'>
          <p className='currentLoc'>{weatherData.location.name}</p>
          <p className='currentDeg'>{weatherData.current.temp_c}°C</p>
          <img src={weatherData.current.condition.icon} alt="" />
          <p className='currentP'>{weatherData.current.condition.text}</p>
      </div>
          <div className="dayPerHour"> 
          <button className='backnforwButton' id='backButton' >{'<'}</button>
          <div className="hoursDiv">
              {forecastData.forecast.forecastday[0].hour.map((item)=>{
                return(
                  <div className="hour" key={item.time}>
                  <p className='hourText'>{item.time.slice(11,19)}</p>
                  <img src={item.condition.icon} alt=""/>
                  <p className="forcDeg">{item.temp_c}°C</p>
                </div>)
              })}
            </div>
              <button className='backnforwButton' id='forwButton'>{'>'}</button>
          </div>
          <div className='dayWeather'>
             {forecastData.forecast.forecastday.map((item)=>{
              return(
                <div className="day" key={item.date}>
                  <img src={item.day.condition.icon} className='dailyicon' alt="" />
                  <p className='dayText'>{days[new Date(item.date).getDay()]}</p>
                  <p className='dayText'>{item.day.condition.text}</p>
                  <p className='dayText'>{item.day.avgtemp_c}°C</p>
                </div>
              )
             })}
          </div>
          <div className="propDayWeather">
            <div>
              <div className="propherty">
                <p>Rüzgar</p> 
                <p className='fontsizeBigger'>{weatherData.current.wind_kph} km/sa</p>
              </div>
              <div className="propherty">
                <p>Hissedilen</p>
                <p className='fontsizeBigger'>{weatherData.current.feelslike_c}°C</p>
              </div>
            </div>
            <div>
              <div className="propherty">
                <p>Nem oranı</p>
                <p className='fontsizeBigger'>%{weatherData.current.humidity}</p>
              </div>
              <div className="propherty">
                <p>UV indeksi</p>
                <div className="uvBar">
                  <div className="uvValue" style={uvValueStyle}></div>
                </div>
                <p className='fontsizeBigger'>{weatherData.current.uv}</p>
              </div>
            </div>
          </div>
    </div>
  );

}

export default App;