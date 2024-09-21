import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Global.css';


const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${'c45a857c193f6302f2b5061c3b85e743'}&language=en-US`);
      setMovie(response.data);
    };

    const fetchCast = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${'c45a857c193f6302f2b5061c3b85e743'}&language=en-US`);
      setCast(response.data.cast);
    };

    fetchMovie();
    fetchCast();
  }, [id]);

  return (
    <div className="container">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <div className="cast-grid">
        {cast.map(member => (
          <div key={member.cast_id} className="cast-item">
            <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;
