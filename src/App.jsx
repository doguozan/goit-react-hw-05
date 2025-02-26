import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
const API_KEY = "28ee6e3a9fd21d8e654c008a509ae874";
const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGVlNmUzYTlmZDIxZDhlNjU0YzAwOGE1MDlhZTg3NCIsIm5iZiI6MTczODkyNzM4MC42OTQwMDAyLCJzdWIiOiI2N2E1ZWQxNDkzN2QyZTliNjA2NmNmMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dhpnhXB0Kl3BxSLpGx3rZlWBdfdxTugFfecc619Whos";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const TRENDING_URL = "https://api.themoviedb.org/3/trending/movie/day";


const options = {
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
  params: {
    include_adult: false,
    language: "en-US",
    page: 1,
  },
};

const getTrendingMovies = async () => {
  const response = await axios.get(TRENDING_URL, options);
  return response.data.results;
};

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getTrendingMovies();
      setMovies(movies);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1>Trending Movies</h1>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} >
            <Link className="movie-item" to={`/movies/${movie.id}`}>
              <img
                className="movie-poster"
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
              </div>
              <span className="movie-rating">
                ★ {movie.vote_average.toFixed(1)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
