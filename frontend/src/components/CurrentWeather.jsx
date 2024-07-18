import React, { useState } from 'react'
import axios from 'axios'
import CurrentMovies from './CurrentMovies'
import CurrentLocation from './CurrentLocation'
import Clear from '../assets/clearSky.jpg'
import Drizzle from '../assets/drizzle.jpg'
import Rain from '../assets/rain.jpg'
import Snow from '../assets/snowFall.jpg'
import Clouds from '../assets/clouds.jpg'
import Thunder from '../assets/thunder.jpg'
import { WiDaySunny, WiCloud, WiRain } from 'react-icons/wi' // Importing specific weather icons

const weatherIcons = {
  Clear: <WiDaySunny size={50} />,
  Clouds: <WiCloud size={50} />,
  Rain: <WiRain size={50} />,
  // Add other mappings here
}

const backGroundImage = {
  "Clear": Clear,
  "Drizzle": Drizzle,
  "Rain": Rain,
  "Snow": Snow,
  "Clouds": Clouds,
  "Thunderstorm": Thunder
}

function CurrentWeather() {
  const [location, setLocation] = useState(null)
  const [locationPermission, setLocationPermission] = useState('pending') // pending, granted, denied
  const [weather, setWeather] = useState(null)
  // Callback to handle fetched location
  const handleLocationFetched = (location) => {
    setLocation(location)
    fetchWeather(location)
  }

  // Callback to handle permission change
  const handlePermissionChange = (status) => {
    setLocationPermission(status)
  }

  // Function to fetch weather data based on location
  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
      console.log(response)
      setWeather(response.data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  return (
    <div className={`h-full flex flex-col  justify-center bg-gray-200 ${weather ? 'bg-contain bg-no-repeat ' : ''}`} style={{ backgroundImage: weather ? `url(${backGroundImage[weather.weather[0].main]})` : '' }}>
      {/* //The outer curly braces {} are for embedding a JavaScript expression within JSX.
// The inner curly braces {} are for defining a JavaScript object within that expression. */}
      <h2 className='text-2xl'>Current Weather</h2>
      {locationPermission === 'pending' && <p>Getting your location...</p>}
      {locationPermission === 'denied' && <p> Location permission denied. To fetch weather location is required...</p>}
      {locationPermission === 'granted' && !weather && <p>Fetching weather data...</p>}
      {weather && (
        <div className='flex'>
          <div className='w-1/2 p-6'>
            <p>Location: {weather.name}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Nature: {weather.weather[0].main}</p>
            {weatherIcons[weather.weather[0].main]}
            <div className='w-1/2 p-6'>
              <CurrentMovies weatherNature={"Clear"} />
            </div>

          </div>
        </div>
      )}
      {!location && <CurrentLocation onLocationFetched={handleLocationFetched} onPermissionChange={handlePermissionChange} />}
    </div>
  )
}

export default CurrentWeather
