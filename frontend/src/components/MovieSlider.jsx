import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ChevronLeftIcon, ChevronRightIcon, Star } from "lucide-react";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styled from 'styled-components';

// const StyledSliderWrapper = styled.div`
//   .slick-slide {
//     margin: 0 5px;  /* Default margin */

//     @media (min-width: 768px) {
//       margin: 0 5px;  /* Margin for medium screens */
//     }

//     @media (min-width: 1024px) {
//       margin: 0 10px;  /* Margin for large screens */
//     }
//   }
// `;

const MovieSlider = ({ movies: initialMovies }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (initialMovies && initialMovies.length > 0) {
      setMovies(initialMovies);
    }
  }, [initialMovies]);

  const CustomArrow = ({ direction, onClick }) => (
    <button
      className={`absolute top-1/2 transform -translate-y-1/2 ${direction === 'left' ? 'left-2' : 'right-2'
        } bg-black bg-opacity-50 text-white p-2 rounded-full z-10`}
      onClick={onClick}
    >
      {direction === 'left' ? <ChevronLeftIcon size={24} /> : <ChevronRightIcon size={24} />}
    </button>
  );

  const settings = {
    dots: true,  // Enable dots for better navigation on smaller screens
    arrows: true,
    infinite: movies.length > 5,
    speed: 300,  // Slightly slower transition for better UX
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 8000,  // Slightly faster autoplay for dynamic feel
    slidesToScroll: 1,
    pauseOnHover: true,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,  // Add the next arrow
    responsive: [
      {
        breakpoint: 1200,  // Large screens (1200px and above)
        settings: {
          slidesToShow: 5,  // Show 4 slides for larger screens
        }
      },
      {
        breakpoint: 1024,  // Medium screens (1024px and above)
        settings: {
          slidesToShow: 4,  // Show 3 slides for medium screens
        }
      },
      {
        breakpoint: 768,  // Tablets (768px to 1024px)
        settings: {
          slidesToShow: 3,
          centerPadding: '5px',  // Show 2 slides on tablets
        }
      },
      {
        breakpoint: 600,  // Small screens (600px to 768px)
        settings: {
          slidesToShow: 2,  // Show 1.5 slides for a peek effect on small screens
        }
      },
      {
        breakpoint: 480,  // Mobile (480px and below)
        settings: {
          slidesToShow: 1,  // Show 1 slide on mobile
          arrows: false,    // Hide arrows on smaller screens for simplicity
        }
      }
    ]
  };



  if (movies.length === 0) {
    return <div className="text-center py-2">Loading movies...</div>;
  }

  return (
    <div className="relative w-full max-w-screen-xl mx-auto mt-6 overflow-hidden">
      <div className="-mx-1"> {/* Negative margin to counteract card padding */}
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <MovieCard key={movie.id || `movie-${index}`} movie={movie} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const MovieCard = ({ movie }) => {
  if (!movie) {
    return <div className="px-1">Loading...</div>;
  }

  return (
    <div className="px-1"> {/* Reduced padding */}
      <div className="relative w-[250px] h-[350px] rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-2xl font-bold mb-1 line-clamp-2">{movie.title}</h3>
          <p className="text-gray-300 text-xs mb-2 line-clamp-3">{movie.overview}</p>
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-400 mr-1" />
            <span className="text-white text-lg">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;