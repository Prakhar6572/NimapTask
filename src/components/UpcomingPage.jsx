import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Global.css';


const UpcomingPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${'c45a857c193f6302f2b5061c3b85e743'}&language=en-US&page=${currentPage}`);
      setMovies(response.data.results);
    };

    fetchUpcoming();
  }, [currentPage]);

  return (
    <div className="container">
      <h1>Upcoming Movies</h1>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UpcomingPage;
