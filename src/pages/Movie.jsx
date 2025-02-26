import styles from "./Movie.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router";

const API_KEY = "28ee6e3a9fd21d8e654c008a509ae874";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const MOVIE_URL = "https://api.themoviedb.org/3/movie/";

const options_details = {
    params: {
        api_key: API_KEY,
    },
};

function Movie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovie = async () => {
            try {
                setLoading(true);
                const response = await axios.get(MOVIE_URL + id, options_details);
                setMovie(response.data);
            } catch (err) {
                setError("Failed to fetch movie details");
                console.error("Error fetching movie:", err);
            } finally {
                setLoading(false);
            }
        };
        getMovie();
    }, [id]);

    console.log(movie);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!movie) {
        return <div className={styles.error}>Movie not found</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.movieWrapper}>
                <div className={styles.posterSection}>
                    <img
                        src={
                            movie.poster_path
                                ? IMAGE_URL + movie.poster_path
                                : "https://placehold.co/500x750?text=No+Image"
                        }
                        alt={movie.title}
                        className={styles.poster}
                    />
                    <div className={styles.buttonGroup}>
                        <button
                            className={styles.button}
                            onClick={() => navigate(`/movies/${id}/cast`)}
                        >
                            👥 Cast
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => navigate(`/movies/${id}/reviews`)}
                        >
                            ⭐ Reviews
                        </button>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <div className={styles.metadata}>
                        <span className={styles.releaseDate}>
                            {new Date(movie.release_date).getFullYear()}
                        </span>
                        <span className={styles.rating}>
                            ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                        <span className={styles.runtime}>
                            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                        </span>
                    </div>
                    <div className={styles.genres}>
                        {movie.genres.map((genre) => (
                            <span key={genre.id} className={styles.genre}>
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <div className={styles.overview}>
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                    {movie.tagline && (
                        <div className={styles.tagline}>&ldquo;{movie.tagline}&rdquo;</div>
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Movie;
