import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import weathIcon1 from '../assets/clear.png'
import weathIcon2 from '../assets/cloud.png'
import weathIcon3 from '../assets/drizzle.png'
import weathIcon4 from '../assets/humidity.png'
import weathIcon5 from '../assets/rain.png'
import weathIcon6 from '../assets/snow.png'
import weathIcon7 from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const allIcons ={
        "01d": weathIcon1,
        "01n": weathIcon1,
        "02d": weathIcon2,
        "02n": weathIcon2,
        "03d": weathIcon2,
        "03n": weathIcon2,
        "04d": weathIcon3,
        "04n": weathIcon3,
        "09d": weathIcon5,
        "09n": weathIcon5,
        "10d": weathIcon5,
        "10n": weathIcon5,
        "13d": weathIcon6,
        "13n": weathIcon6,
    }

    const search = async (city)=>{
        if(city === ""){
            alert("Enter city name")
            return;
        }
        try {
             const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);    
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || weathIcon1;
            setWeatherData({humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
            
        } catch (err) {
            setWeatherData(false);
            console.log("Error in fetching data");

            
        }
    }

    useEffect(()=>{
        search("Idukki");
    },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search' />
            <img onClick={()=>search(inputRef.current.value)} src={searchIcon} alt="" />
        </div>
        {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temp'>{weatherData.temperature}°c</p>
        <p className='loc'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={weathIcon4} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={weathIcon7} alt="" />
                <div>
                    <p>{weatherData.windspeed} km/hr</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
        
    </div>
  )
}

export default Weather