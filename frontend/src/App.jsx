import React from 'react'
import CurrentWeather from './components/CurrentWeather'
//import OtherWeather from './components/OtherWeather'
//import CurrentMovies from './components/CurrentGenres'
import WeatherCard from './components/WeatherCard'
import MovieGenreDashboard from './components/MovieGenreDashboard'
//import GenreCard from './components/GenreCard'
const App = () => {
  return (
    <div >
      <CurrentWeather />
      {/* <MovieGenreDashboard weather="sunny"/> */}
    </div>

  )
}

export default App