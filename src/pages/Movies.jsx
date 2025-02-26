import styles from "./Movies.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const API_READ_ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGVlNmUzYTlmZDIxZDhlNjU0YzAwOGE1MDlhZTg3NCIsIm5iZiI6MTczODkyNzM4MC42OTQwMDAyLCJzdWIiOiI2N2E1ZWQxNDkzN2QyZTliNjA2NmNmMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dhpnhXB0Kl3BxSLpGx3rZlWBdfdxTugFfecc619Whos";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

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

const getSearchMovies = async (query) => {
    const response = await axios.get(SEARCH_URL, {
        ...options,
        params: { query },
    });
    return response.data.results;
};

function Movies() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        const results = await getSearchMovies(query);
        setMovies(results);
    };

    return (
        <div className="container">
            <h1>Search Movies</h1>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                    Search
                </button>
            </form>
            <ul className="movies-list">
                {movies.map(
                    (movie) =>
                        movie.poster_path && (
                            <li key={movie.id} className="movie-item">
                                <Link
                                    to={`/movies/${movie.id}`}
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    <img
                                        className="movie-poster"
                                        src={`${IMAGE_URL}${movie.poster_path}`}
                                        alt={`${movie.title} poster`}
                                    />
                                    <div className="movie-info">
                                        <h2 className="movie-title">{movie.title}</h2>
                                    </div>
                                    <span className="movie-rating">
                                        ★ {movie.vote_average?.toFixed(1)}
                                    </span>
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
}

export default Movies;
