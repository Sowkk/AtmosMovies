import React from 'react'
import CurrentWeather from './components/CurrentWeather'
import OtherWeather from './components/OtherWeather'
import CurrentMovies from './components/CurrentMovies'
const App = () => {
  return (
    <div className='h-screen flex flex-col'>
      <h1 className='text-center font-italic'>SeasonalScreenings</h1>
      <div className='h-3/5'> 
        <CurrentWeather />
        </div>
        
      <div className='h-2/5'>
        <OtherWeather />
        </div>
    </div>
  )
}

export default App