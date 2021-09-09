import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import sun from './sun-solid.svg';
import moon from './moon-solid.svg';

function App() {
    const [click,setClick] = useState(true);
    const [weather, setWeather] = useState(null);
    const [city,setcity] = useState(null);
    const [mode,setMode] = useState(true);
    let date = new Date();
    let time = date.getHours();
    // console.log(time);
    let lat,long;
    function change(){
        let icon = document.getElementById('icon');
    let body = document.querySelector('body');
        icon.src = mode?sun:moon;
        body.className = mode?"Dark":"Light";
        icon.alt = mode?"Sun":"Moon";
        setMode(!mode);
    }
    useEffect(()=>{
        let icon = document.getElementById('icon');
    let body = document.querySelector('body');
        if(time>=19 || time<6){
            body.className = "Dark";
            icon.src = sun;
            icon.alt = "Sun";
            setMode(false);
        }
        else{
            body.className = "Light";
            icon.src = moon;
            icon.alt = "Moon";
            setMode(true);
        }
        if(city != null){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e1c32dd0eb29cd3b266f3b06ff7c70b4&units=metric`)
            .then((res) => {
                const newWeather = res.data;
                setWeather(newWeather);
            }).catch((err)=>{alert(`Something went wrong!\n${err}`)})}
        else{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else { 
                alert("Geolocation is not supported by this browser.");
            }
            function showPosition(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e1c32dd0eb29cd3b266f3b06ff7c70b4&units=metric`)
                .then((res) => {
                    const newWeather = res.data;
                    // console.log(newWeather);
                    setWeather(newWeather);
                }).catch((err)=>{alert(`Something went wrong!\n${err}`)})
                // console.log(lat,long);
            }
            }
    },[click,city,lat,long])
    
    if(weather != null){
        return (<div>
            <div className="div2">
                <h1>Weather Status App</h1>
                <input placeholder="Enter city name" id="city"/>
                <button onClick={()=>{
                    setcity(document.getElementById('city').value);
                    setClick(!click);
                    }}>Search</button>
                <img src={moon} alt="Moon" onClick={change} id="icon"/>
            </div>
            <div className="div1">
                <h1>{weather.name}</h1>
                <p id="desc">{weather.weather[0].description}</p>
                <h1 id="temp">{weather.main.temp}'C</h1>
                <p>
                    <span>Latitude: {weather.coord.lat}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Longitude: {weather.coord.lon}</span>
                </p>
            </div>
        <ul>
            <li>Country : {weather.sys.country}</li>
            <li>Feels Like : {weather.main.feels_like}'C</li>
            <li>Humidity : {weather.main.humidity}g/kg</li>
            <li>Pressure : {weather.main.pressure} Pa</li>
            <li>Max Temperature : {weather.main.temp_max}'C</li>
            <li>Min Temperature : {weather.main.temp_min}'C</li>
            <li>Wind Direction : {weather.wind.deg} degree</li>
            <li>Wind Speed : {weather.wind.speed}m/s</li>
        </ul>
        </div>)
    }
    else{
        return (<div>
            <div className="div2">
                <h1>Weather Status App</h1>
                <input placeholder="Enter city name" id="city"/>
                <button onClick={()=>{
                    setcity(document.getElementById('city').value);
                    setClick(!click);
                    }}>Search</button>
                <img src={moon} alt="Moon" onClick={change} id="icon"/>
            </div>
    </div>)
    }
}

export default App;
