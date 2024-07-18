import React,{useEffect,useState} from 'react'
import axios from 'axios'
const weatherToGenre = {
    "Clear": '12'
}
const CurrentMovies = ({weatherNature}) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const genre = weatherToGenre[weatherNature]
                if (!genre) return
                const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&with_genres=${genre}&with_original_language=te`)
                console.log(response)
                setMovies(response.data.results)
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }
        if (weatherNature) { fetchMovies() }

    }, [weatherNature])

    return (
        <div>Movies here</div>
    )
}

export default CurrentMovies