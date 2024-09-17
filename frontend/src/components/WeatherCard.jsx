import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, CloudLightning } from 'lucide-react';

const WeatherCard = ({
  weatherType = 'cloudy',
  temperature = '72°F',
  humidity = '50%',
  windSpeed = '5 mph'
}) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }));
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    const iconProps = "w-16 h-16 transition-all duration-500 ease-in-out transform hover:scale-110";
    switch (weatherType) {
      case 'sunny':
        return <Sun className={`${iconProps} text-yellow-400 spinning-sun`} />;
      case 'cloudy':
        return <Cloud className={`${iconProps} text-gray-400 animate-pulse`} />;
      case 'rain':
        return <CloudRain className={`${iconProps} text-blue-400 animate-bounce`} />;
      case 'snow':
        return <CloudSnow className={`${iconProps} text-blue-200 animate-pulse`} />;
      case 'windy':
        return <Wind className={`${iconProps} text-gray-400 animate-pulse`} />;
      case 'storms':
        return <CloudLightning className={`${iconProps} text-gray-600 animate-pulse`} />;
      default:
        return <Cloud className={`${iconProps} text-gray-400`} />;
    }
  };

  const getBackgroundColor = () => {
    switch (weatherType) {
      case 'sunny':
        return 'from-yellow-200 via-orange-200 to-red-200';
      case 'cloudy':
        return 'from-gray-300 via-gray-400 to-gray-500';
      case 'rain':
        return 'from-slate-300 via-slate-400 to-blue-400';
      case 'snow':
        return 'from-indigo-100 via-blue-200 to-blue-300';
      case 'windy':
        return 'from-gray-200 via-slate-300 to-teal-400';
      case 'storms':
        return 'from-slate-400 via-slate-500 to-slate-600';
      default:
        return 'from-teal-200 via-sky-300 to-indigo-400';
    }
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${getBackgroundColor()} flex items-center justify-center transition-all duration-500 ease-in-out`}>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinning-sun {
          animation: spin 25s linear infinite;
        }
      `}</style>
      <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-lg p-6 w-80">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-md text-gray-700">{currentDate}</p>
            <p className="text-md text-gray-700">{currentTime}</p>
          </div>
          <p className="text-3xl font-bold text-gray-800">{temperature}</p>
        </div>
        <div className="flex flex-col items-center mb-4">
          {getWeatherIcon()}
          <p className="text-xl mt-4 capitalize text-gray-800">{weatherType}</p>
        </div>
        <div className="flex justify-between text-gray-700">
          <p>Humidity: {humidity}</p>
          <p>Wind: {windSpeed}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;