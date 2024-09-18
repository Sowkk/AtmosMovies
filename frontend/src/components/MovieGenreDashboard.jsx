import React, { useState, useEffect } from 'react';
import MovieSlider from './MovieSlider';
import EnhancedCard from './EnhancedCard';

const genreMapping = {
  // ... (keep the existing genreMapping object)
  snow: {
    "Action-Oriented": [12, 28],
    "Family-Friendly and Light-Hearted": [16, 10751],
    "Dramatic and Emotional": [18, 10749],
    "Science and Fantasy": [14, 878],
    "Music and Artistic": [10402],
    "Crime and Investigation": [80, 9648]
},
windy: {
    "Action-Oriented": [12], // Adventure
    "Family-Friendly and Light-Hearted": [16, 10751], // Animation, Family
    "Dramatic and Emotional": [18, 10749], // Drama, Romance
    "Science and Fantasy": [14, 878], // Fantasy, Science Fiction
    "Music and Artistic": [10402], // Music
    "Crime and Investigation": [80, 9648] // Crime, Mystery
},
rain: {
    "Action-Oriented": [28], // Action
    "Family-Friendly and Light-Hearted": [16, 10751], // Animation, Family
    "Dramatic and Emotional": [18, 10749], // Drama, Romance
    "Science and Fantasy": [14, 878], // Fantasy, Science Fiction
    "Music and Artistic": [10402], // Music
    "Crime and Investigation": [80, 9648, 53] // Crime, Mystery, Thriller
},
storms: {
    "Action-Oriented": [28, 10752, 53], // Action, War, Thriller
    "Family-Friendly and Light-Hearted": [16], // Animation (for fun, non-threatening storms)
    "Dramatic and Emotional": [18, 10749, 9648], // Drama, Romance, Mystery
    "Science and Fantasy": [14, 878], // Fantasy, Science Fiction
    "Music and Artistic": [10402], // Music
    "Crime and Investigation": [80, 9648, 53] // Crime, Mystery, Thriller
},
cloudy: {
    "Action-Oriented": [12, 28, 53], // Adventure, Action, Thriller
    "Family-Friendly and Light-Hearted": [16, 35, 10751], // Animation, Comedy, Family
    "Dramatic and Emotional": [18, 10749, 9648, 27], // Drama, Romance, Mystery, Horror
    "Science and Fantasy": [14, 878, 99], // Fantasy, Science Fiction, Documentary
    "Music and Artistic": [10402, 16, 99], // Music, Animation, Documentary
    "Crime and Investigation": [80, 9648, 53] // Crime, Mystery, Thriller
},
sunny: {
    "Action-Oriented": [28, 12], // Action, Adventure
    "Family-Friendly and Light-Hearted": [16, 10751, 35], // Animation, Family, Comedy
    "Dramatic and Emotional": [18, 10749], // Drama, Romance
    "Science and Fantasy": [14, 878], // Fantasy, Science Fiction
    "Music and Artistic": [10402, 16], // Music, Animation
    "Crime and Investigation": [80] // Crime
}

};

const MovieGenreDashboard = ({ weather }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // ... (keep the existing useEffect for fetching movies)
     if (selectedGenre) {
            const genreIds = genreMapping[weather][selectedGenre];

            Promise.all(
                genreIds.map(genreId =>
                    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&with_genres=${genreId}&with_original_language=te&primary_release_date.gte=1999-01-01`)
                        .then(response => response.json())
                )
            )
                .then(responses => {
                    const allMovies = responses.flatMap(response => response.results);
                    const uniqueMovies = Array.from(
                        new Map(allMovies.map((movie) => [movie.id, movie])).values()
                    );
                    setMovies(uniqueMovies);
                    console.log(uniqueMovies);
                })
                .catch(error => console.error('Error fetching movies:', error));
        }

  }, [selectedGenre, weather]);

  const genres = ["Action-Oriented", "Family-Friendly and Light-Hearted", "Dramatic and Emotional",
    "Science and Fantasy", "Music and Artistic", "Crime and Investigation"];

  return (
    <div className="pt-24 bg-[url('https://img.freepik.com/premium-photo/clear-sky-calm-sea-noon-beautiful-natural-view-ocean-sea-background_1020697-526024.jpg')] bg-no-repeat bg-cover bg-center bg-[#BCAAA4] p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#5D4037]">
        Genres
      </h1>
      <div className="flex flex-wrap justify-center">
        {genres.map((genre) => (
          <EnhancedCard
            key={genre}
            title={genre}
            content="Click to explore movies"
            image={`https://i.pinimg.com/736x/9a/da/95/9ada95b4efd702c5a5043fc74e27be65.jpg`}
            onClickHandler={() => setSelectedGenre(genre)}
          />
        ))}
      </div>
      {selectedGenre && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#5D4037]">
            {selectedGenre} Movies
          </h2>
          <MovieSlider movies={movies} />
        </div>
      )}
    </div>
  );
};

export default MovieGenreDashboard;