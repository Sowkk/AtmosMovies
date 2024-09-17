import React, { useState } from 'react';
import axios from 'axios';
import CurrentLocation from './CurrentLocation';
import WeatherCard from './WeatherCard';

function CurrentWeather() {
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('pending');
  const [weather, setWeather] = useState(null);

  const handleLocationFetched = (location) => {
    setLocation(location);
    fetchWeather(location);
  };

  const handlePermissionChange = (status) => {
    setLocationPermission(status);
  };

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const mapWeatherCondition = (condition) => {
    const conditionMap = {
      Clear: 'sunny',
      Clouds: 'cloudy',
      Rain: 'rain',
      Drizzle: 'rain',
      Snow: 'snow',
      Atmosphere: 'windy',
      Thunderstorm: 'storms',
    };
    return conditionMap[condition] || 'cloudy';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {locationPermission === 'pending' && (
        <p className="text-xl">Getting your location...</p>
      )}
      {locationPermission === 'denied' && (
        <p className="text-xl">Location permission denied. To fetch weather, location is required.</p>
      )}
      {locationPermission === 'granted' && !weather && (
        <p className="text-xl">Fetching weather data...</p>
      )}
      {weather && (
        <WeatherCard
          weatherType={mapWeatherCondition(weather.weather[0].main)}
          temperature={`${Math.round(weather.main.temp)}°C`}
          humidity={`${weather.main.humidity}%`}
          windSpeed={`${weather.wind.speed} m/s`}
        />
      )}
      {!location && <CurrentLocation onLocationFetched={handleLocationFetched} onPermissionChange={handlePermissionChange} />}
    </div>
  );
}

export default CurrentWeather;